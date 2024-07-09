import { pool } from "../database/conexion.js";




export const agregarActividad = async (req, res) => {
    try {
        const { rol } = req.user;

        if (rol === 'administrador') {
            const { lugar_actividad, fecha_actividad, usuarios, elementos } = req.body;

            const nombre_act = `actividad_${fecha_actividad}`;

            // Iniciar Transaccion
            await pool.query('START TRANSACTION');

            // Insertar la actividad
            const [actividadResult] = await pool.query(
                'INSERT INTO actividades (tipo_actividad, nombre_act, lugar_actividad, fecha_actividad) VALUES (1, ?, ?, ?)',
                [nombre_act, lugar_actividad, fecha_actividad]
            );

            const id_actividad = actividadResult.insertId;

            // Insertar usuarios
            if (usuarios && usuarios.length > 0) {
                for (const usuario of usuarios) {
                    await pool.query(
                        'INSERT INTO usuarios_actividades (fk_usuario, fk_actividad) VALUES (?, ?)',
                        [usuario, id_actividad]
                    );
                }
            }

            // Insertar elementos
            if (elementos && elementos.length > 0) {
                for (const elemento of elementos) {
                    const { elemento_id, cantidad } = elemento;

                    await pool.query(
                        'UPDATE elementos SET cantidad = cantidad - ? WHERE id_elemento = ?',
                        [cantidad, elemento_id]
                    );

                    await pool.query(
                        'INSERT INTO elementos_actividades (fk_elemento, fk_actividad, cantidad) VALUES (?, ?, ?)',
                        [elemento_id, id_actividad, cantidad]
                    );
                }
            }

            await pool.query('COMMIT');

            res.status(201).json({ success: true, message: 'Actividad con usuarios y elementos agregada exitosamente' });
        } else {
            res.status(403).json({ message: 'Error: usuario no autorizado' });
        }
    } catch (error) {
        await pool.query('ROLLBACK');

        console.error('Error al insertar actividad con usuarios y elementos:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' + error });
    }
};




