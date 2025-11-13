const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: CRUD de productos del inventario
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *       401:
 *         description: Token requerido
 */
router.get("/", auth, productController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del producto
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", auth, productController.getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un producto (solo ADMIN)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lote
 *               - nombre
 *               - precio
 *               - cantidad
 *               - fechaIngreso
 *             properties:
 *               lote:
 *                 type: string
 *                 example: "L-001"
 *               nombre:
 *                 type: string
 *                 example: "Teclado mecánico"
 *               precio:
 *                 type: number
 *                 example: 150000
 *               cantidad:
 *                 type: number
 *                 example: 10
 *               fechaIngreso:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-01"
 *     responses:
 *       201:
 *         description: Producto creado con éxito
 *       400:
 *         description: Datos inválidos
 *       403:
 *         description: Solo ADMIN puede crear productos
 */
router.post("/", auth, isAdmin, productController.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto (solo ADMIN)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del producto
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lote:
 *                 type: string
 *                 example: "L-002"
 *               nombre:
 *                 type: string
 *                 example: "Mouse gamer"
 *               precio:
 *                 type: number
 *                 example: 80000
 *               cantidad:
 *                 type: number
 *                 example: 20
 *               fechaIngreso:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-01"
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       404:
 *         description: Producto no encontrado
 *       403:
 *         description: Solo ADMIN puede actualizar productos
 */
router.put("/:id", auth, isAdmin, productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto (solo ADMIN)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del producto
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 *       403:
 *         description: Solo ADMIN puede eliminar productos
 */
router.delete("/:id", auth, isAdmin, productController.deleteProduct);

module.exports = router;
