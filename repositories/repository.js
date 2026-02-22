/**
 * Clase base para repositorios.
 * Opera sobre un modelo (entity) de Sequelize y expone CRUD común.
 */
export class Repository {
    /**
     * @param {import('sequelize').Model} entity - Modelo Sequelize
     */
    constructor(entity) {
        this.entity = entity;
    }

    /**
     * @param {Object} [options] - Opciones de Sequelize (where, order, limit, offset, etc.)
     * @returns {Promise<Array>}
     */
    async findAll(options = {}) {
        return await this.entity.findAll(options);
    }

    /**
     * @param {number|string} id
     * @param {Object} [options]
     * @returns {Promise<import('sequelize').Model|null>}
     */
    async findById(id, options = {}) {
        return await this.entity.findByPk(id, options);
    }

    /**
     * @param {Object} data
     * @param {Object} [options]
     * @returns {Promise<import('sequelize').Model>}
     */
    async create(data, options = {}) {
        return await this.entity.create(data, options);
    }

    /**
     * @param {number|string} id
     * @param {Object} data
     * @param {Object} [options]
     * @returns {Promise<[number]>} [affectedRows]
     */
    async update(id, data, options = {}) {
        const [affectedRows] = await this.entity.update(data, {
            where: { id },
            ...options,
        });
        return [affectedRows];
    }

    /**
     * @param {Object} [options] - Opciones (where, etc.)
     * @returns {Promise<number>} Número de registros eliminados
     */
    async remove(options = {}) {
        return await this.entity.destroy(options);
    }
}
