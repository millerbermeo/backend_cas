import { pool } from "./database/conexion.js";
import { io } from "../app.js"; // Ajusta la ruta según la ubicación de tu archivo server.js
import dayjs from 'dayjs';

const notificacionesEmitidas = new Set();

export const verificarDisponibilidad = async () => {
    const query = 'SELECT id_elemento, nombre_elm, tipo_elm, cantidad FROM elementos WHERE tipo_elm = "consumible"';

    try {
        const [results] = await pool.query(query);
        console.log("Resultados obtenidos:", results); // Debugging
        const fechaActual = dayjs().format('YYYY-MM-DD HH:mm:ss');

        results.forEach((elemento) => {
            const key = `${elemento.id_elemento}-${elemento.cantidad}`;

            if (elemento.cantidad < 10) {
                if (!notificacionesEmitidas.has(key)) {
                    const notificacion = {
                        id_elemento: elemento.id_elemento,
                        nombre_elm: elemento.nombre_elm,
                        tipo_elm: elemento.tipo_elm,
                        cantidad: elemento.cantidad,
                        fecha: fechaActual,
                        mensaje: `El stock del elemento ${elemento.nombre_elm} es menor a 10 unidades.`
                    };
                    console.log("Enviando notificación para:", notificacion); // Debugging
                    io.emit('notificacion', notificacion);
                    notificacionesEmitidas.add(key);
                }
            } else {
                notificacionesEmitidas.delete(key);
            }
        });

    } catch (err) {
        console.error(err);
    }
};
