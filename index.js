import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

import routes from './routes/index.js';

const PORT = process.env.PORT_MINDVAULT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'MindVault API Documentation',
}));

app.use(routes);

app.listen(PORT, () => {
  console.log(`MindVault is running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});
