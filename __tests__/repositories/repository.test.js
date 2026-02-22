import { jest } from '@jest/globals';
import { Repository } from '../../repositories/repository.js';

describe('Repository', () => {
    let mockEntity;
    let repository;

    beforeEach(() => {
        mockEntity = {
            findAll: jest.fn().mockResolvedValue([]),
            findByPk: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue({ id: 1 }),
            update: jest.fn().mockResolvedValue([1]),
            destroy: jest.fn().mockResolvedValue(1),
        };
        repository = new Repository(mockEntity);
    });

    describe('findAll', () => {
        it('debe llamar a entity.findAll con las opciones dadas', async () => {
            const options = { order: [['id', 'ASC']] };
            await repository.findAll(options);
            expect(mockEntity.findAll).toHaveBeenCalledWith(options);
        });

        it('debe devolver el resultado de entity.findAll', async () => {
            const rows = [{ id: 1 }, { id: 2 }];
            mockEntity.findAll.mockResolvedValue(rows);
            const result = await repository.findAll();
            expect(result).toEqual(rows);
        });

        it('debe llamar a findAll con {} por defecto', async () => {
            await repository.findAll();
            expect(mockEntity.findAll).toHaveBeenCalledWith({});
        });
    });

    describe('findById', () => {
        it('debe llamar a entity.findByPk con el id y opciones', async () => {
            const options = { raw: true };
            await repository.findById(42, options);
            expect(mockEntity.findByPk).toHaveBeenCalledWith(42, options);
        });

        it('debe devolver el resultado de findByPk', async () => {
            const row = { id: 42, title: 'test' };
            mockEntity.findByPk.mockResolvedValue(row);
            const result = await repository.findById(42);
            expect(result).toEqual(row);
        });
    });

    describe('create', () => {
        it('debe llamar a entity.create con data y opciones', async () => {
            const data = { title: 'x', content: 'y' };
            const options = {};
            await repository.create(data, options);
            expect(mockEntity.create).toHaveBeenCalledWith(data, options);
        });

        it('debe devolver el resultado de create', async () => {
            const created = { id: 1, title: 'n' };
            mockEntity.create.mockResolvedValue(created);
            const result = await repository.create({ title: 'n' });
            expect(result).toEqual(created);
        });
    });

    describe('update', () => {
        it('debe llamar a entity.update con data y where id', async () => {
            await repository.update(10, { title: 'nuevo' });
            expect(mockEntity.update).toHaveBeenCalledWith(
                { title: 'nuevo' },
                { where: { id: 10 } }
            );
        });

        it('debe devolver [affectedRows]', async () => {
            mockEntity.update.mockResolvedValue([2]);
            const result = await repository.update(1, { title: 'x' });
            expect(result).toEqual([2]);
        });
    });

    describe('remove', () => {
        it('debe llamar a entity.destroy con las opciones', async () => {
            const options = { where: { id: 5 } };
            await repository.remove(options);
            expect(mockEntity.destroy).toHaveBeenCalledWith(options);
        });

        it('debe devolver el número de eliminados', async () => {
            mockEntity.destroy.mockResolvedValue(1);
            const result = await repository.remove();
            expect(result).toBe(1);
        });
    });
});
