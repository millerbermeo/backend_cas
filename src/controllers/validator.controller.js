import { pool } from '../database/conexion.js';
import jswt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const ValidarUsuario = async (req, res) => {
  try {
    let { email, password } = req.body;

    let sql = `SELECT id_usuario, nombre, rol, password FROM usuarios WHERE email = ?`;
    let [rows] = await pool.query(sql, [email]);

    console.log(rows)

    if (rows.length > 0) {
      const user = rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log("aaa",passwordMatch)

      if (passwordMatch == true) {
        let token = jswt.sign({ user: { id: user.id_usuario, nombre: user.nombre, rol: user.rol } }, process.env.SECRET, { expiresIn: process.env.TIME });
        return res.status(200).json({ "message": "Usuario autorizado", "token": token, "rol": user.rol, "nombre": user.nombre, "id": user.id_usuario });
      } else {
        return res.status(404).json({ "message": "Usuario no autorizado" });
      }
    } else {
      return res.status(404).json({ "message": "Usuario no autorizado" });
    }
  } catch (e) {
    return res.status(500).json({ "messagee": e.message });
  }
};
  


export const validarToken = async(req, res, next) => {
    try {
        let token_cliente = req.headers['token'];
        if (!token_cliente) {
            return res.status(402).json({"message": "el token es requerido"});
        } else {
            let decode = jswt.verify(token_cliente, process.env.SECRET, (error, decoded) => {
                if (error) {
                    return res.status(402).json({"message": "el token invalido"});
                } else {
                    req.user = decoded.user;
                    next();
                }
            });
        }
    } catch (error) {
        return res.status(500).json({"message": error.message});
}
}