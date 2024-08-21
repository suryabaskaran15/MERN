import swaggerJSDoc from "swagger-jsdoc";
import { PORT } from "./config";

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'MERN',
        version: '1.0.0',
        description: 'API Documentation',
    },
    servers: [
        {
            url: `http://localhost:${PORT}/api`,
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/controllers/**/*.ts', './src/models/*.ts'], // Include all .ts files in nested folders
};

export const swaggerSpec = swaggerJSDoc(options);
