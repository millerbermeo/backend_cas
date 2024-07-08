import { pool } from "../../database/conexion.js";


export const listarAlmacenamientos = async (req, res) => {
    try {
        const rol = req.user.rol;
        if (rol === 'administrador') {
            // Realizar la consulta para obtener la lista de almacenamientos
            const query = "SELECT * FROM almacenamiento";
            const [result] = await pool.query(query);

            if (result.length > 0) {
                return res.status(200).json(result); 
            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros de almacenamientos' });
            }
        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' }); 
        }
    } catch (error) {
        return res.status(500).json({ 'message': 'Error: ' + error }); 
    }
};

export const registrarAlmacenamiento = async (req, res) => {
    try {
        const { nombre_alm, cantidad_alm = 0 } = req.body;

        // Realizar la inserción en la base de datos
        await pool.query("INSERT INTO almacenamiento (nombre_alm, cantidad_alm) VALUES (?, ?)", [nombre_alm, cantidad_alm]);

        res.status(201).json({ message: "Almacenamiento registrado exitosamente" });
    } catch (error) {
        console.error("Error al registrar el almacenamiento:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const eliminarAlmacenamiento = async (req, res) => {
    try {
        const { id } = req.params;

        // Realizar la eliminación en la base de datos
        const [result] = await pool.query("DELETE FROM almacenamiento WHERE id_almacenamiento = ?", [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Almacenamiento eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "Almacenamiento no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar el almacenamiento:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const actualizarAlmacenamiento = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_alm, cantidad_alm } = req.body;

        // Realizar la actualización en la base de datos
        await pool.query("UPDATE almacenamiento SET nombre_alm = ?, cantidad_alm = ? WHERE id_almacenamiento = ?", [nombre_alm, cantidad_alm, id]);

        res.status(200).json({ message: "Almacenamiento actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el almacenamiento:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
