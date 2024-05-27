import { Router } from "express";
import { validarToken } from "../controllers/validator.controller.js";
import { listarAlmCantidad, listarMovMesY, residuoListarTipo } from "../controllers/graficos.controller.js";

const router = Router()

router.post('/listarMovimientosMes', validarToken, listarMovMesY)
router.get('/listarTipos', validarToken, residuoListarTipo)
router.get('/listarAlm', validarToken, listarAlmCantidad)

export default router