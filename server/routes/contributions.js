const express = require('express');
const router = express.Router();
const contributionCtrl = require('../controllers/contributionController');
const auth = require('../middleware/auth');
const ownsContribution = require('../middleware/ownsContribution');

// GET contributions (par session ou par creator selon query param)
router.get('/', (req, res) => {
    if (req.query.creator) {
        return contributionCtrl.getContributionsByCreator(req, res);
    } else if (req.query.sessionId) {
        return contributionCtrl.getContributionsForSession(req, res);
    }
    return res.status(400).json({ error: 'Paramètre query requis: sessionId ou creator' });
});

// GET contribution detail
router.get('/:id', contributionCtrl.getContributionDetail);

// CREATE (requiert auth)
router.post('/', auth, contributionCtrl.createContribution);

// UPDATE (requiert auth et ownership)
router.put('/:id', auth, ownsContribution, contributionCtrl.updateContribution);

// DELETE (requiert auth et ownership)
router.delete('/:id', auth, ownsContribution, contributionCtrl.deleteContribution);

// VOTE (requiert auth)
router.post('/:id/vote', auth, contributionCtrl.voteContribution);

// UNVOTE (requiert auth)
router.post('/:id/unvote', auth, contributionCtrl.unvoteContribution);

// COMMENT (requiert auth)
router.post('/:id/comment', auth, contributionCtrl.addComment);

// APPROVE/REJECT pour modération (requiert auth et possiblement un middleware de modération)
router.post('/sessions/:sessionId/approve/:contribId', auth, contributionCtrl.validateContribution);
router.post('/sessions/:sessionId/reject/:contribId', auth, contributionCtrl.rejectContribution);

module.exports = router;
