import { pool } from "../database/conexion.js";
import { validationResult } from 'express-validator';



const ERROR_MESSAGE = {
    unauthorized: 'Error: usuario no autorizado',
    notFound: 'No se encontraron registros',
    internalServerError: 'Error interno del servidor'
};

const HTTP_STATUS = {
    ok: 200,
    unauthorized: 403,
    notFound: 404,
    badRequest: 400,
    internalServerError: 500
};



export const obtenerAlmacenamientoId = async (id_residuo) => {
    let query = 'SELECT fk_alm FROM residuos WHERE id_residuo = ?';
    let [result] = await pool.query(query, [id_residuo]);
    if (result.length > 0) {
        return result[0].fk_alm;
    } else {

        return null; 
    }
};

export const obtenerCantidad = async (id_residuo) => {
    let query = 'SELECT cantidad FROM residuos WHERE id_residuo = ?';
    let [result] = await pool.query(query, [id_residuo]);
    if (result.length > 0) {
        return result[0].cantidad;
    } else {

        return null; 
    }
};


export const actualizarCantidadResiduo = async (cantidad, id_residuo, tipo) => {


    if (tipo == 'entrada') {
        let query = `UPDATE residuos set cantidad = cantidad + '${cantidad}' WHERE id_residuo = ?`
        await pool.query(query, [id_residuo])
    }

    if (tipo == 'salida') {

        let cantidadFinal = cantidad || 0; 
    
        let query = `UPDATE residuos SET cantidad = ${cantidadFinal} WHERE id_residuo = ?`;
        await pool.query(query, [id_residuo]);
    }
    
}

export const registrarMovSql = async (cantidad, usuario_adm, id_residuo, fk_actividad) => {
    let query = `INSERT INTO movimientos (tipo_movimiento, cantidad, fecha, usuario_adm, fk_residuo, fk_actividad) VALUES ('entrada', ?, CURDATE(), ?, ?, ?)`;
    await pool.query(query, [cantidad, usuario_adm, id_residuo, fk_actividad]);
}

export const registrarMovSalida = async (cantidad, usuario_adm, id_residuo, destino) => {
    let query = `INSERT INTO movimientos (tipo_movimiento, cantidad, fecha, usuario_adm, fk_residuo, destino) VALUES ('salida', ?, CURDATE(), ?, ?, ?)`;
    await pool.query(query, [cantidad, usuario_adm, id_residuo, destino]);
}


export const actualizarAlmacenamiento = async (cantidad, id_alm, tipo) => {

    if (tipo == 'entrada') {
        let query = `UPDATE almacenamiento SET cantidad_alm = cantidad_alm + ? WHERE id_almacenamiento = ?`;
        await pool.query(query, [cantidad, id_alm]);
    }

    if (tipo == 'salida') {

        let cantidadFinal = cantidad || 0; 

        let query = `UPDATE almacenamiento SET cantidad_alm = ${cantidadFinal} WHERE id_almacenamiento = ?`;
        await pool.query(query, [id_alm]);
    }
};


// export const actualizarActividad = async (fk_actividad) => {
//     let query = `UPDATE actividades SET estado_actividad = 'terminada' WHERE id_actividad  = ?`
//     await pool.query(query, [fk_actividad]);

// }



