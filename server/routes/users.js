const express = require('express');
const { body } = require('express-validator');
const userCtrl = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/users/register
router.post(
    '/register',
    [ body('email').isEmail(), body('password').isLength({ min: 6 }) ],
    userCtrl.register
);

// POST /api/users/login
router.post('/login', userCtrl.login);

// GET /api/users/me
router.get('/me', auth, userCtrl.getProfile);

// PUT /api/users/:id
router.put('/:id', auth, userCtrl.updateUser);

// DELETE /api/users/:id
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;
