// controllers/auth.controller.js
import crypto from 'crypto';
import { pool } from '../database/conexion.js';
import bcrypt from 'bcrypt';
import { sendPasswordResetEmail } from './emailService.js';

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
      const [user] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

      if (user.length === 0) {
          return res.status(404).json({ message: 'No se encontró el usuario con ese correo electrónico.' });
      }

      // Generar un token para restablecer la contraseña
      const token = crypto.randomBytes(20).toString('hex');
      const expires = Date.now() + 3600000; // 1 hora

      // Guardar el token y la fecha de expiración en la base de datos
      await pool.query('UPDATE usuarios SET token = ?, expires = ? WHERE email = ?', [token, expires, email]);


      // Enviar el correo electrónico con el token y la expiración
      await sendPasswordResetEmail(email, token);
      res.status(200).json({ message: 'Correo de restablecimiento de contraseña enviado.' });
  } catch (error) {
      console.error('Error al solicitar el restablecimiento de contraseña:', error);
      res.status(500).json({ message: 'Error al solicitar el restablecimiento de contraseña.' });
  }
};
  
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
      // Verificar si el token es válido y no ha expirado
      const [resetRequest] = await pool.query('SELECT * FROM usuarios WHERE token = ?', [token]);

      if (resetRequest.length === 0 || Date.now() > resetRequest[0].expires) {
          return res.status(400).json({ message: 'El token de restablecimiento de contraseña es inválido o ha expirado.' });
      }

      const email = resetRequest[0].email;
      // Hashear la nueva contraseña
      // const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Actualizar la contraseña del usuario
      let [result] = await pool.query('UPDATE usuarios SET password = ? WHERE email = ?', [newPassword, email]);

      if (result.affectedRows > 0) {
          // Eliminar el registro de restablecimiento de contraseña
          // await pool.query('DELETE FROM usuarios WHERE token = ?', [token]);
          return res.status(200).json({ message: 'Contraseña restablecida correctamente.' });
      } else {
          return res.status(400).json({ message: 'No se encontró el usuario con ese correo electrónico.' });
      }

  } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      return res.status(500).json({ message: 'Error al restablecer la contraseña.' });
  }
};