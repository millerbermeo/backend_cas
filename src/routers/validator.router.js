import { Router } from "express";
import { ValidarUsuario } from '../controllers/validator.controller.js';

const route = Router();

/**
 * @swagger
 * /validar:
 *   post:
 *     summary: Validar usuario y obtener token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 rol:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 id:
 *                   type: integer
 *       404:
 *         description: Usuario no autorizado
 *       500:
 *         description: Error en el servidor
 */
route.post('/validar', ValidarUsuario);

export default route;
