const Contribution = require('../models/Contribution');

// CREATE (protected)
exports.createContribution = async (req, res) => {
    try {
        const { sessionId, chapitre, texte } = req.body;
        if (!sessionId || !texte) {
            return res.status(400).json({ error: 'SessionId et texte requis' });
        }
        const contrib = await Contribution.create({
            sessionId,
            chapitre,
            texte,
            auteur: req.user.username,
            creator: req.user.id
        });
        res.status(201).json(contrib);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ all for session
exports.getContributionsForSession = async (req, res) => {
    try {
        const contributions = await Contribution.find({ sessionId: req.query.sessionId });
        res.json(contributions);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// READ detail
exports.getContributionDetail = async (req, res) => {
    try {
        const contrib = await Contribution.findById(req.params.id);
        if (!contrib) return res.status(404).json({ error: 'Contribution non trouvée' });
        res.json(contrib);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// UPDATE (protected + ownership)
exports.updateContribution = async (req, res) => {
    try {
        const updated = await Contribution.findOneAndUpdate(
            { _id: req.params.id, creator: req.user.id },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ error: 'Contribution non trouvée ou accès refusé' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE (protected + ownership)
exports.deleteContribution = async (req, res) => {
    try {
        const deleted = await Contribution.findOneAndDelete({ _id: req.params.id, creator: req.user.id });
        if (!deleted) return res.status(404).json({ error: 'Contribution non trouvée ou accès refusé' });
        res.json({ message: 'Contribution supprimée', deleted });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// VOTE
exports.voteContribution = async (req, res) => {
    try {
        const contrib = await Contribution.findByIdAndUpdate(
            req.params.id,
            { $inc: { votes: 1 } },
            { new: true }
        );
        if (!contrib) return res.status(404).json({ error: 'Contribution non trouvée' });
        res.json(contrib);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// APPROVE
exports.validateContribution = async (req, res) => {
    try {
        const contrib = await Contribution.findByIdAndUpdate(
            req.params.contribId,
            { status: 'accepted' },
            { new: true }
        );
        if (!contrib) return res.status(404).json({ error: 'Contribution non trouvée' });
        res.json(contrib);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// REJECT
exports.rejectContribution = async (req, res) => {
    try {
        const contrib = await Contribution.findByIdAndUpdate(
            req.params.contribId,
            { status: 'rejected' },
            { new: true }
        );
        if (!contrib) return res.status(404).json({ error: 'Contribution non trouvée' });
        res.json(contrib);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// COMMENT
exports.addComment = async (req, res) => {
    try {
        const contrib = await Contribution.findById(req.params.id);
        if (!contrib) return res.status(404).json({ error: 'Contribution non trouvée' });
        contrib.commentaires.push({ auteur: req.user.username, texte: req.body.texte });
        await contrib.save();
        res.json(contrib);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// READ all by creator
exports.getContributionsByCreator = async (req, res) => {
    try {
        const contributions = await Contribution.find({ creator: req.query.creator });
        return res.json(contributions);
    } catch (err) {
        return res.status(500).json({ error: 'Erreur serveur' });
    }
};