export const registrarActividadElm = async (req, res) => {
    try {
        const { rol } = req.user;

        if (rol === 'administrador') {
            const { fecha_actividad, elementos } = req.body;

            const nombre_act = `actividad_${fecha_actividad}`;

            // Iniciar Transaccion
            await pool.query('START TRANSACTION');

            // Insertar la actividad
            const [actividadResult] = await pool.query(
                'INSERT INTO actividades (tipo_actividad, nombre_act,  estado_actividad, fecha_actividad) VALUES (?, ?, ?, ?)',
                ['suministrar',nombre_act, 'terminada', fecha_actividad]
            );

            const id_actividad = actividadResult.insertId;

            // Insertar elementos
            if (elementos && elementos.length > 0) {
                for (const elemento of elementos) {
                    const { elemento_id, cantidad } = elemento;

                    await pool.query(
                        'UPDATE elementos SET cantidad = cantidad - ? WHERE id_elemento = ?',
                        [cantidad, elemento_id]
                    );

                    await pool.query(
                        'INSERT INTO elementos_actividades (fk_elemento, fk_actividad) VALUES (?, ?)',
                        [elemento_id, id_actividad]
                    );
                }
            }

            await pool.query('COMMIT');

            res.status(201).json({ success: true, message: 'Actividad con elementos agregada exitosamente' });
        }
    } catch (error) {
        await pool.query('ROLLBACK');

        console.error('Error al insertar actividad con elementos:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' + error });
    }
};


    // export const actividadTerminada = async (req, res) => {
    //     try {
    //         const { rol } = req.user;

    //         if (rol ==='administrador') {
    //             let id = req.params.id
    //             let sql = `UPDATE actividades SET  estado_actividad = 'terminada' WHERE id_actividad = ${id} `

    //             await pool.query(sql)
    //             res.status(200).json({success: true, message: 'Estado Actualizado.'});
    //         } else {
    //             return res.status(403).json({'message': 'Error: usuario no autorizado'});
    //         }
    //     } catch (error) {
    //         console.error("Error actualizar estado:", error);
    //         res.status(500).json({ success: false,'message': 'Error interno del servidor' + error});
    //     }
    // };

    export const actividadTerminada = async (req, res) => {
        try {
            const rol = req.user.rol;
            if (rol === 'administrador') {
                const id = req.params.id;
   
                
                const estadoActualQuery = "SELECT estado_actividad FROM actividades WHERE id_actividad = ?";
                const [estadoActualResult] = await pool.query(estadoActualQuery, [id]);
                if (estadoActualResult.length === 0) {
                    return res.status(404).json({ 'message': 'No se encontró ninguna actividad con ese ID' });
                }
                const estadoActual = estadoActualResult[0].estado_actividad;
    
                // Cambiar el estado de la actividad
                let nuevoEstado = estadoActual === 'asignada' ? 'terminada' : 'asignada';
                const cambiarEstadoQuery = "UPDATE actividades SET estado_actividad = ? WHERE id_actividad = ?";
                const [result] = await pool.query(cambiarEstadoQuery, [nuevoEstado, id]);
    
                if (result.affectedRows > 0) {
                    return res.status(200).json({ 'message': `Estado de la actividad cambiado a ${nuevoEstado}` });
                } else {
                    return res.status(404).json({ 'message': 'No se encontró ninguna actividad con ese ID' });
                }
            } else {
                return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
            }
        } catch (e) {
            return res.status(500).json({ 'message': 'Error: ' + e });
        }
    }
    

    

    export const actividadListarId = async (req, res) => {
        try {
            // const { rol } = req.user;
            // if (rol ==='administrador') {
                const id_actividad = req.params.id;
                const query = `select actividades.*,
                areas.nombre_area AS nombre_lugar
                from actividades
                join areas on areas.id_lugar = actividades.lugar_actividad WHERE id_actividad = ?`;
                const [result] = await pool.query(query, [id_actividad])

                if (result.length > 0){
                    return res.status(200).json(result);
                } else {
                    return res.status(403).json({'message': `No se encontraron registros de actividades con el id ${id_actividad}`});
                }
            // } else {
            //     return res.status(403).json({'message': 'Error: usuario no autorizado'});
            // }
        } catch (error) {
            return res.status(500).json({'message': 'Error: ' + e})
        }
    };

    export const actividadListar = async (req, res) => {
        try {
            // const { rol } = req.user;
    
            // if (rol === 'administrador') {
                let query = `SELECT actividades.*,
                    areas.nombre_area AS nombre_lugar
                    FROM actividades
                    LEFT JOIN areas ON areas.id_lugar = actividades.lugar_actividad
                    ORDER BY actividades.id_actividad DESC`;
    
                let [result] = await pool.query(query);
    
                if (result.length > 0) {
                    return res.status(200).json(result);
                } else {
                    return res.status(404).json({ 'message': 'No se encontraron registros de actividades' });
                }
    
            // } else {
            //     return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
            // }
        } catch (e) {
            return res.status(500).json({ 'message': 'Error: ' + e });
        }
    };
    


    export const actividadActualizar = async (req, res) => {
        try {
            const { rol } = req.user;
    
            if (rol === 'administrador') {
                const id_actividad = req.params.id;
                const { nombre_act, estado_actividad, fecha_actividad, nombre_lugar } = req.body;
    
                const sql = `UPDATE actividades SET nombre_act = ?, estado_actividad = ?, lugar_actividad = ?, fecha_actividad = ? WHERE id_actividad = ?`;
    
                await pool.query(sql, [nombre_act, estado_actividad, nombre_lugar, fecha_actividad, id_actividad]);
    
                res.status(200).json({ success: true, message: 'Actividad Actualizada.' });
            } else {
                return res.status(403).json({ message: 'Error: usuario no autorizado' });
            }
        } catch (error) {
            console.error("Error actualizar actividad:", error);
            res.status(500).json({ success: false, message: "Error interno del servidor." });
        }
    };
    



    export const actividadListarUsuarios = async (req, res) => {
        try {
            // const { rol } = req.user;
            const id = req.params.id;
    
            // if (rol !== 'administrador') {
            //     return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
            // }
    

            let query = `
            SELECT u.*, a.* 
            FROM usuarios_actividades ua
            JOIN usuarios u ON ua.fk_usuario = u.id_usuario
            JOIN actividades a ON ua.fk_actividad = a.id_actividad
            WHERE a.id_actividad = ?
        `;
        let [results] = await pool.query(query, [id]);

        
            if (results.length > 0) {
                return res.status(200).json(results);
            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros de actividades' });
            }
        } catch (error) {
            console.error('DB Error:', error);
            return res.status(500).json({ 'message': 'Error: ' + error.message });
        }
    };


    export const actividadListarElementos = async (req, res) => {
        try {
            const id = req.params.id;
    
            let query = `
            SELECT e.*, ea.cantidad, a.*
            FROM elementos_actividades ea
            JOIN elementos e ON ea.fk_elemento = e.id_elemento
            JOIN actividades a ON ea.fk_actividad = a.id_actividad
            WHERE a.id_actividad = ?
        `;
            let [results] = await pool.query(query, [id]);
    
            if (results.length > 0) {
                return res.status(200).json(results);
            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros de elementos para esta actividad' });
            }
        } catch (error) {
            console.error('DB Error:', error);
            return res.status(500).json({ 'message': 'Error: ' + error.message });
        }
    };
    
    
