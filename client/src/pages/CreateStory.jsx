// src/pages/CreateStory.jsx
import { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function CreateStory() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setErrorMsg('');
        try {
            // Transformation de la chaîne de tags en tableau (séparés par une virgule)
            const tagsArray = tags.split(',').map(t => t.trim()).filter(t => t);
            const { data } = await axios.post('/sessions', { titre: title, description, tags: tagsArray });
            navigate(`/stories/${data.id}`);
        } catch (err) {
            if (err.response?.status === 401) {
                alert('Tu dois te connecter avant de créer une story.');
                navigate('/login');
            } else {
                console.error(err);
                setErrorMsg('Erreur lors de la création de l\'histoire.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4 border rounded shadow">
            <h2 className="text-3xl text-center">Create a New Story</h2>
            {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title"
                className="input w-full"
                required
            />
            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Description"
                className="input h-32 w-full"
                required
            />
            <input
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="Tags (séparés par des virgules)"
                className="input w-full"
            />
            <button type="submit" className="btn w-full">Create</button>
        </form>
    );
}
