export async function health(req, res) {
    try {
        res.status(200).json({ status: 'ok' });
    } catch (error) {
        console.error('Error in health check:', error);
        res.status(500).json({ error: error.message });
    }
}

export default {
    health,
};
