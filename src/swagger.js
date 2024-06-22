import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Documentación de la API para el proyecto',
  },
  servers: [
    {
      url: 'http://localhost:3000', // Cambia esto a tu URL base
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routers/**/*.js'], // Ruta a tus archivos de rutas
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
