import { Router } from "express";
import { validarToken } from "../controllers/validator.controller.js";
import { buscarUsuarioPorIdentificacion, desactivarUsuario, editarUsuario, listarUsuarios, listarUsuariosTrabajadores, registrarUsuario } from "../controllers/usuario.controller.js";
import { requestPasswordReset, resetPassword } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * /usuario/request-password-reset:
 *   post:
 *     summary: Solicitar restablecimiento de contraseña
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Solicitud de restablecimiento de contraseña exitosa
 *       500:
 *         description: Error en el servidor
 */
router.post('/request-password-reset', requestPasswordReset);

/**
 * @swagger
 * /usuario/reset-password:
 *   post:
 *     summary: Restablecer contraseña
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña restablecida exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/reset-password', resetPassword);

/**
 * @swagger
 * /usuario/listar:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error en el servidor
 */
router.get('/listar', validarToken, listarUsuarios);

/**
 * @swagger
 * /usuario/listar2:
 *   get:
 *     summary: Listar usuarios trabajadores
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios trabajadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error en el servidor
 */
router.get('/listar2', validarToken, listarUsuariosTrabajadores);

/**
 * @swagger
 * /usuario/listar/{id}:
 *   get:
 *     summary: Buscar usuario por identificación
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Información del usuario
 *       500:
 *         description: Error en el servidor
 */
router.get('/listar/:id', validarToken, buscarUsuarioPorIdentificacion);

/**
 * @swagger
 * /usuario/editar/{id}:
 *   put:
 *     summary: Editar usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               identificacion:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *               rol:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.put('/editar/:id', validarToken, editarUsuario);

/**
 * @swagger
 * /usuario/desactivar/{id}:
 *   put:
 *     summary: Desactivar usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario desactivado/activado exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.put('/desactivar/:id', validarToken, desactivarUsuario);

/**
 * @swagger
 * /usuario/registrar:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               identificacion:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *               rol:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/registrar', validarToken, registrarUsuario);

export default router;
