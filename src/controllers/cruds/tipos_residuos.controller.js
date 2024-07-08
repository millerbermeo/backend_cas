import { pool } from "../../database/conexion.js";

export const listarTiposResiduos = async (req, res) => {
    try {
        const query = "SELECT * FROM tipos";
        const [result] = await pool.query(query);

        if (result.length > 0) {
            return res.status(200).json(result); 
        } else {
            return res.status(404).json({ 'message': 'No se encontraron registros de tipos de residuos' });
        }
    } catch (error) {
        return res.status(500).json({ 'message': 'Error: ' + error }); 
    }
};

export const registrarTipoResiduo = async (req, res) => {
    try {
        const { tipo_residuo, tipo } = req.body;

        await pool.query("INSERT INTO tipos (tipo_residuo, tipo) VALUES (?, ?)", [tipo_residuo, tipo]);

        res.status(201).json({ message: "Tipo de residuo registrado exitosamente" });
    } catch (error) {
        console.error("Error al registrar el tipo de residuo:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// export const eliminarTipoResiduo = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const [result] = await pool.query("DELETE FROM tipos WHERE id_tipo = ?", [id]);

//         if (result.affectedRows > 0) {
//             res.status(200).json({ message: "Tipo de residuo eliminado exitosamente" });
//         } else {
//             res.status(404).json({ message: "Tipo de residuo no encontrado" });
//         }
//     } catch (error) {
//         console.error("Error al eliminar el tipo de residuo:", error);
//         res.status(500).json({ message: "Error interno del servidor" });
//     }
// };

export const actualizarTipoResiduo = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo_residuo, tipo } = req.body;

        await pool.query("UPDATE tipos SET tipo_residuo = ?, tipo = ? WHERE id_tipo = ?", [tipo_residuo, tipo, id]);

        res.status(200).json({ message: "Tipo de residuo actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el tipo de residuo:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
