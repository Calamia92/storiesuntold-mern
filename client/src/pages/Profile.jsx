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
    const [confirmType, setConfirmType] = useState(''); // 'session' ou 'contribution'

    useEffect(() => {
        if (user) {
            // Bien que la requête utilise un query param, on filtre côté front pour être sûr
            axios.get('/sessions')
                .then(res => {
                    // Filtrage des sessions créées par l'utilisateur
                    const userSessions = res.data.filter(s => String(s.creator) === user.id);
                    setSessions(userSessions);
                })
                .catch(err => console.error(err));

            axios.get('/contributions', { params: { creator: user.id } })
                .then(res => {
                    console.log("Contributions from API:", res.data);
                    setContribs(res.data);
                })
                .catch(err => console.error(err));

        }
    }, [user]);

    const handleDeleteSession = async id => {
        try {
            await axios.delete(`/sessions/${id}`);
            setSessions(prev => prev.filter(s => s.id !== id));
        } catch (err) {
            console.error(err);
            alert('Erreur lors de la suppression de la session');
        } finally {
            setConfirmId(null);
            setConfirmType('');
        }
    };

    const handleDeleteContribution = async id => {
        try {
            await axios.delete(`/contributions/${id}`);
            setContribs(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            console.error(err);
            alert('Erreur lors de la suppression de la contribution');
        } finally {
            setConfirmId(null);
            setConfirmType('');
        }
    };

    const confirmDeletion = (id, type) => {
        setConfirmId(id);
        setConfirmType(type);
    };

    if (!user) return <p>Loading…</p>;

    return (
        <div className="container mx-auto p-4">
            {confirmId && (
                <ConfirmModal
                    message={`Voulez-vous vraiment supprimer ce ${confirmType === 'session' ? 'la session' : 'la contribution'} ?`}
                    onConfirm={() =>
                        confirmType === 'session'
                            ? handleDeleteSession(confirmId)
                            : handleDeleteContribution(confirmId)
                    }
                    onCancel={() => { setConfirmId(null); setConfirmType(''); }}
                />
            )}

            <h1 className="text-3xl mb-6">Bonjour, {user.username}</h1>
            <div className="mb-6">
                <Link to="/edit-profile" className="btn bg-blue-500 hover:bg-blue-600">
                    Editer mon compte
                </Link>
            </div>

            <section className="mb-10">
                <h2 className="text-2xl mb-4">Mes Sessions</h2>
                {sessions.length > 0 ? (
                    sessions.map(s => (
                        <div key={s.id} className="flex items-center justify-between p-2 border rounded mb-2">
                            <Link to={`/stories/${s.id}`} className="flex-1">{s.titre}</Link>
                            {/* Boutons CRUD affichés seulement si le user est bien le créateur */}
                            {s.creator === user.id && (
                                <>
                                    <Link to={`/stories/edit/${s.id}`} className="btn mx-2">Edit</Link>
                                    <button onClick={() => confirmDeletion(s.id, 'session')} className="btn bg-red-600">Delete</button>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Aucune session créée.</p>
                )}
            </section>

            <section>
                <h2 className="text-2xl mb-4">Mes Contributions</h2>
                {contribs.length > 0 ? (
                    contribs.map(c => (
                        <div key={c.id} className="flex items-center justify-between p-2 border rounded mb-2">
                            <div className="flex-1">
                                <Link to={`/stories/${c.sessionId}`} className="block">
                                    {c.texte.slice(0, 50)}…
                                </Link>
                            </div>
                            {/* Boutons d'édition et suppression pour les contributions du user */}
                            {c.creator === user.id && (
                                <>
                                    <Link to={`/contributions/edit/${c.id}`} className="btn mx-2">Edit</Link>
                                    <button onClick={() => confirmDeletion(c.id, 'contribution')} className="btn bg-red-600">Delete</button>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Aucune contribution.</p>
                )}
            </section>
        </div>
    );
}
