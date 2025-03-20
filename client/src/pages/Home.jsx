// src/pages/Home.jsx
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { AuthContext } from '../contexts/AuthContext';

export default function Home() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.get('/sessions')
            .then(res => {
                setSessions(res.data);
            })
            .catch(err => {
                console.error(err);
                setError('Erreur lors du chargement des sessions');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <div className="container mx-auto text-center px-4">
                <h1 className="text-5xl font-bold mb-6">
                    Bienvenue sur Stories Untold
                </h1>
                <p className="text-xl mb-8">
                    Découvrez et co-écrivez des histoires interactives avec notre communauté passionnée.
                </p>
                <Link
                    to={user ? "/stories/new" : "/login"}
                    className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition">
                    Commencez une nouvelle histoire
                </Link>
            </div>

            <div className="mt-16 container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Histoires Récentes</h2>
                {loading && <p className="text-center">Chargement...</p>}
                {error && <p className="text-center text-red-300">{error}</p>}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {sessions.map(session => (
                        <div key={session.id} className="bg-white rounded shadow p-4">
                            <h3 className="text-xl font-bold mb-2">{session.titre}</h3>
                            <p className="text-gray-700 mb-4">
                                {session.description.length > 100
                                    ? session.description.slice(0, 100) + '...'
                                    : session.description
                                }
                            </p>
                            <Link to={`/stories/${session.id}`} className="text-blue-500 hover:underline">
                                Lire la suite
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
