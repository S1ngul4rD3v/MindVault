import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { exec } from 'child_process';
import { promisify } from 'util';
import swaggerSpec from './config/swagger.js';
import routes from './routes/index.js';

const execAsync = promisify(exec);
const PORT = process.env.PORT_MINDVAULT || 3000;

async function runMigrations() {
    try {
        console.log('Running database migrations...');
        const { stdout, stderr } = await execAsync('npx sequelize-cli db:migrate');
        if (stdout) console.log(stdout);
        if (stderr && !stderr.includes('No migrations were executed')) console.error(stderr);
        console.log('Migrations completed.');
    } catch (error) {
        if (error.message.includes('No migrations were executed') ||
            error.message.includes('already exists')) {
            console.log('Migrations are up to date.');
        } else {
            console.error('Error running migrations:', error.message);
            throw error;
        }
    }
}

async function main() {
    await runMigrations();

    const app = express();

    app.set('view engine', 'ejs');
    app.set('views', './views');

    app.use(morgan('tiny'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'MindVault API Documentation',
    }));

    app.use(routes);

    app.listen(PORT, () => {
        console.log(`MindVault is running on port ${PORT}`);
        console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
    });
}

main();
