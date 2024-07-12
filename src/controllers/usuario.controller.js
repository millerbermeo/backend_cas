import { pool } from "../database/conexion.js";
import bcrypt from 'bcrypt';

const encryptPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

export const registrarUsuario = async (req, res) => {
    try {
        const rol = req.user.rol;
        if (rol === 'administrador') {
            const { nombre, apellidos, identificacion, telefono, email, rol } = req.body;

            // Verificar si el email ya existe
            const [existingEmail] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
            if (existingEmail.length > 0) {
                return res.status(400).json({ 'message': 'El email ya está en uso' });
            }

            // Verificar si la identificación ya existe
            const [existingIdentificacion] = await pool.query("SELECT * FROM usuarios WHERE identificacion = ?", [identificacion]);
            if (existingIdentificacion.length > 0) {
                return res.status(400).json({ 'message': 'La identificación ya está en uso' });
            }

            // Encriptar la identificación para usarla como contraseña
            let pass = await encryptPassword(identificacion);

            const query = "INSERT INTO usuarios (nombre, apellidos, identificacion, telefono, email, rol, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
            let [result] = await pool.query(query, [nombre, apellidos, identificacion, telefono, email, rol, pass]);

            if (result.affectedRows > 0) {
                return res.status(200).json({ 'message': 'Usuario registrado exitosamente' });
            } else {
                return res.status(404).json({ 'message': 'No se pudieron registrar los datos del usuario' });
            }
        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }
    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
};




export const listarUsuarios = async (req, res) => {
    try {
        const rol = req.user.rol;
        if (rol === 'administrador') {
            const query = "SELECT * FROM usuarios";
            const [result] = await pool.query(query);

            if (result.length > 0) {
                return res.status(200).json(result);

            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros de usuarios' });
            }
        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }
    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}


export const listarUsuariosTrabajadores = async (req, res) => {
    try {
        const rol = req.user.rol;
        if (rol === 'administrador') {
            const query = "SELECT * FROM usuarios WHERE rol IN ('pasante', 'operario', 'aprendiz')";
            const [result] = await pool.query(query);

            if (result.length > 0) {
                return res.status(200).json(result);

            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros de usuarios' });
            }
        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }
    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}


export const buscarUsuarioPorIdentificacion = async (req, res) => {
    try {
        const rol = req.user.rol;
        if (rol === 'administrador') {

            const identificacion = req.params.id;

            const query = "SELECT * FROM usuarios WHERE id_usuario = ?";

            const [result] = await pool.query(query, [identificacion]);

            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ 'message': 'No se encontró ningún usuario con esa identificación' });
            }
        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }
    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}


export const editarUsuario = async (req, res) => {
    try {
        const rol = req.user.rol;
        if (rol === 'administrador') {
            const id = req.params.id;
            const { nombre, apellidos, identificacion, telefono, email, rol, password } = req.body;

            // Verificar si el nuevo email o identificación ya están en uso por otro usuario

            // Crear la consulta base para actualizar sin la contraseña
            let query = "UPDATE usuarios SET nombre = ?, apellidos = ?, identificacion = ?, telefono = ?, email = ?, rol = ? WHERE id_usuario = ?";
            let queryParams = [nombre, apellidos, identificacion, telefono, email, rol, id];

            // Si se proporciona la contraseña, agregarla a la consulta y parámetros
            if (password) {
                const pass = await encryptPassword(password);
                query = "UPDATE usuarios SET nombre = ?, apellidos = ?, identificacion = ?, telefono = ?, email = ?, rol = ?, password = ? WHERE id_usuario = ?";
                queryParams = [nombre, apellidos, identificacion, telefono, email, rol, pass, id];
            }

            const [result] = await pool.query(query, queryParams);

            if (result.affectedRows > 0) {
                return res.status(200).json({ 'message': 'Usuario actualizado exitosamente' });
            } else {
                return res.status(404).json({ 'message': 'No se encontró ningún usuario con ese ID' });
            }
        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }
    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
};


export const desactivarUsuario = async (req, res) => {
    try {
        const rol = req.user.rol;
        if (rol === 'administrador') {
            const id = req.params.id;
            // Obtener el estado actual del usuario
            const estadoActualQuery = "SELECT estado FROM usuarios WHERE id_usuario = ?";
            const [estadoActualResult] = await pool.query(estadoActualQuery, [id]);
            if (estadoActualResult.length === 0) {
                return res.status(404).json({ 'message': 'No se encontró ningún usuario con ese ID' });
            }
            const estadoActual = estadoActualResult[0].estado;

            // Cambiar el estado del usuario
            let nuevoEstado = estadoActual === 'activo' ? 'inactivo' : 'activo';
            const cambiarEstadoQuery = "UPDATE usuarios SET estado = ? WHERE id_usuario = ?";
            const [result] = await pool.query(cambiarEstadoQuery, [nuevoEstado, id]);

            if (result.affectedRows > 0) {
                return res.status(200).json({ 'message': `Usuario ${nuevoEstado === 'activo' ? 'activado' : 'desactivado'} exitosamente` });
            } else {
                return res.status(404).json({ 'message': 'No se encontró ningún usuario con ese ID' });
            }
        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }
    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}





// Función para registrar un nuevo usuario
/*export const registrarUsuario2= async (req, res) => {
    try {
        const { nombre, apellidos, identificacion, email, rol, password } = req.body;
        const query = "INSERT INTO usuarios (nombre, apellidos, identificacion, email, rol, password) VALUES (?, ?, ?, ?, ?, ?)";
        await pool.query(query, [nombre, apellidos, identificacion, email, rol, password]);
        return res.status(200).json({ 'message': 'Usuario registrado exitosamente' });
    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}

// Función para listar todos los usuarios
export const listarUsuarios2 = async (req, res) => {
    try {
        const query = "SELECT * FROM usuarios";
        const result = await pool.query(query);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}

// Función para buscar un usuario por identificación
export const buscarUsuarioPorIdentificacion2 = async (req, res) => {
    try {
        const { identificacion } = req.params;
        const query = "SELECT * FROM usuarios WHERE identificacion = ?";
        const result = await pool.query(query, [identificacion]);
        if (result.length > 0) {
            return res.status(200).json(result[0]);
        } else {
            return res.status(404).json({ 'message': 'No se encontró ningún usuario con esa identificación' });
        }
    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
} 

// Función para editar la información de un usuario
export const editarUsuario2 = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellidos, identificacion, email, rol, password } = req.body;
        const query = "UPDATE usuarios SET nombre = ?, apellidos = ?, identificacion = ?, email = ?, rol = ?, password = ? WHERE id_usuario = ?";
        await pool.query(query, [nombre, apellidos, identificacion, email, rol, password, id]);
        return res.status(200).json({ 'message': 'Usuario actualizado exitosamente' });
    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}

// Función para desactivar un usuario
export const desactivarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const query = "UPDATE usuarios SET estado = 'inactivo' WHERE id_usuario = ?";
        await pool.query(query, [id]);
        return res.status(200).json({ 'message': 'Usuario desactivado exitosamente' });
    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
} */
