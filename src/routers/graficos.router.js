import { Router } from "express";
import { validarToken } from "../controllers/validator.controller.js";
import { listarAlmCantidad, listarMovMesY, residuoListarTipo, selecElementos, selectResiduosMes, selectX } from "../controllers/graficos.controller.js";

const router = Router()

router.post('/listarMovimientosMes', validarToken, listarMovMesY)
router.get('/listarTipos', validarToken, residuoListarTipo)
router.get('/listarAlm', validarToken, listarAlmCantidad)
router.get('/listarr', validarToken, selectX)
router.get('/listarPorMes', validarToken, selectResiduosMes)
router.post('/elementosmES', validarToken, selecElementos)

export default router