import { Router } from "express";
import { listarLugares, listarAreas, registrarLugar, eliminarLugar, actualizarLugar } from "../controllers/cruds/lugares.controller.js";

const router = Router();

router.get('/listar', listarLugares);
router.get('/areas', listarAreas);
router.post('/registrar', registrarLugar);
router.delete('/eliminar/:id', eliminarLugar);
router.put('/actualizar/:id', actualizarLugar);

export default router;
