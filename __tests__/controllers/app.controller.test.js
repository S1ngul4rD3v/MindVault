import { jest } from '@jest/globals';
import appController from '../../controllers/app.controller.js';

describe('App Controller', () => {
    describe('index', () => {
        it('should render index view with title', async () => {
            const req = {};
            const res = { render: jest.fn() };

            await appController.index(req, res);

            expect(res.render).toHaveBeenCalledWith('index', { title: 'MindVault' });
        });
    });

    describe('health', () => {
        it('should return status ok', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await appController.health(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: 'ok' });
        });
    });
});
