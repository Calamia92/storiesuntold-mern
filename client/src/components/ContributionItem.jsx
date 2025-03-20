// src/components/ContributionItem.jsx
import { useState, useContext, useEffect } from 'react';
import axios from '../api/axiosConfig';
import CommentSection from './CommentSection';
import { AuthContext } from '../contexts/AuthContext';

export default function ContributionItem({ contribution: initialContribution }) {
    const { user } = useContext(AuthContext);
    const [votes, setVotes] = useState(initialContribution.votes || 0);
    const [error, setError] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState(initialContribution.commentaires || []);
    const [hasVoted, setHasVoted] = useState(false);

    // Détermine si l'utilisateur a déjà voté
    useEffect(() => {
        if (user && initialContribution.voters) {
            setHasVoted(initialContribution.voters.includes(user.id));
        }
    }, [user, initialContribution.voters]);

    const handleVote = async () => {
        try {
            const res = await axios.post(`/contributions/${initialContribution.id}/vote`);
            setVotes(res.data.votes);
            setHasVoted(true);
        } catch (err) {
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError('Erreur lors du vote');
            }
        }
    };

    const handleUnvote = async () => {
        try {
            const res = await axios.post(`/contributions/${initialContribution.id}/unvote`);
            setVotes(res.data.votes);
            setHasVoted(false);
        } catch (err) {
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError('Erreur lors du retrait du vote');
            }
        }
    };

    const handleCommentAdded = newComments => {
        setComments(newComments);
    };

    return (
        <div className="p-3 border rounded mb-3">
            <p className="mb-2">{initialContribution.texte}</p>
            <div className="flex items-center space-x-4">
                {user && (
                    <>
                        {hasVoted ? (
                            <button onClick={handleUnvote} className="btn bg-yellow-500">
                                Retirer Vote
                            </button>
                        ) : (
                            <button onClick={handleVote} className="btn">
                                Voter
                            </button>
                        )}
                    </>
                )}
                <span>{votes} vote{votes !== 1 && 's'}</span>
                {user && (
                    <button onClick={() => setShowComments(!showComments)} className="btn">
                        {showComments ? 'Masquer les commentaires' : 'Afficher les commentaires'}
                    </button>
                )}
            </div>
            {error && <p className="text-red-600 mt-2">{error}</p>}
            {showComments && (
                <div className="mt-4">
                    {comments.length > 0 ? (
                        <ul className="space-y-2">
                            {comments.map((c, index) => (
                                <li key={index} className="border rounded p-2">
                                    <p className="text-sm">
                                        <strong>{c.auteur}</strong> - {new Date(c.date).toLocaleString()}
                                    </p>
                                    <p>{c.texte}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Aucun commentaire pour le moment.</p>
                    )}
                    {user && (
                        <CommentSection contribution={initialContribution} onCommentAdded={handleCommentAdded} />
                    )}
                </div>
            )}
        </div>
    );
}
