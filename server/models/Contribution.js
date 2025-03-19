const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    auteur: { type: String, required: true },
    texte: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const ContributionSchema = new mongoose.Schema({
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
    chapitre: { type: Number, required: true },
    texte: { type: String, required: true },
    auteur: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    votes: { type: Number, default: 0 },
    status: { type: String, enum: ['pending','accepted','rejected'], default: 'pending' },
    commentaires: [CommentSchema]
}, { timestamps: true });

// Index pour optimiser les requêtes par session
ContributionSchema.index({ sessionId: 1 });

// JSON transform
ContributionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

module.exports = mongoose.model('Contribution', ContributionSchema);
