import { jest } from '@jest/globals';

const mockFindAll = jest.fn();
await jest.unstable_mockModule('../../repositories/note.repository.js', () => ({
    default: { findAll: mockFindAll },
}));

const noteService = (await import('../../services/note.service.js')).default;

describe('note.service', () => {
    beforeEach(() => {
        mockFindAll.mockReset();
    });

    describe('listNotesForSidebar', () => {
        it('debe llamar a noteRepository.findAll con order updatedAt DESC', async () => {
            mockFindAll.mockResolvedValue([]);
            await noteService.listNotesForSidebar();
            expect(mockFindAll).toHaveBeenCalledWith({
                order: [['updatedAt', 'DESC']],
            });
        });

        it('debe devolver array de objetos planos mapeados con .get({ plain: true })', async () => {
            const plain1 = { id: 1, title: 'A', content: 'c1', updatedAt: new Date() };
            const plain2 = { id: 2, title: 'B', content: 'c2', updatedAt: new Date() };
            const modelLike1 = { get: jest.fn().mockReturnValue(plain1) };
            const modelLike2 = { get: jest.fn().mockReturnValue(plain2) };
            mockFindAll.mockResolvedValue([modelLike1, modelLike2]);

            const result = await noteService.listNotesForSidebar();

            expect(result).toEqual([plain1, plain2]);
            expect(modelLike1.get).toHaveBeenCalledWith({ plain: true });
            expect(modelLike2.get).toHaveBeenCalledWith({ plain: true });
        });

        it('debe devolver array vacío cuando no hay notas', async () => {
            mockFindAll.mockResolvedValue([]);
            const result = await noteService.listNotesForSidebar();
            expect(result).toEqual([]);
        });
    });
});
