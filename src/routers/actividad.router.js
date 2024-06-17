import express from "express";
import { agregarActividad, actividadTerminada, actividadListar, actividadListarId, actividadActualizar, actividadListarUsuarios, registrarActividadElm } from "../controllers/actividad.controller.js"; 
import { validarToken } from "../controllers/validator.controller.js";

const router = express.Router();

// Agregar una nueva actividad
router.get("/listar", actividadListar);
router.get("/listar/:id", validarToken, actividadListarId);
router.post("/registrar", validarToken, agregarActividad);
router.post("/registrarActElm", validarToken, registrarActividadElm);
router.put("/actualizar/:id", validarToken, actividadTerminada);
router.put("/actualizarAct/:id", validarToken, actividadActualizar);
router.get("/listarUsersAct/:id", actividadListarUsuarios);

export default router;
