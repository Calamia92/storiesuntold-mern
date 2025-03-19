const express = require('express');
const contributionCtrl = require('../controllers/contributionController');
const auth = require('../middleware/auth');
const ownsSession = require('../middleware/ownsSession');
const ownsContrib = require('../middleware/ownsContribution');

const router = express.Router();

// Approve a contribution
router.post('/sessions/:sessionId/approve/:contribId', auth, ownsSession, contributionCtrl.validateContribution);

// Reject a contribution
router.post('/sessions/:sessionId/reject/:contribId', auth, ownsContrib, contributionCtrl.rejectContribution);

module.exports = router;