export const registrarMovimiento = async (req, res) => {
    try {
        const rol = req.user.rol;

        // Validar autorización del usuario
        if (rol !== 'administrador') {
            return res.status(HTTP_STATUS.unauthorized).json({ 'message': ERROR_MESSAGE.unauthorized });
        }


        const { id_residuo, cantidad, usuario_adm, fk_actividad } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

   
        await pool.query('START TRANSACTION');

        let id_alm = await obtenerAlmacenamientoId(id_residuo);
        console.log(id_alm);



        await actualizarCantidadResiduo(cantidad, id_residuo, "entrada");
        await registrarMovSql(cantidad, usuario_adm, id_residuo, fk_actividad);
        await actualizarAlmacenamiento(cantidad, id_alm, "entrada");
        // await actualizarActividad(fk_actividad);



        await pool.query('COMMIT');

        return res.status(HTTP_STATUS.ok).json({ 'message': 'Movimiento registrado correctamente' });
    } catch (error) {
   
        console.error('Error en registrarMovimiento:', error);

    
        await pool.query('ROLLBACK');

        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
};








export const registrarSalida = async (req, res) => {
    try {

        const rol = req.user.rol;


        // Validar autorización del usuario
        if (rol !== 'administrador') {
            return res.status(HTTP_STATUS.unauthorized).json({ 'message': ERROR_MESSAGE.unauthorized });
        }


        //variables del body
        const { id_residuo, registrar_cantidad, destino, usuario_adm } = req.body;

        // Iniciar transacción
        await pool.query('START TRANSACTION');

        let id_alm = await obtenerAlmacenamientoId(id_residuo);
        let cantidad = await obtenerCantidad(id_residuo)

        if (registrar_cantidad.length > 0) {

            let resultado = cantidad - registrar_cantidad
            await actualizarCantidadResiduo(resultado, id_residuo, "salida")

            console.log(resultado, "resuilatdo")
            await registrarMovSalida(registrar_cantidad, usuario_adm, id_residuo, destino)

            await actualizarAlmacenamiento(resultado, id_alm, "salida")
        } else {
            await actualizarCantidadResiduo(0, id_residuo, "salida")
            await registrarMovSalida(cantidad, usuario_adm, id_residuo, destino)
            await actualizarAlmacenamiento(0, id_alm, "salida")

        }

        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }




        console.log(cantidad, "-----")





        // Confirmar transacción
        await pool.query('COMMIT');

        res.status(HTTP_STATUS.ok).json({ 'message': 'Movimiento registrado correctamente' });

    } catch (error) {
        // Manejo de errores
        console.error('Error en registrarMovimiento:', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
};



export const registrarResiduo = async (req, res) => {
    try {

        const rol = req.user.rol;


        // Validar autorización del usuario
        if (rol !== 'administrador') {
            return res.status(HTTP_STATUS.unauthorized).json({ 'message': ERROR_MESSAGE.unauthorized });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //variables del body
        const { nombre_residuo, residuo, descripcion, tipo_residuo, unidad_medida, fk_alm } = req.body;



        let query_1 = `INSERT INTO residuos (nombre_residuo, residuo, tipo_residuo, descripcion, cantidad, unidad_medida, fk_alm) VALUES (?, ?, ?, ?, 0, ?, ?)`;



        let [result] = await pool.query(query_1, [nombre_residuo, residuo, tipo_residuo, descripcion, unidad_medida, fk_alm]);

        if (result.affectedRows > 0) {
            return res.status(HTTP_STATUS.ok).json({ 'message': 'Residuo registrado correctamente' });
        } else {
            return res.status(HTTP_STATUS.badRequest).json({ 'message': 'No se puedo Registrar' });
        }


    } catch (error) {

        console.error('Error en registrarMovimiento:', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
};



export const buscarResiduoId2 = async (req, res) => {

    try {

        const rol = req.user.rol;


        if (rol !== 'administrador') {
            return res.status(HTTP_STATUS.unauthorized).json({ 'message': ERROR_MESSAGE.unauthorized });
        }


        let id = req.params.id

        let query = `SELECT * FROM residuos WHERE id_residuo = '${id}'`
        let [result] = await pool.query(query)

        if (result.length > 0) {
            res.status(HTTP_STATUS.ok).json(result)
        } else {
            res.status(HTTP_STATUS.notFound).json({ 'message': ERROR_MESSAGE.notFound })
        }
    } catch (error) {
        console.error('Error en al listar residuo', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
}


export const buscarResiduoId = async (req, res) => {
    try {
        const rol = req.user.rol;

        if (rol !== 'administrador') {
            return res.status(HTTP_STATUS.unauthorized).json({ 'message': ERROR_MESSAGE.unauthorized });
        }

        let id = req.params.id;
        let query = `SELECT * FROM residuos WHERE id_residuo = '${id}'`;
        let [result] = await pool.query(query);

        if (result.length > 0) {
            res.status(HTTP_STATUS.ok).json(result[0]); // Devuelve directamente el primer objeto
        } else {
            res.status(HTTP_STATUS.notFound).json({ 'message': ERROR_MESSAGE.notFound });
        }
    } catch (error) {
        console.error('Error en al listar residuo', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
}


export const deleteResiduoId = async (req, res) => {

    try {

        const rol = req.user.rol;

        // Validar autorización del usuario
        if (rol !== 'administrador') {
            return res.status(HTTP_STATUS.unauthorized).json({ 'message': ERROR_MESSAGE.unauthorized });
        }


        let id = req.params.id

        let query = `DELETE FROM residuos WHERE id_residuo = '${id}'`
        let [result] = await pool.query(query)

        if (result.length > 0) {
            res.status(HTTP_STATUS.ok).json(result)
        } else {
            res.status(HTTP_STATUS.notFound).json({ 'message': ERROR_MESSAGE.notFound })
        }
    } catch (error) {
        console.error('Error en al eliminar residuo', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
}

export const actualizarResiduoId = async (req, res) => {

    try {

        const rol = req.user.rol;

        // Validar autorización del usuario
        if (rol !== 'administrador') {
            return res.status(HTTP_STATUS.unauthorized).json({ 'message': ERROR_MESSAGE.unauthorized });
        }

        let id = req.params.id

        const { nombre_residuo, residuo, tipo_residuo, descripcion, unidad_medida, fk_alm } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        let query = `UPDATE residuos SET nombre_residuo = '${nombre_residuo}', residuo = '${residuo}', tipo_residuo = '${tipo_residuo}', descripcion = '${descripcion}', unidad_medida = '${unidad_medida}', fk_alm  = '${fk_alm}' WHERE id_residuo = ${id}`
        let [result] = await pool.query(query)

        if (result.affectedRows > 0) {
            res.status(HTTP_STATUS.ok).json({ "message": "Actualizado correctamente" })
        } else {
            res.status(HTTP_STATUS.notFound).json(ERROR_MESSAGE.notFound)
        }
    } catch (error) {
        console.error('Error en al listar residuo', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
}

export const registrarAlmacenamiento = async (req, res) => {
    try {

        const rol = req.user.rol;

        // Validar autorización del usuario
        if (rol !== 'administrador') {
            return res.status(HTTP_STATUS.unauthorized).json({ 'message': ERROR_MESSAGE.unauthorized });
        }

        //variables del body
        const { nombre_alm } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        let query = 'INSERT into almacenamiento (nombre_alm, cantidad_alm) VALUES (?, ?)'
        let [result] = await pool.query(query, [nombre_alm, 0])

        if (result.affectedRows > 0) {
            return res.status(HTTP_STATUS.ok).json({ 'message': 'almacenamiento registrado correctamente' });
        } else {
            return res.status(HTTP_STATUS.badRequest).json({ 'message': 'no se registro la bodega' });
        }


    } catch (error) {
        // Manejo de errores
        console.error('Error en registrar Almacenamiento:', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
}


export const registrarEmpresas = async (req, res) => {
    try {


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const rol = req.user.rol;

    
        if (rol !== 'administrador') {
            return res.status(HTTP_STATUS.unauthorized).json({ 'message': ERROR_MESSAGE.unauthorized });
        }

     
        const { nombre_empresa, descripcion_empresa, contacto_empresa } = req.body;

        let query = 'INSERT into empresas_recoleccion (nombre_empresa, descripcion_empresa, contacto_empresa) VALUES (?, ?, ?)'
        let [result] = await pool.query(query, [nombre_empresa, descripcion_empresa, contacto_empresa])

        if (result.affectedRows > 0) {
            return res.status(HTTP_STATUS.ok).json({ 'message': 'Empresa registrada correctamente' });
        } else {
            return res.status(HTTP_STATUS.badRequest).json({ 'message': 'no se registro la empresa con exito' });
        }


    } catch (error) {
      
        console.error('Error en registrar Almacenamiento:', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
}




export const listarResiduo = async (req, res) => {

    try {

        const rol = req.user.rol;


        if (rol !== 'administrador') {
            return res.status(HTTP_STATUS.unauthorized).json({ 'message': ERROR_MESSAGE.unauthorized });
        }

        let query = `SELECT *, t.tipo_residuo as tipo, a.nombre_alm as alm FROM residuos r JOIN tipos t ON r.residuo = t.id_tipo JOIN almacenamiento a ON r.fk_alm = a.id_almacenamiento`
        let [result] = await pool.query(query)

        if (result.length > 0) {
            res.status(HTTP_STATUS.ok).json(result)
        } else {
            res.status(HTTP_STATUS.notFound).json({ 'message': ERROR_MESSAGE.notFound })
        }
    } catch (error) {
        console.error('Error en al listar residuo', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
}



export const listarMovimientos = async (req, res) => {

    try {
        const rol = req.user.rol;

        if (rol !== 'administrador') {
            return res.status(HTTP_STATUS.unauthorized).json({ 'message': ERROR_MESSAGE.unauthorized });
        }

        let query = `
            SELECT 
                *, 
                r.nombre_residuo as residuo,
                u.nombre as user, 
                COALESCE(a.nombre_act, 'Sin actividad') as actividad, 
                e.nombre_empresa as empresa, 
                m.cantidad as cantidad_total
            FROM 
                movimientos m 
            JOIN 
                usuarios u ON m.usuario_adm = u.id_usuario 
            JOIN 
                residuos r ON m.fk_residuo = r.id_residuo 
            LEFT JOIN 
                actividades a ON m.fk_actividad = a.id_actividad 
            LEFT JOIN 
                empresas_recoleccion e ON m.destino = e.id_empresa
            ORDER BY 
                m.id_movimiento DESC`; 

        let [result] = await pool.query(query);

        if (result.length > 0) {
            res.status(HTTP_STATUS.ok).json(result);
        } else {
            res.status(HTTP_STATUS.notFound).json({ 'message': ERROR_MESSAGE.notFound });
        }
    } catch (error) {
        console.error('Error en al listar residuo', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
}



export const listarTiposResiduos = async (req, res) => {

    try {

        const rol = req.user.rol;


        if (rol !== 'administrador') {
            return res.status(HTTP_STATUS.unauthorized).json({ 'message': ERROR_MESSAGE.unauthorized });
        }

        let query = `SELECT * FROM tipos`
        let [result] = await pool.query(query)

        if (result.length > 0) {
            res.status(HTTP_STATUS.ok).json(result)
        } else {
            res.status(HTTP_STATUS.notFound).json({ 'message': ERROR_MESSAGE.notFound })
        }
    } catch (error) {
        console.error('Error en al listar residuo', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
}



export const listarAlmacenamientos = async (req, res) => {

    try {

        const rol = req.user.rol;


        if (rol !== 'administrador') {
            return res.status(HTTP_STATUS.unauthorized).json({ 'message': ERROR_MESSAGE.unauthorized });
        }

        let query = `SELECT * FROM almacenamiento`
        let [result] = await pool.query(query)

        if (result.length > 0) {
            res.status(HTTP_STATUS.ok).json(result)
        } else {
            res.status(HTTP_STATUS.notFound).json({ 'message': ERROR_MESSAGE.notFound })
        }
    } catch (error) {
        console.error('Error en al listar residuo', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
}



export const listarAdmin = async (req, res) => {

    try {

        const rol = req.user.rol;


        if (rol !== 'administrador') {
            return res.status(HTTP_STATUS.unauthorized).json({ 'message': ERROR_MESSAGE.unauthorized });
        }

        let query = `SELECT * FROM usuarios WHERE rol = 'administrador'`
        let [result] = await pool.query(query)

        if (result.length > 0) {
            res.status(HTTP_STATUS.ok).json(result)
        } else {
            res.status(HTTP_STATUS.notFound).json({ 'message': ERROR_MESSAGE.notFound })
        }
    } catch (error) {
        console.error('Error en al listar admin', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
}



export const listarActividades = async (req, res) => {

    try {

        const rol = req.user.rol;


        if (rol !== 'administrador') {
            return res.status(HTTP_STATUS.unauthorized).json({ 'message': ERROR_MESSAGE.unauthorized });
        }

        let query = `SELECT * FROM actividades WHERE estado_actividad = 'asignada'`
        let [result] = await pool.query(query)

        if (result.length > 0) {

            res.status(HTTP_STATUS.ok).json(result)

        } else {
            res.status(HTTP_STATUS.notFound).json({ 'message': ERROR_MESSAGE.notFound })
        }

    } catch (error) {
        console.error('Error en al listar actividades', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
}



export const listarEmpresas = async (req, res) => {

    try {

        const rol = req.user.rol;


        if (rol !== 'administrador') {
            return res.status(HTTP_STATUS.unauthorized).json({ 'message': ERROR_MESSAGE.unauthorized });
        }

        let query = `SELECT * FROM empresas_recoleccion`
        let [result] = await pool.query(query)

        if (result.length > 0) {


            res.status(HTTP_STATUS.ok).json(result)

        } else {
            res.status(HTTP_STATUS.notFound).json({ 'message': ERROR_MESSAGE.notFound })
        }

    } catch (error) {
        console.error('Error en al listar empresas_recoleccion', error);
        return res.status(HTTP_STATUS.internalServerError).json({ 'message': ERROR_MESSAGE.internalServerError });
    }
}


