import { pool } from "../../database/conexion.js";

export const listarEmpresas = async (req, res) => {
    try {
        const rol = req.user.rol;
        if (rol === 'administrador') {
            // Realizar la consulta para obtener la lista de empresas
            const query = "SELECT * FROM empresas_recoleccion";
            const [result] = await pool.query(query);

            if (result.length > 0) {
                return res.status(200).json(result); 
            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros de empresas' });
            }
        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' }); 
        }
    } catch (error) {
        return res.status(500).json({ 'message': 'Error: ' + error }); 
    }
};

export const registrarEmpresa = async (req, res) => {
    try {
        const { nombre_empresa, descripcion_empresa, contacto_empresa } = req.body;

        // Realizar la inserción en la base de datos
        await pool.query("INSERT INTO empresas_recoleccion (nombre_empresa, descripcion_empresa, contacto_empresa) VALUES (?, ?, ?)", [nombre_empresa, descripcion_empresa, contacto_empresa]);

        res.status(201).json({ message: "Empresa registrada exitosamente" });
    } catch (error) {
        console.error("Error al registrar la empresa:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const eliminarEmpresa = async (req, res) => {
    try {
        const { id } = req.params;

        // Realizar la eliminación en la base de datos
        const [result] = await pool.query("DELETE FROM empresas_recoleccion WHERE id_empresa = ?", [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Empresa eliminada exitosamente" });
        } else {
            res.status(404).json({ message: "Empresa no encontrada" });
        }
    } catch (error) {
        console.error("Error al eliminar la empresa:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const actualizarEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_empresa, descripcion_empresa, contacto_empresa } = req.body;

        // Realizar la actualización en la base de datos
        await pool.query("UPDATE empresas_recoleccion SET nombre_empresa = ?, descripcion_empresa = ?, contacto_empresa = ? WHERE id_empresa = ?", [nombre_empresa, descripcion_empresa, contacto_empresa, id]);

        res.status(200).json({ message: "Empresa actualizada exitosamente" });
    } catch (error) {
        console.error("Error al actualizar la empresa:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
