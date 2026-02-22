import { jest } from '@jest/globals';

const mockListNotesForSidebar = jest.fn().mockResolvedValue([]);
await jest.unstable_mockModule('../../services/note.service.js', () => ({
    default: { listNotesForSidebar: mockListNotesForSidebar },
}));

const { default: appController } = await import('../../controllers/app.controller.js');

describe('App Controller', () => {
    describe('index', () => {
        it('should render index view with title and notes', async () => {
            const req = {};
            const res = { render: jest.fn() };

            await appController.index(req, res);

            expect(mockListNotesForSidebar).toHaveBeenCalled();
            expect(res.render).toHaveBeenCalledWith('index', { title: 'MindVault', notes: [] });
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
