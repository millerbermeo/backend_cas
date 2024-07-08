import { Router } from "express";
import { validarToken } from "../controllers/validator.controller.js";
import { listarAlmacenamientos, registrarAlmacenamiento, eliminarAlmacenamiento, actualizarAlmacenamiento } from "../controllers/cruds/almacenamiento.controller.js";

const router = Router();

/**
 * @swagger
 * /almacenamiento/listar:
 *   get:
 *     summary: Listar todos los almacenamientos
 *     tags: [Almacenamientos]
 *     responses:
 *       200:
 *         description: Lista de almacenamientos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No se encontraron registros de almacenamientos
 *       500:
 *         description: Error en el servidor
 */
router.get('/listar', validarToken, listarAlmacenamientos);

/**
 * @swagger
 * /almacenamiento/registrar:
 *   post:
 *     summary: Registrar un nuevo almacenamiento
 *     tags: [Almacenamientos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_alm:
 *                 type: string
 *               cantidad_alm:
 *                 type: integer
 *                 default: 0
 *     responses:
 *       201:
 *         description: Almacenamiento registrado exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/registrar', validarToken, registrarAlmacenamiento);

/**
 * @swagger
 * /almacenamiento/eliminar/{id}:
 *   delete:
 *     summary: Eliminar un almacenamiento
 *     tags: [Almacenamientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del almacenamiento
 *     responses:
 *       200:
 *         description: Almacenamiento eliminado exitosamente
 *       404:
 *         description: Almacenamiento no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/eliminar/:id', validarToken, eliminarAlmacenamiento);

/**
 * @swagger
 * /almacenamiento/actualizar/{id}:
 *   put:
 *     summary: Actualizar un almacenamiento
 *     tags: [Almacenamientos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del almacenamiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_alm:
 *                 type: string
 *               cantidad_alm:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Almacenamiento actualizado exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.put('/actualizar/:id', validarToken, actualizarAlmacenamiento);

export default router;
