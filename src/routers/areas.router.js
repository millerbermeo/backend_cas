import { Router } from "express";
import { listarAreas, registrarArea, eliminarArea, actualizarArea } from "../controllers/cruds/areas.controller.js";

const router = Router();

router.get('/listar', listarAreas);
router.post('/registrar', registrarArea);
router.delete('/eliminar/:id', eliminarArea);
router.put('/actualizar/:id', actualizarArea);

export default router;
