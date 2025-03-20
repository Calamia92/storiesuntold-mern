import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';

export default function EditContribution() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [texte, setTexte] = useState('');
    const [chapitre, setChapitre] = useState(1);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`/contributions/${id}`)
            .then(({ data }) => {
                setTexte(data.texte);
                setChapitre(data.chapitre);
            })
            .catch(err => {
                console.error(err);
                setError('Erreur lors du chargement de la contribution');
            });
    }, [id]);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put(`/contributions/${id}`, { chapitre, texte });
            navigate(-1); // Retour à la page précédente
        } catch (err) {
            console.error(err);
            setError('Erreur lors de la mise à jour');
        }
    };

    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div className="max-w-lg mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Contribution</h1>
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
                <button type="submit" className="btn w-full">Save Changes</button>
            </form>
        </div>
    );
}
