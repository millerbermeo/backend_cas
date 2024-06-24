//CONTROLADOR SEBAS
import { pool } from "../database/conexion.js";
import { io } from "../../app.js";  


export const listarElementos = async (req, res) => {
    try {
        const rol = req.user.rol;
        if (rol === 'administrador') {
            // Realizar la consulta para obtener la lista de elementos
            const query = "SELECT * FROM elementos";
            const [result] = await pool.query(query);

            if (result.length > 0) {
                return res.status(200).json(result); 
            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros de elementos' });
            }
        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' }); 
        }
    } catch (error) {
        return res.status(500).json({ 'message': 'Error: ' + error }); 
    }
};
export const registrarElemento = async (req, res) => {
    try {
        const { nombre_elm, tipo_elm, cantidad } = req.body;

        // Realizar la inserción en la base de datos
        await pool.query("INSERT INTO elementos (nombre_elm, tipo_elm, cantidad) VALUES (?, ?, ?)", [nombre_elm, tipo_elm, cantidad]);

        res.status(201).json({ message: "Elemento registrado exitosamente" });
    } catch (error) {
        console.error("Error al registrar el elemento:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
export const eliminarElemento = async (req, res) => {
    try {
        const { id } = req.params;

        // Realizar la eliminación en la base de datos
      const [result] =  await pool.query("DELETE FROM elementos WHERE id_elemento = ?", [id]);


      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Elemento eliminado exitosamente" });
      } else {
        res.status(200).json({ message: "Elemento no se pudo eliminar" });
      }

    } catch (error) {
        console.error("Error al eliminar el elemento:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
export const actualizarElemento = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_elm, tipo_elm, cantidad } = req.body;

        // Realizar la actualización en la base de datos
        await pool.query("UPDATE elementos SET nombre_elm = ?, tipo_elm = ?, cantidad = ? WHERE id_elemento = ?", [nombre_elm, tipo_elm, cantidad, id]);

        res.status(200).json({ message: "Elemento actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el elemento:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const verificarDisponibilidad = async () => {
    const query = 'SELECT id_elemento, nombre_elm, tipo_elm, cantidad FROM elementos WHERE tipo_elm = "consumible" AND cantidad < 10';

    try {
        const [results] = await pool.query(query);

        console.log("Resultados obtenidos:", results);

        if (results.length === 0) {
            console.log("no hay datos");
            return;
        }

        results.forEach((elemento) => {
            console.log("Enviando notificación para:", elemento);
            io.emit('notificacion', {
                id_elemento: elemento.id_elemento,
                nombre_elm: elemento.nombre_elm,
                tipo_elm: elemento.tipo_elm,
                cantidad: elemento.cantidad,
                // mensaje: `El stock del elemento ${elemento.nombre_elm} es menor a 10 unidades.`
            });
        });
    } catch (err) {
        console.error("Error ejecutando la consulta:", err);
    }
};

// Configurar la verificación periódica
setInterval(verificarDisponibilidad, 3000);
