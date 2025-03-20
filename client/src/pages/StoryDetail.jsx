import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { AuthContext } from '../contexts/AuthContext';

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

    return (
        <article>
            <h2 className="text-3xl font-bold mb-2">{session.session.titre}</h2>
            <p className="mb-4">{session.session.description}</p>

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
            <ul className="space-y-3">
                {session.contributions.map(c => (
                    <li key={c.id} className="p-3 border rounded">{c.texte}</li>
                ))}
            </ul>
        </article>
    );
}
