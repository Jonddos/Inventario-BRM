const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchase.controller");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const isClient = require("../middlewares/isClient"); // <-- nuevo

/**
 * @swagger
 * tags:
 *   name: Compras
 *   description: Endpoints relacionados con compras, historial y facturación
 */

/**
 * @swagger
 * /purchases:
 *   post:
 *     summary: Crear una compra (solo CLIENT)
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 description: Lista de productos a comprar
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - cantidad
 *                   properties:
 *                     productId:
 *                       type: number
 *                       example: 1
 *                     cantidad:
 *                       type: number
 *                       example: 2
 *     responses:
 *       201:
 *         description: Compra creada exitosamente
 *       400:
 *         description: Datos inválidos o inventario insuficiente
 *       403:
 *         description: Solo CLIENT puede realizar compras
 *       401:
 *         description: Token requerido
 */
router.post("/", auth, isClient, purchaseController.createPurchase);

/**
 * @swagger
 * /purchases/my:
 *   get:
 *     summary: Obtener historial de compras del usuario autenticado (solo CLIENT)
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Historial recuperado exitosamente
 *       403:
 *         description: Solo CLIENT puede ver su historial
 *       401:
 *         description: Token requerido
 */
router.get("/my", auth, isClient, purchaseController.getMyPurchases);

/**
 * @swagger
 * /purchases/admin:
 *   get:
 *     summary: Obtener todas las compras (solo ADMIN)
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las compras
 *       403:
 *         description: Acceso denegado. Solo ADMIN puede ver este módulo
 *       401:
 *         description: Token requerido
 */
router.get("/admin", auth, isAdmin, purchaseController.getAllPurchases);

/**
 * @swagger
 * /purchases/{id}/invoice:
 *   get:
 *     summary: Obtener factura detallada de una compra
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la compra
 *         schema:
 *           type: number
 *           example: 10
 *     responses:
 *       200:
 *         description: Factura generada exitosamente
 *       403:
 *         description: Solo ADMIN o el dueño de la compra pueden ver la factura
 *       404:
 *         description: Compra no encontrada
 *       401:
 *         description: Token requerido
 */
router.get("/:id/invoice", auth, purchaseController.getInvoice);

module.exports = router;
