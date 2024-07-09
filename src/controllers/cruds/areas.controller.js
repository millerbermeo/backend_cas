import { pool } from "../../database/conexion.js";

export const listarAreas = async (req, res) => {
    try {
        const query = "SELECT * FROM areas";
        const [result] = await pool.query(query);

        if (result.length > 0) {
            return res.status(200).json(result); 
        } else {
            return res.status(404).json({ 'message': 'No se encontraron registros de áreas' });
        }
    } catch (error) {
        return res.status(500).json({ 'message': 'Error: ' + error }); 
    }
};

export const registrarArea = async (req, res) => {
    try {
        const { nombre_area } = req.body;

        await pool.query("INSERT INTO areas (nombre_area) VALUES (?)", [nombre_area]);

        res.status(201).json({ message: "Área registrada exitosamente" });
    } catch (error) {
        console.error("Error al registrar el área:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const eliminarArea = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query("DELETE FROM areas WHERE id_lugar = ?", [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Área eliminada exitosamente" });
        } else {
            res.status(404).json({ message: "Área no encontrada" });
        }
    } catch (error) {
        console.error("Error al eliminar el área:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const actualizarArea = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_area } = req.body;

        await pool.query("UPDATE areas SET nombre_area = ? WHERE id_lugar = ?", [nombre_area, id]);

        res.status(200).json({ message: "Área actualizada exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el área:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
