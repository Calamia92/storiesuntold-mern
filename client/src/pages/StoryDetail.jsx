// src/pages/StoryDetail.jsx
import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { AuthContext } from '../contexts/AuthContext';
import ContributionItem from '../components/ContributionItem';

export default function StoryDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [session, setSession] = useState(null);

    useEffect(() => {
        axios.get(`/sessions/${id}`)
            .then(res => setSession(res.data))
            .catch(console.error);
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this session?')) {
            await axios.delete(`/sessions/${id}`);
            navigate('/stories');
        }
    };

    if (!session) return <p>Loading…</p>;

    const isOwner = user && session.session.creator === user.id;

    const tagColors = [
        'bg-blue-500',
        'bg-green-500',
        'bg-red-500',
        'bg-yellow-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-indigo-500'
    ];

    return (
        <article>
            <h2 className="text-3xl font-bold mb-2">{session.session.titre}</h2>
            <p className="mb-4">{session.session.description}</p>

            {session.session.tags && session.session.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                    {session.session.tags.map((tag, index) => {
                        const colorClass = tagColors[index % tagColors.length];
                        return (
                            <span
                                key={index}
                                className={`text-white px-2 py-1 rounded ${colorClass} text-sm`}
                            >
                {tag}
              </span>
                        );
                    })}
                </div>
            )}

            <div className="mb-6 space-x-2">
                <Link to={`/contributions/new?sessionId=${id}`} className="btn">
                    Add Contribution
                </Link>

                {isOwner && (
                    <>
                        <Link to={`/stories/edit/${id}`} className="btn">Edit Session</Link>
                        <button onClick={handleDelete} className="btn bg-red-600 hover:bg-red-700">
                            Delete Session
                        </button>
                    </>
                )}
            </div>

            <h3 className="text-2xl mb-4">Contributions</h3>
            <div className="space-y-3">
                {session.contributions.length > 0 ? (
                    session.contributions.map(c => (
                        <ContributionItem key={c.id} contribution={c} />
                    ))
                ) : (
                    <p>No contributions yet.</p>
                )}
            </div>
        </article>
    );
}
