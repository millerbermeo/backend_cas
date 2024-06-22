import { Router } from "express";
import { validarToken } from "../controllers/validator.controller.js";
import { 
    actualizarResiduoId, 
    buscarResiduoId, 
    buscarResiduoId2, 
    deleteResiduoId, 
    listarActividades, 
    listarAdmin, 
    listarAlmacenamientos, 
    listarEmpresas, 
    listarMovimientos, 
    listarResiduo, 
    listarTiposResiduos, 
    registrarAlmacenamiento, 
    registrarEmpresas, 
    registrarMovimiento, 
    registrarResiduo, 
    registrarSalida 
} from "../controllers/residuo.controller.js";
import { 
    validarRegistroResiduo, 
    validarRegistroMovimiento, 
    validarRegistroAlmacenamiento, 
    validarRegistroEmpresa, 
    validarActualizarResiduo 
} from "../validaciones/validacion.residuos.js";

const router = Router();

/**
 * @swagger
 * /residuo/registrar:
 *   post:
 *     summary: Registrar un nuevo residuo
 *     tags: [Residuos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_residuo:
 *                 type: string
 *               residuo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               tipo_residuo:
 *                 type: string
 *               unidad_medida:
 *                 type: string
 *               fk_alm:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Residuo registrado correctamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/registrar', validarToken, validarRegistroResiduo, registrarResiduo);

/**
 * @swagger
 * /residuo/registrarmov:
 *   post:
 *     summary: Registrar un nuevo movimiento
 *     tags: [Residuos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_residuo:
 *                 type: integer
 *               cantidad:
 *                 type: integer
 *               usuario_adm:
 *                 type: string
 *               fk_actividad:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Movimiento registrado correctamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/registrarmov', validarToken, validarRegistroMovimiento, registrarMovimiento);

/**
 * @swagger
 * /residuo/registrarsalida:
 *   post:
 *     summary: Registrar una salida
 *     tags: [Residuos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_residuo:
 *                 type: integer
 *               registrar_cantidad:
 *                 type: integer
 *               destino:
 *                 type: string
 *               usuario_adm:
 *                 type: string
 *     responses:
 *       200:
 *         description: Salida registrada correctamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/registrarsalida', validarToken, validarRegistroMovimiento, registrarSalida);

/**
 * @swagger
 * /residuo/registraralm:
 *   post:
 *     summary: Registrar un nuevo almacenamiento
 *     tags: [Residuos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_alm:
 *                 type: string
 *     responses:
 *       200:
 *         description: Almacenamiento registrado correctamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/registraralm', validarToken, validarRegistroAlmacenamiento, registrarAlmacenamiento);

/**
 * @swagger
 * /residuo/registrarempresa:
 *   post:
 *     summary: Registrar una nueva empresa
 *     tags: [Residuos]
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
 *         description: Empresa registrada correctamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/registrarempresa', validarToken, validarRegistroEmpresa, registrarEmpresas);

/**
 * @swagger
 * /residuo/actualizar/{id}:
 *   put:
 *     summary: Actualizar un residuo
 *     tags: [Residuos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del residuo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_residuo:
 *                 type: string
 *               residuo:
 *                 type: string
 *               tipo_residuo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               unidad_medida:
 *                 type: string
 *               fk_alm:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Residuo actualizado correctamente
 *       500:
 *         description: Error en el servidor
 */
router.put('/actualizar/:id', validarToken, validarActualizarResiduo, actualizarResiduoId);

/**
 * @swagger
 * /residuo/eliminar/{id}:
 *   delete:
 *     summary: Eliminar un residuo
 *     tags: [Residuos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del residuo
 *     responses:
 *       200:
 *         description: Residuo eliminado correctamente
 *       500:
 *         description: Error en el servidor
 */
router.delete('/eliminar/:id', validarToken, deleteResiduoId);

/**
 * @swagger
 * /residuo/listar:
 *   get:
 *     summary: Listar todos los residuos
 *     tags: [Residuos]
 *     responses:
 *       200:
 *         description: Lista de residuos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error en el servidor
 */
router.get('/listar', validarToken, listarResiduo);

/**
 * @swagger
 * /residuo/listar_mov:
 *   get:
 *     summary: Listar todos los movimientos
 *     tags: [Residuos]
 *     responses:
 *       200:
 *         description: Lista de movimientos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error en el servidor
 */
router.get('/listar_mov', validarToken, listarMovimientos);

/**
 * @swagger
 * /residuo/listar_tipos:
 *   get:
 *     summary: Listar todos los tipos de residuos
 *     tags: [Residuos]
 *     responses:
 *       200:
 *         description: Lista de tipos de residuos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error en el servidor
 */
router.get('/listar_tipos', validarToken, listarTiposResiduos);

/**
 * @swagger
 * /residuo/listar_alm:
 *   get:
 *     summary: Listar todos los almacenamientos
 *     tags: [Residuos]
 *     responses:
 *       200:
 *         description: Lista de almacenamientos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error en el servidor
 */
router.get('/listar_alm', validarToken, listarAlmacenamientos);

/**
 * @swagger
 * /residuo/buscar/{id}:
 *   get:
 *     summary: Buscar un residuo por ID
 *     tags: [Residuos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del residuo
 *     responses:
 *       200:
 *         description: Información del residuo
 *       500:
 *         description: Error en el servidor
 */
router.get('/buscar/:id', validarToken, buscarResiduoId);

/**
 * @swagger
 * /residuo/buscar2/{id}:
 *   get:
 *     summary: Buscar un residuo por ID (alternativa)
 *     tags: [Residuos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del residuo
 *     responses:
 *       200:
 *         description: Información del residuo
 *       500:
 *         description: Error en el servidor
 */
router.get('/buscar2/:id', validarToken, buscarResiduoId2);

/**
 * @swagger
 * /residuo/listar_empresas:
 *   get:
 *     summary: Listar todas las empresas de recolección
 *     tags: [Residuos]
 *     responses:
 *       200:
 *         description: Lista de empresas de recolección
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error en el servidor
 */
router.get('/listar_empresas', validarToken, listarEmpresas);

/**
 * @swagger
 * /residuo/listar_admin:
 *   get:
 *     summary: Listar todos los administradores
 *     tags: [Residuos]
 *     responses:
 *       200:
 *         description: Lista de administradores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error en el servidor
 */
router.get('/listar_admin', validarToken, listarAdmin);

/**
 * @swagger
 * /residuo/listar_actividad:
 *   get:
 *     summary: Listar todas las actividades
 *     tags: [Residuos]
 *     responses:
 *       200:
 *         description: Lista de actividades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error en el servidor
 */
router.get('/listar_actividad', validarToken, listarActividades);

export default router;
    