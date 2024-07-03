import { Router } from "express";
import { validarToken } from "../controllers/validator.controller.js";
import { listarAlmCantidad, listarMovMesY, obtenerElementosPorTipo, obtenerMovimientosPorMesYAnio, residuoListarTipo, selecElementos, selectResiduosMes, selectX } from "../controllers/graficos.controller.js";

const router = Router()

router.post('/listarMovimientosMes', validarToken, listarMovMesY)
router.get('/listarTipos', validarToken, residuoListarTipo)
router.get('/listarAlm', validarToken, listarAlmCantidad)
router.get('/listarr', validarToken, selectX)
router.get('/listarPorMes', validarToken, selectResiduosMes)
router.post('/elementosmES', validarToken, selecElementos)
router.post('/obtmov', validarToken, obtenerMovimientosPorMesYAnio)
router.post('/obtelementos', validarToken, obtenerElementosPorTipo)


export default router