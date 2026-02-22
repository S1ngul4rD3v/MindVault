import noteRepository from '../repositories/note.repository.js';

/**
 * Lista todas las notas para mostrar en el sidebar (ordenadas por actualización, objetos planos).
 * @returns {Promise<Array<{ id: number, title: string, content: string, createdAt: Date, updatedAt: Date }>>}
 */
export async function listNotesForSidebar() {
    const notes = await noteRepository.findAll({
        order: [['updatedAt', 'DESC']],
    });
    return notes.map((n) => n.get({ plain: true }));
}

export default {
    listNotesForSidebar,
};
