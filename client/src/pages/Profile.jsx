import { useContext, useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';

export default function Profile() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);
    const [contribs, setContribs] = useState([]);
    const [confirmId, setConfirmId] = useState(null);

    useEffect(() => {
        if (user) {
            axios.get(`/sessions?creator=${user.id}`).then(res => setSessions(res.data));
            axios.get(`/contributions?creator=${user.id}`).then(res => setContribs(res.data));
        }
    }, [user]);

    const handleDeleteSession = async id => {
        try {
            await axios.delete(`/sessions/${id}`);
            setSessions(prev => prev.filter(s => s.id !== id));
        } catch (err) {
            console.error(err);
            alert('Erreur lors de la suppression');
        } finally {
            setConfirmId(null);
        }
    };

    if (!user) return <p>Loading…</p>;

    return (
        <div>
            {confirmId && (
                <ConfirmModal
                    message="Delete this session?"
                    onConfirm={() => handleDeleteSession(confirmId)}
                    onCancel={() => setConfirmId(null)}
                />
            )}

            <h1 className="text-3xl mb-6">Hello, {user.username}</h1>

            <section className="mb-10">
                <h2 className="text-2xl">My Sessions</h2>
                {sessions.length > 0 ? (
                    sessions.map(s => (
                        <div key={s.id} className="flex items-center justify-between p-2 border rounded mb-2">
                            <Link to={`/stories/${s.id}`} className="flex-1">{s.titre}</Link>
                            <Link to={`/stories/edit/${s.id}`} className="btn">Edit</Link>
                            <button onClick={() => setConfirmId(s.id)} className="btn bg-red-600">
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No sessions created yet.</p>
                )}
            </section>

            <section>
                <h2 className="text-2xl">My Contributions</h2>
                {contribs.length > 0 ? (
                    contribs.map(c => (
                        <Link key={c.id} to={`/stories/${c.sessionId}`} className="block p-2 border rounded mb-2">
                            {c.texte.slice(0, 50)}…
                        </Link>
                    ))
                ) : (
                    <p>No contributions yet.</p>
                )}
            </section>
        </div>
    );
}
