import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';

export default function EditStory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`/sessions/${id}`)
            .then(({ data }) => {
                setTitle(data.session.titre);
                setDescription(data.session.description);
            })
            .catch(err => setError('Unable to load story'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put(`/sessions/${id}`, { titre: title, description });
            navigate(`/stories/${id}`);
        } catch {
            setError('Update failed');
        }
    };

    if (loading) return <p>Loading form…</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-semibold mb-4">Edit Story</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="input"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <textarea
                    className="input h-32"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <button type="submit" className="btn w-full">Save Changes</button>
            </form>
        </div>
    );
}
