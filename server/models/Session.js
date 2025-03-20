const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    contenu: { type: String, required: true },
    dateCreation: { type: Date, default: Date.now }
});

const SessionSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
    etat: { type: String, enum: ['active','archivée'], default: 'active' },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    chapitres: [ChapterSchema],
    tags: { type: [String], default: [] }
}, { timestamps: true });

// JSON transform
SessionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

module.exports = mongoose.model('Session', SessionSchema);
