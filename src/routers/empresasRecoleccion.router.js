import { Router } from "express";
import { validarToken } from "../controllers/validator.controller.js";
import { listarEmpresas, registrarEmpresa, eliminarEmpresa, actualizarEmpresa } from "../controllers/cruds/empresasRecoleccion.controller.js    ";

const router = Router();

/**
 * @swagger
 * /empresa/listar:
 *   get:
 *     summary: Listar todas las empresas
 *     tags: [Empresas]
 *     responses:
 *       200:
 *         description: Lista de empresas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No se encontraron registros de empresas
 *       500:
 *         description: Error en el servidor
 */
router.get('/listar', validarToken, listarEmpresas);

/**
 * @swagger
 * /empresa/registrar:
 *   post:
 *     summary: Registrar una nueva empresa
 *     tags: [Empresas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_empresa:
 *                 type: string
 *               descripcion_empresa:
 *                 type: string
 *               contacto_empresa:
 *                 type: string
 *     responses:
 *       201:
 *         description: Empresa registrada exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/registrar', validarToken, registrarEmpresa);

/**
 * @swagger
 * /empresa/eliminar/{id}:
 *   delete:
 *     summary: Eliminar una empresa
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Empresa eliminada exitosamente
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/eliminar/:id', validarToken, eliminarEmpresa);

/**
 * @swagger
 * /empresa/actualizar/{id}:
 *   put:
 *     summary: Actualizar una empresa
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_empresa:
 *                 type: string
 *               descripcion_empresa:
 *                 type: string
 *               contacto_empresa:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empresa actualizada exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.put('/actualizar/:id', validarToken, actualizarEmpresa);

export default router;
