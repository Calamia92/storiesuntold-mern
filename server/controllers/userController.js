const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// REGISTER
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;
    if (await User.findOne({ email })) {
        return res.status(409).json({ error: 'Email déjà utilisé' });
    }
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email, password: hashed });
    res.status(201).json(user);
};

// LOGIN
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Identifiants invalides' });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
};

// PROFILE
exports.getProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
};

// UPDATE
// controllers/userController.js
exports.updateUser = async (req, res) => {
    try {
        const { username, email, currentPassword, password } = req.body;
        const user = await User.findById(req.params.id).select('+password');
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

        // Exiger le mot de passe actuel
        if (!(await bcrypt.compare(currentPassword, user.password))) {
            return res.status(401).json({ error: 'Mot de passe actuel invalide' });
        }

        // Unicité de l’email
        if (email && email !== user.email) {
            if (await User.findOne({ email })) {
                return res.status(409).json({ error: 'Email déjà utilisé' });
            }
            user.email = email;
            user.verified = false;
            // TODO : envoi d’e‑mail de confirmation ici
        }

        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password, 12);

        const updated = await user.save();
        updated.password = undefined;
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// DELETE
exports.deleteUser = async (req, res) => {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json({ message: 'Utilisateur supprimé' });
};
