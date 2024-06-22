import { pool } from "../database/conexion.js";


export const listarMovMesY = async (req, res) => {
    try {
        const { rol } = req.user;
        const { anio } = req.body; // Se obtiene el año del cuerpo de la solicitud

        if (rol === 'administrador') {
            const query = `
                SELECT 
                    YEAR(fecha) AS anio, 
                    CASE 
                        WHEN MONTH(fecha) = 1 THEN 'Enero'
                        WHEN MONTH(fecha) = 2 THEN 'Febrero'
                        WHEN MONTH(fecha) = 3 THEN 'Marzo'
                        WHEN MONTH(fecha) = 4 THEN 'Abril'
                        WHEN MONTH(fecha) = 5 THEN 'Mayo'
                        WHEN MONTH(fecha) = 6 THEN 'Junio'
                        WHEN MONTH(fecha) = 7 THEN 'Julio'
                        WHEN MONTH(fecha) = 8 THEN 'Agosto'
                        WHEN MONTH(fecha) = 9 THEN 'Septiembre'
                        WHEN MONTH(fecha) = 10 THEN 'Octubre'
                        WHEN MONTH(fecha) = 11 THEN 'Noviembre'
                        WHEN MONTH(fecha) = 12 THEN 'Diciembre'
                    END AS nombre_mes,
                    COUNT(*) AS cantidad_movimientos,
                    SUM(CASE WHEN tipo_movimiento = 'entrada' THEN 1 ELSE 0 END) AS cantidad_entradas,
                    SUM(CASE WHEN tipo_movimiento = 'salida' THEN 1 ELSE 0 END) AS cantidad_salidas
                FROM movimientos
                WHERE YEAR(fecha) = ?
                GROUP BY anio, MONTH(fecha), nombre_mes
                ORDER BY anio DESC, MONTH(fecha) DESC;
            `;

            const [result] = await pool.query(query, [anio]);

            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ message: 'No se encontraron registros de movimientos' });
            }
        } else {
            return res.status(403).json({ message: 'Error: usuario no autorizado' });
        }
    } catch (e) {
        return res.status(500).json({ message: 'Error: ' + e.message });
    }
};


export const residuoListarTipo = async (req, res) => {
    try {
        const query = `
        SELECT t.tipo_residuo, SUM(r.cantidad) AS cantidad
        FROM residuos r
        INNER JOIN tipos t ON r.tipo_residuo = t.id_tipo
        GROUP BY t.tipo_residuo;
    `;


        const [result] = await pool.query(query);

        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ 'message': 'No se encontraron registros de tipos de residuos' });
        }
    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}


export const listarAlmCantidad = async (req, res) => {
    try {

        const { rol } = req.user;

        if (rol === 'administrador') {


            const query = `SELECT * FROM almacenamiento`

            const [result] = await pool.query(query);

            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ 'message': 'No se encontraron registros de alamacenamientos' });
            }

        } else {
            return res.status(403).json({ 'message': 'Error: usuario no autorizado' });
        }


    } catch (e) {
        return res.status(500).json({ 'message': 'Error: ' + e });
    }
}


export const selectX = async (req, res) => {
    try {
        const { rol } = req.user;

        if (rol === 'administrador') {
            const query = `
                SELECT r.unidad_medida, SUM(cantidad) as total 
                FROM residuos r 
                GROUP BY unidad_medida 
                ORDER BY total DESC
             
            `;

      

            const [result] = await pool.query(query);

            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ message: 'No se encontraron registros' });
            }
        } else {
            return res.status(403).json({ message: 'Error: usuario no autorizado' });
        }
    } catch (e) {
        return res.status(500).json({ message: 'Error: ' + e });
    }
};


export const selectResiduosMes = async (req, res) => {
    try {
        const { rol } = req.user;

        if (rol === 'administrador') {
            const query = `
                SELECT 
                    MONTH(m.fecha) as mes, 
                    COUNT(m.id_movimiento) as total 
                FROM 
                    movimientos m 
                WHERE 
                    YEAR(m.fecha) = YEAR(CURDATE())
                GROUP BY 
                    mes 
                ORDER BY 
                    mes ASC
            `;

            const [result] = await pool.query(query);

            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({ message: 'No se encontraron registros' });
            }
        } else {
            return res.status(403).json({ message: 'Error: usuario no autorizado' });
        }
    } catch (e) {
        return res.status(500).json({ message: 'Error: ' + e });
    }
};

export const selecElementos = async (req, res) => {
    try {
        const { rol } = req.user;
        const { year } = req.body;  // Obtener el año de los parámetros de consulta

        if (rol === 'administrador') {
            const query = `
                SELECT
                    e.nombre_elm,
                    CASE
                        WHEN MONTH(a.fecha_actividad) = 1 THEN 'Enero'
                        WHEN MONTH(a.fecha_actividad) = 2 THEN 'Febrero'
                        WHEN MONTH(a.fecha_actividad) = 3 THEN 'Marzo'
                        WHEN MONTH(a.fecha_actividad) = 4 THEN 'Abril'
                        WHEN MONTH(a.fecha_actividad) = 5 THEN 'Mayo'
                        WHEN MONTH(a.fecha_actividad) = 6 THEN 'Junio'
                        WHEN MONTH(a.fecha_actividad) = 7 THEN 'Julio'
                        WHEN MONTH(a.fecha_actividad) = 8 THEN 'Agosto'
                        WHEN MONTH(a.fecha_actividad) = 9 THEN 'Septiembre'
                        WHEN MONTH(a.fecha_actividad) = 10 THEN 'Octubre'
                        WHEN MONTH(a.fecha_actividad) = 11 THEN 'Noviembre'
                        WHEN MONTH(a.fecha_actividad) = 12 THEN 'Diciembre'
                    END AS nombre_mes,
                    SUM(ea.cantidad) AS cantidad
                FROM
                    elementos_actividades ea
                INNER JOIN
                    actividades a ON ea.fk_actividad = a.id_actividad
                INNER JOIN
                    elementos e ON ea.fk_elemento = e.id_elemento
                WHERE
                    YEAR(a.fecha_actividad) = ?
                    AND e.tipo_elm = 'consumible'
                GROUP BY
                    e.nombre_elm, nombre_mes
                ORDER BY
                    nombre_mes, cantidad DESC;
            `;

            const [result] = await pool.query(query, [year]);

            if (result.length > 0) {
                // Procesar los resultados para obtener los 3 elementos más utilizados por mes
                const monthlyData = result.reduce((acc, item) => {
                    const { nombre_mes, nombre_elm, cantidad } = item;
                    if (!acc[nombre_mes]) {
                        acc[nombre_mes] = [];
                    }
                    acc[nombre_mes].push({ nombre_elm, cantidad });
                    return acc;
                }, {});

                // Ordenar y limitar a los 3 primeros elementos por mes
                Object.keys(monthlyData).forEach(mes => {
                    monthlyData[mes] = monthlyData[mes]
                        .sort((a, b) => b.cantidad - a.cantidad)
                        .slice(0, 3);
                });

                return res.status(200).json(monthlyData);
            } else {
                return res.status(404).json({ message: 'No se encontraron registros' });
            }
        } else {
            return res.status(403).json({ message: 'Error: usuario no autorizado' });
        }
    } catch (e) {
        return res.status(500).json({ message: 'Error: ' + e });
    }
};
    
