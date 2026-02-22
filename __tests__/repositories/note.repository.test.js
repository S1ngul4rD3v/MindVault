import { jest } from '@jest/globals';

const mockNoteEntity = {
    findAll: jest.fn().mockResolvedValue([]),
    findByPk: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({ id: 1 }),
    update: jest.fn().mockResolvedValue([1]),
    destroy: jest.fn().mockResolvedValue(1),
};

await jest.unstable_mockModule('../../models/index.js', () => ({
    default: { Note: mockNoteEntity },
}));

const { default: noteRepository } = await import('../../repositories/note.repository.js');

describe('NoteRepository', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockNoteEntity.findAll.mockResolvedValue([]);
    });

    it('findAll delega en el modelo Note con las opciones dadas', async () => {
        const options = { order: [['updatedAt', 'DESC']] };
        await noteRepository.findAll(options);
        expect(mockNoteEntity.findAll).toHaveBeenCalledWith(options);
    });

    it('findById delega en el modelo Note', async () => {
        mockNoteEntity.findByPk.mockResolvedValue({ id: 1, title: 'x' });
        const result = await noteRepository.findById(1);
        expect(mockNoteEntity.findByPk).toHaveBeenCalledWith(1, {});
        expect(result).toEqual({ id: 1, title: 'x' });
    });

    it('create delega en el modelo Note', async () => {
        mockNoteEntity.create.mockResolvedValue({ id: 1, title: 'n', content: 'c' });
        const result = await noteRepository.create({ title: 'n', content: 'c' });
        expect(mockNoteEntity.create).toHaveBeenCalledWith({ title: 'n', content: 'c' }, {});
        expect(result).toEqual({ id: 1, title: 'n', content: 'c' });
    });
});
