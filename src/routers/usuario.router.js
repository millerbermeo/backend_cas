//RUTAS ANDERSON
import { Router } from "express";
import { validarToken } from "../controllers/validator.controller.js";
import { buscarUsuarioPorIdentificacion, desactivarUsuario, editarUsuario, listarUsuarios, listarUsuariosTrabajadores, registrarUsuario } from "../controllers/usuario.controller.js";
import { requestPasswordReset, resetPassword } from "../controllers/auth.controller.js";

const router = Router()

router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);


router.get('/listar', validarToken, listarUsuarios)
router.get('/listar2', validarToken, listarUsuariosTrabajadores)
router.get('/listar/:id', validarToken, buscarUsuarioPorIdentificacion)
router.put('/editar/:id', validarToken, editarUsuario)
router.put('/desactivar/:id', validarToken, desactivarUsuario)
router.post('/registrar', validarToken, registrarUsuario)



export default router