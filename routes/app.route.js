import appController from '../controllers/app.controller.js';

export default function (router) {
    router.get('/', appController.index);

    /**
     * @swagger
     * /health:
     *   get:
     *     summary: Health check endpoint
     *     description: Returns the health status of the server
     *     tags: [Health]
     *     responses:
     *       200:
     *         description: Server is healthy
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/HealthResponse'
     *             example:
     *               status: "ok"
     *       500:
     *         description: Server error
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get('/health', appController.health);
}
