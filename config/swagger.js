import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT_MINDVAULT || 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MindVault API',
      version: '1.0.0',
      description: 'MindVault API',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Health',
        description: 'Health check endpoints',
      },
    ],
    components: {
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
        HealthResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'ok',
            },
          },
        },
      },
    },
  },
  apis: [
    path.join(__dirname, '../routes/**/*.js'),
    path.join(__dirname, '../index.js'),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
