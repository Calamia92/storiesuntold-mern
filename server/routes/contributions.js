const express = require('express');
const contributionCtrl = require('../controllers/contributionController');
const auth = require('../middleware/auth');
const ownsContribution = require('../middleware/ownsContribution');

const router = express.Router();

// GET contributions (optionnel filter by sessionId)
router.get('/', (req, res, next) => {
    if (req.query.creator) {
        return contributionCtrl.getContributionsByCreator(req, res);
    }
    if (req.query.sessionId) {
        return contributionCtrl.getContributionsForSession(req, res);
    }
    return res.status(400).json({ error: 'Query param sessionId or creator required' });
});


// GET single contribution
router.get('/:id', contributionCtrl.getContributionDetail);

// POST create contribution
router.post('/', auth, contributionCtrl.createContribution);

// PUT update contribution
router.put('/:id', auth, ownsContribution, contributionCtrl.updateContribution);

// DELETE contribution
router.delete('/:id', auth, ownsContribution, contributionCtrl.deleteContribution);

// POST vote
router.post('/:id/vote', auth, contributionCtrl.voteContribution);

// POST comment
router.post('/:id/comment', auth, contributionCtrl.addComment);

module.exports = router;
