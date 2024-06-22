import { Router } from "express";
import { validarToken } from "../controllers/validator.controller.js";
import { listarElementos, registrarElemento, eliminarElemento, actualizarElemento } from "../controllers/elementos.controller.js";

const router = Router();

/**
 * @swagger
 * /elemento/listar:
 *   get:
 *     summary: Listar todos los elementos
 *     tags: [Elementos]
 *     responses:
 *       200:
 *         description: Lista de elementos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No se encontraron registros de elementos
 *       500:
 *         description: Error en el servidor
 */
router.get('/listar', validarToken, listarElementos);

/**
 * @swagger
 * /elemento/registrar:
 *   post:
 *     summary: Registrar un nuevo elemento
 *     tags: [Elementos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_elm:
 *                 type: string
 *               tipo_elm:
 *                 type: string
 *               cantidad:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Elemento registrado exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/registrar', validarToken, registrarElemento);

/**
 * @swagger
 * /elemento/eliminar/{id}:
 *   delete:
 *     summary: Eliminar un elemento
 *     tags: [Elementos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del elemento
 *     responses:
 *       200:
 *         description: Elemento eliminado exitosamente
 *       404:
 *         description: Elemento no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/eliminar/:id', validarToken, eliminarElemento);

/**
 * @swagger
 * /elemento/actualizar/{id}:
 *   put:
 *     summary: Actualizar un elemento
 *     tags: [Elementos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del elemento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_elm:
 *                 type: string
 *               tipo_elm:
 *                 type: string
 *               cantidad:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Elemento actualizado exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.put('/actualizar/:id', validarToken, actualizarElemento);

export default router;
