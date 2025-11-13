const Joi = require("joi");
const { Purchase, PurchaseItem, Product, User, Invoice  } = require("../models");
const generateInvoiceNumber = require("../utils/generateInvoiceNumber");

const purchaseSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.number().integer().required(),
        cantidad: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),
});

exports.createPurchase = async (req, res, next) => {
  const t = await Purchase.sequelize.transaction();
  try {
    const { error, value } = purchaseSchema.validate(req.body);
    if (error) {
      await t.rollback();
      return res.status(400).json({ message: error.details[0].message });
    }

    const userId = req.user.id;
    const purchase = await Purchase.create(
        { userId, total: 0 },
        { transaction: t }
    );

    let total = 0;

    for (const item of value.items) {
      const product = await Product.findByPk(item.productId, {
        transaction: t,
      });
      if (!product) {
        await t.rollback();
        return res.status(404).json({
          message: `Producto con id ${item.productId} no encontrado`,
        });
      }

      if (product.cantidad < item.cantidad) {
        await t.rollback();
        return res.status(400).json({
          message: `No hay suficiente cantidad para el producto ${product.nombre}`,
        });
      }

      const precioUnitario = product.precio;
      total += precioUnitario * item.cantidad;

      await PurchaseItem.create(
          {
            purchaseId: purchase.id,
            productId: product.id,
            cantidad: item.cantidad,
            precioUnitario,
          },
          { transaction: t }
      );

      await product.update(
          { cantidad: product.cantidad - item.cantidad },
          { transaction: t }
      );
    }

    await purchase.update({ total }, { transaction: t });

    const invoiceNumber = await generateInvoiceNumber();

    const invoice = await Invoice.create(
        {
          number: invoiceNumber,
          purchaseId: purchase.id,
          userId,
          total,
        },
        { transaction: t }
    );

    await t.commit();

    const fullPurchase = await Purchase.findByPk(purchase.id, {
      include: [
        { model: PurchaseItem, include: [Product] },
        { model: User, attributes: ["id", "name", "email"] },
        { model: Invoice },
      ],
    });

    return res.status(201).json({
      message: "Compra realizada exitosamente",
      compra: fullPurchase,
      factura: invoice,
    });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

exports.getMyPurchases = async (req, res, next) => {
  try {
    const purchases = await Purchase.findAll({
      where: { userId: req.user.id },
      include: [{ model: PurchaseItem, include: [Product] }, { model: Invoice }],
      order: [["createdAt", "DESC"]],
    });
    res.json(purchases);
  } catch (err) {
    next(err);
  }
};

exports.getAllPurchases = async (req, res, next) => {
  try {
    const purchases = await Purchase.findAll({
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: PurchaseItem, include: [Product] },
        { model: Invoice },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(purchases);
  } catch (err) {
    next(err);
  }
};

exports.getInvoice = async (req, res, next) => {
  try {
    const purchase = await Purchase.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: PurchaseItem, include: [Product] },
        { model: Invoice },
      ],
    });

    if (!purchase) {
      return res.status(404).json({ message: "Compra no encontrada" });
    }

    if (
        req.user.role !== "ADMIN" &&
        purchase.userId !== req.user.id
    ) {
      return res
          .status(403)
          .json({ message: "No tiene acceso a esta factura" });
    }

    const factura = {
      numero: purchase.Invoice.number,
      fecha: purchase.Invoice.createdAt,
      cliente: purchase.User,
      productos: purchase.PurchaseItems.map((item) => ({
        nombre: item.Product.nombre,
        lote: item.Product.lote,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario,
        subtotal: item.cantidad * item.precioUnitario,
      })),
      total: purchase.Invoice.total,
    };

    res.json(factura);
  } catch (err) {
    next(err);
  }
};
