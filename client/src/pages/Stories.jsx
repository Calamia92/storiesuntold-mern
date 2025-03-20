// src/pages/Stories.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axiosConfig';

export default function Stories() {
    const [allSessions, setAllSessions] = useState([]);
    const [filteredSessions, setFilteredSessions] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Chargement initial de toutes les sessions
    useEffect(() => {
        const fetchSessions = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get('/sessions');
                setAllSessions(data);
                setFilteredSessions(data);
            } catch (err) {
                console.error(err);
                setError("Erreur lors du chargement des stories");
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    // Filtrage côté client dès que query change
    useEffect(() => {
        if (!query) {
            setFilteredSessions(allSessions);
        } else {
            const lowerQuery = query.toLowerCase();
            const filtered = allSessions.filter(session => {
                const inTitle = session.titre?.toLowerCase().includes(lowerQuery);
                const inDescription = session.description?.toLowerCase().includes(lowerQuery);
                const inTags = session.tags && session.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
                return inTitle || inDescription || inTags;
            });
            setFilteredSessions(filtered);
        }
    }, [query, allSessions]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl mb-6 text-center">Stories</h2>
            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Rechercher par titre, description ou tag..."
                    className="input w-1/2"
                />
            </div>
            {loading ? (
                <p className="text-center">Chargement...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredSessions.map(session => (
                        <div key={session.id} className="bg-white rounded shadow p-4">
                            <h3 className="text-xl font-bold mb-2">{session.titre}</h3>
                            <p className="text-gray-700 mb-2">
                                {session.description.length > 100 ? session.description.slice(0, 100) + '...' : session.description}
                            </p>
                            {session.tags && session.tags.length > 0 && (
                                <p className="text-sm text-gray-500 mb-2">
                                    Tags: {session.tags.join(', ')}
                                </p>
                            )}
                            <Link to={`/stories/${session.id}`} className="text-blue-500 hover:underline">
                                Lire la suite
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
