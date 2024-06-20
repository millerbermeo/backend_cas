

/**
 * @swagger
 * /api/usuarios/registrar:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Crea un nuevo usuario en la base de datos.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               identificacion:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *               rol:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Usuario registrado exitosamente
 *       '403':
 *         description: Error, usuario no autorizado
 *       '500':
 *         description: Error del servidor
 */
