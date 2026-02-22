import noteService from '../services/note.service.js';

export async function index(req, res) {
    try {
        const notes = await noteService.listNotesForSidebar();
        res.render('index', { title: 'MindVault', notes });
    } catch (error) {
        console.error('Error rendering index:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function health(req, res) {
    try {
        res.status(200).json({ status: 'ok' });
    } catch (error) {
        console.error('Error in health check:', error);
        res.status(500).json({ error: error.message });
    }
}

export default {
    index,
    health,
};
