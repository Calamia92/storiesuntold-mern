const Session = require('../models/Session');

module.exports = async (req, res, next) => {
    try {
        const sessionId = req.params.sessionId || req.params.id;
        const session = await Session.findById(sessionId);
        if (!session || session.creator.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Accès refusé' });
        }
        next();
    } catch (err) {
        return res.status(500).json({ error: 'Erreur serveur' });
    }
};
