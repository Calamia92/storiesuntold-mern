// src/components/CommentSection.jsx
import { useState } from 'react';
import axios from '../api/axiosConfig';

export default function CommentSection({ contribution, onCommentAdded }) {
    const [commentText, setCommentText] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddComment = async e => {
        e.preventDefault();
        if (!commentText.trim()) {
            setError('Le commentaire ne peut pas être vide');
            return;
        }
        try {
            setLoading(true);
            // Envoi du commentaire via l'API : la route est /contributions/:id/comment
            const res = await axios.post(`/contributions/${contribution.id}/comment`, { texte: commentText });
            // On attend que l'API retourne la contribution mise à jour avec ses commentaires
            onCommentAdded(res.data.commentaires);
            setCommentText('');
            setError('');
        } catch (err) {
            console.error(err);
            setError("Erreur lors de l'ajout du commentaire");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 border-t pt-2">
            <form onSubmit={handleAddComment} className="space-y-2">
        <textarea
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="input w-full h-20"
            required
        />
                {error && <p className="text-red-600">{error}</p>}
                <button type="submit" className="btn" disabled={loading}>
                    {loading ? 'Envoi...' : 'Ajouter'}
                </button>
            </form>
        </div>
    );
}
