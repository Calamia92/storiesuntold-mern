const Contribution = require('../models/Contribution');

module.exports = async (req, res, next) => {
    try {
        const contrib = await Contribution.findById(req.params.id);
        if (!contrib || contrib.creator.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Accès refusé' });
        }
        next();
    } catch (err) {
        return res.status(500).json({ error: 'Erreur serveur' });
    }
};
