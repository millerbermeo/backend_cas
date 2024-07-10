import express from "express";
import { 
    agregarActividad, 
    actividadTerminada, 
    actividadListar, 
    actividadListarId, 
    actividadActualizar, 
    actividadListarUsuarios, 
    registrarActividadElm, 
    actividadListarElementos,
    actividadListar2
} from "../controllers/actividad.controller.js"; 
import { validarToken } from "../controllers/validator.controller.js";

const router = express.Router();

/**
 * @swagger
 * /actividades/listar:
 *   get:
 *     summary: Listar todas las actividades
 *     tags: [Actividades]
 *     responses:
 *       200:
 *         description: Lista de actividades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No se encontraron registros de actividades
 *       500:
 *         description: Error en el servidor
 */
router.get("/listar", actividadListar);
router.get("/listarDos", actividadListar2);

/**
 * @swagger
 * /actividades/listar/{id}:
 *   get:
 *     summary: Listar actividad por ID
 *     tags: [Actividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la actividad
 *     responses:
 *       200:
 *         description: Información de la actividad
 *       404:
 *         description: No se encontraron registros de actividades
 *       500:
 *         description: Error en el servidor
 */
router.get("/listar/:id", actividadListarId);

/**
 * @swagger
 * /actividades/registrar:
 *   post:
 *     summary: Registrar una nueva actividad
 *     tags: [Actividades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lugar_actividad:
 *                 type: string
 *               fecha_actividad:
 *                 type: string
 *               usuarios:
 *                 type: array
 *                 items:
 *                   type: integer
 *               elementos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     elemento_id:
 *                       type: integer
 *                     cantidad:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Actividad con usuarios y elementos agregada exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.post("/registrar", validarToken, agregarActividad);

/**
 * @swagger
 * /actividades/registrarActElm:
 *   post:
 *     summary: Registrar una actividad con elementos
 *     tags: [Actividades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha_actividad:
 *                 type: string
 *               elementos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     elemento_id:
 *                       type: integer
 *                     cantidad:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Actividad con elementos agregada exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.post("/registrarActElm", validarToken, registrarActividadElm);

/**
 * @swagger
 * /actividades/actualizar/{id}:
 *   put:
 *     summary: Actualizar el estado de una actividad
 *     tags: [Actividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la actividad
 *     responses:
 *       200:
 *         description: Estado de la actividad cambiado exitosamente
 *       404:
 *         description: No se encontró ninguna actividad con ese ID
 *       500:
 *         description: Error en el servidor
 */
router.put("/actualizar/:id", validarToken, actividadTerminada);

/**
 * @swagger
 * /actividades/actualizarAct/{id}:
 *   put:
 *     summary: Actualizar una actividad
 *     tags: [Actividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la actividad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_act:
 *                 type: string
 *               estado_actividad:
 *                 type: string
 *               fecha_actividad:
 *                 type: string
 *     responses:
 *       200:
 *         description: Actividad actualizada exitosamente
 *       403:
 *         description: Usuario no autorizado
 *       500:
 *         description: Error en el servidor
 */
router.put("/actualizarAct/:id", validarToken, actividadActualizar);

/**
 * @swagger
 * /actividades/listarUsersAct/{id}:
 *   get:
 *     summary: Listar usuarios de una actividad
 *     tags: [Actividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la actividad
 *     responses:
 *       200:
 *         description: Lista de usuarios de la actividad
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No se encontraron registros de actividades
 *       500:
 *         description: Error en el servidor
 */
router.get("/listarUsersAct/:id", actividadListarUsuarios);

router.get("/listarUserElm/:id", actividadListarElementos);

export default router;
