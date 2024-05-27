import { Router } from "express";
import { validarToken } from "../controllers/validator.controller.js";
import { listarAlmCantidad, listarMovMesY, residuoListarTipo, selectX } from "../controllers/graficos.controller.js";

const router = Router()

router.post('/listarMovimientosMes', validarToken, listarMovMesY)
router.get('/listarTipos', validarToken, residuoListarTipo)
router.get('/listarAlm', validarToken, listarAlmCantidad)
router.get('/listarr', validarToken, selectX)

export default router