import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';

export default function CreateContribution() {
    // On récupère l'ID de la session dans l'URL via query string (ex: ?sessionId=...)
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('sessionId');
    const navigate = useNavigate();

    const [texte, setTexte] = useState('');
    const [chapitre, setChapitre] = useState(1);
    const [error, setError] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('/contributions', { sessionId, chapitre, texte });
            // Une fois la contribution créée, on redirige vers la page détail de la session
            navigate(`/stories/${sessionId}`);
        } catch (err) {
            console.error(err);
            setError('Erreur lors de la création de la contribution');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Add Contribution</h1>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Chapitre:</label>
                    <input
                        type="number"
                        value={chapitre}
                        onChange={e => setChapitre(e.target.value)}
                        className="input w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Texte:</label>
                    <textarea
                        value={texte}
                        onChange={e => setTexte(e.target.value)}
                        className="input w-full h-32"
                        required
                    />
                </div>
                <button type="submit" className="btn w-full">Submit Contribution</button>
            </form>
        </div>
    );
}
