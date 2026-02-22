import { jest } from '@jest/globals';
import appController from '../../controllers/app.controller.js';

describe('App Controller', () => {
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
