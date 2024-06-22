import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { pool } from "./src/database/conexion.js";
import validator from "./src/routers/validator.router.js";
import residuo from "./src/routers/residuo.router.js";
import graficos from "./src/routers/graficos.router.js";
import { swaggerUi, swaggerSpec } from './src/swagger.js';
import Actividad from "./src/routers/actividad.router.js";
import elemento from "./src/routers/elemento.router.js";
import usuarios from "./src/routers/usuario.router.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

(async () => {
    try {
        await pool.query("SELECT 1");
        console.log("conexión establecida");
    } catch (error) {
        console.error("error de conexión: ", error);
    }
})();

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});



app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/', validator);
app.use('/usuario', usuarios); // ruta acceder al controlador de ander
app.use('/residuo', residuo); // ruta acceder al controlador de miller
app.use('/elemento', elemento); // ruta acceder al controlador de sebas
app.use('/actividades', Actividad); // ruta acceder al controlador de jose
app.use('/grafico', graficos);

app.listen(3000, () => {
    console.log("escuchando en el puerto 3000");
});
