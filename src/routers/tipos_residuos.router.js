import { Router } from "express";
import { listarTiposResiduos, registrarTipoResiduo, actualizarTipoResiduo } from "../controllers/cruds/tipos_residuos.controller.js";

const router = Router();

router.get('/listar', listarTiposResiduos);
router.post('/registrar', registrarTipoResiduo);
// router.delete('/eliminar/:id', eliminarTipoResiduo);
router.put('/actualizar/:id', actualizarTipoResiduo);

export default router;
