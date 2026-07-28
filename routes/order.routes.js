
import { Router } from "express";
import {
    createOrder,
    deleteOrder,
    getOrderById,
    getOrders,
    getOrdersByBuyer,
    getOrdersByStore,
    updateOrderPriority,
    updateOrderProof,
    updateOrderStatus
} from "../controllers/Order.Controller.js";

const router = Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear una nueva orden
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Orden creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Error al crear el recurso.
 *       404:
 *         description: Error al obtener los recursos.
 *       500:
 *         description: Error interno del servidor.
*/

router.post("/", createOrder);


/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtener todas las órdenes
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Órdenes obtenidas exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Órdenes obtenidas exitosamente.
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       500:
 *         description: Error interno del servidor.
*/

router.get("/", getOrders);


/**
 * @swagger
 * /api/orders/buyer/{buyerId}:
 *   get:
 *     summary: Obtener todas las órdenes de un comprador
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: buyerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comprador
 *     responses:
 *       200:
 *         description: Órdenes del comprador obtenidas exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Órdenes del comprador obtenidas exitosamente.
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       404:
 *         description: Orden no encontrada.
 *       500:
 *         description: Error interno del servidor.
*/

router.get("/buyer/:buyerId", getOrdersByBuyer);


/**
 * @swagger
 * /api/orders/store/{storeId}:
 *   get:
 *     summary: Obtener todas las órdenes de una tienda
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tienda
 *     responses:
 *       200:
 *         description: Órdenes de la tienda obtenidas exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Órdenes de la tienda obtenidas exitosamente.
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       404:
 *         description: Error al obtener los recursos
 *       500:
 *         description: Error interno del servidor.
*/

router.get("/store/:storeId", getOrdersByStore);


/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener una orden por su ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Orden obtenida exitosamente.
 *                 payload:
 *                   $ref: '#/components/schemas/Order'
 *       404:
 *         description: Orden no encontrada.
 *       500:
 *         description: Error interno del servidor.
*/

router.get("/:id", getOrderById);


/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Actualizar el estado de una orden
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - created
 *                   - assigned
 *                   - picked_up
 *                   - in_transit
 *                   - delivered
 *                   - cancelled
 *                 example: in_transit
 *     responses:
 *       200:
 *         description: Estado de la orden actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Estado de la orden actualizado exitosamente.
 *                 payload:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Datos de entrada inválidos.
 *       404:
 *         description: Orden no encontrada.
 *       500:
 *         description: Error interno del servidor.
*/

router.patch("/:id/status", updateOrderStatus);


/**
 * @swagger
 * /api/orders/{id}/priority:
 *   patch:
 *     summary: Actualizar la prioridad de una orden
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               priority:
 *                 type: string
 *                 enum:
 *                   - low
 *                   - normal
 *                   - high
 *                 example: high
 *     responses:
 *       200:
 *         description: Prioridad de la orden actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Prioridad de la orden actualizada exitosamente.
 *                 payload:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Datos de entrada inválidos.
 *       404:
 *         description: Orden no encontrada.
 *       500:
 *         description: Error interno del servidor.
*/

router.patch("/:id/priority", updateOrderPriority);


/**
 * @swagger
 * /api/orders/{id}/proof:
 *   patch:
 *     summary: Actualizar el comprobante de entrega de una orden
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               proof:
 *                 type: object
 *                 nullable: true
 *                 example:
 *                   url: "http://localhost:8000/uploads/proof.jpg"
 *                   image: "comprobante.jpg"
 *     responses:
 *       200:
 *         description: Comprobante de la orden actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Comprobante de entrega actualizado exitosamente.
 *                 payload:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Datos de entrada inválidos.
 *       404:
 *         description: Orden no encontrada.
 *       500:
 *         description: Error interno del servidor.
*/

router.patch("/:id/proof", updateOrderProof);


/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Eliminar una orden por su ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden eliminada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Orden eliminada exitosamente.
 *                 payload:
 *                   $ref: '#/components/schemas/Order'
 *       404:
 *         description: Orden no encontrada.
 *       500:
 *         description: Error interno del servidor.
*/

router.delete("/:id", deleteOrder);

export default router;