const Session = require('../models/Session');
const Contribution = require('../models/Contribution');

// CREATE (protected)
exports.createSession = async (req, res) => {
    try {
        const session = await Session.create({
            ...req.body,
            creator: req.user.id
        });
        res.status(201).json(session);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// READ all (public)
exports.getSessions = async (req, res) => {
    try {
        const sessions = await Session.find().sort({ createdAt: -1 });
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// READ detail (public)
exports.getSessionDetail = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) return res.status(404).json({ error: 'Session non trouvée' });

        const contributions = await Contribution.find({ sessionId: session._id });
        res.json({ session, contributions });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// UPDATE (protected)
exports.updateSession = async (req, res) => {
    try {
        const updated = await Session.findOneAndUpdate(
            { _id: req.params.id, creator: req.user.id },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ error: 'Session non trouvée ou accès refusé' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE (protected)
exports.deleteSession = async (req, res) => {
    try {
        await Contribution.deleteMany({ sessionId: req.params.id });
        const deleted = await Session.findOneAndDelete({ _id: req.params.id, creator: req.user.id });
        if (!deleted) return res.status(404).json({ error: 'Session non trouvée ou accès refusé' });
        res.json({ message: 'Session supprimée', deleted });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// SEARCH
/*exports.searchSessions = async (req, res) => {
    try {
        let { query } = req.query;
        console.log("Recherche avec query:", query);

        // Si aucun query n'est fourni, on retourne toutes les sessions
        if (!query) {
            const sessions = await Session.find();
            return res.json(sessions);
        }

        // Forcer query en chaîne de caractères (au cas où)
        query = query.toString();

        // Créer l'expression régulière de manière explicite
        const regex = new RegExp(query, 'i');

        const sessions = await Session.find({
            $or: [
                { titre: regex },
                { description: regex },
                { tags: regex }
            ]
        });
        return res.json(sessions);
    } catch (err) {
        console.error("Erreur dans searchSessions:", err);
        return res.status(500).json({ error: err.message });
    }
};
*/

