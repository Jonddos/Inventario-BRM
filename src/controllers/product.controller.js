const Joi = require("joi");
const { Product } = require("../models");

const productSchema = Joi.object({
  lote: Joi.string().required(),
  nombre: Joi.string().required(),
  precio: Joi.number().positive().required(),
  cantidad: Joi.number().integer().min(0).required(),
  fechaIngreso: Joi.date().required(),
});

exports.createProduct = async (req, res, next) => {
  try {
    const { error, value } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const product = await Product.create(value);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const { error, value } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    await product.update(value);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await product.destroy();
    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};
