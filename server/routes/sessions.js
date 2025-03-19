const express = require('express');
const sessionCtrl = require('../controllers/sessionController');
const auth = require('../middleware/auth');

const router = express.Router();

// GET all sessions
router.get('/', sessionCtrl.getSessions);

// POST create session
router.post('/', auth, sessionCtrl.createSession);

// GET session detail
router.get('/:id', sessionCtrl.getSessionDetail);

// PUT update session
router.put('/:id', auth, sessionCtrl.updateSession);

// DELETE session (and cascade contributions)
router.delete('/:id', auth, sessionCtrl.deleteSession);

module.exports = router;
