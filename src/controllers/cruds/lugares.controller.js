import { pool } from "../../database/conexion.js";

export const listarLugares = async (req, res) => {
    try {
        const query = "SELECT *, a.nombre_area as lugar FROM lugares l JOIN areas a ON l.fk_area = a.id_lugar";
        const [result] = await pool.query(query);

        if (result.length > 0) {
            return res.status(200).json(result); 
        } else {
            return res.status(404).json({ 'message': 'No se encontraron registros de lugares' });
        }
    } catch (error) {
        return res.status(500).json({ 'message': 'Error: ' + error }); 
    }
};

export const listarLugaresId = async (req, res) => {

    const id = req.params.id;

    try {
        const query = "SELECT *, a.nombre_area as area FROM lugares l JOIN areas a ON l.fk_area = a.id_lugar WHERE a.id_lugar = ?";
        const [result] = await pool.query(query, [id]);

        if (result.length > 0) {
            return res.status(200).json(result); 
        } else {
            return res.status(404).json({ 'message': 'No se encontraron registros de lugares' });
        }
    } catch (error) {
        return res.status(500).json({ 'message': 'Error: ' + error }); 
    }
};

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

export const registrarLugar = async (req, res) => {
    try {
        const { nombre_lugar, ubicacion_lugar, fk_area } = req.body;

        await pool.query("INSERT INTO lugares (nombre_lugar, ubicacion_lugar, fk_area) VALUES (?, ?, ?)", [nombre_lugar, ubicacion_lugar, fk_area]);

        res.status(201).json({ message: "Lugar registrado exitosamente" });
    } catch (error) {
        console.error("Error al registrar el lugar:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const eliminarLugar = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query("DELETE FROM lugares WHERE id_lugar = ?", [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Lugar eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "Lugar no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar el lugar:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const actualizarLugar = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_lugar, ubicacion_lugar, fk_area } = req.body;

        await pool.query("UPDATE lugares SET nombre_lugar = ?, ubicacion_lugar = ?, fk_area = ? WHERE id_lugar = ?", [nombre_lugar, ubicacion_lugar, fk_area, id]);

        res.status(200).json({ message: "Lugar actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el lugar:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
