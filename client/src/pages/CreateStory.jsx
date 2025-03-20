import { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function CreateStory() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const nav = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await axios.post('/sessions', { titre: title, description });
        nav(`/stories/${res.data.id}`);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <h2 className="text-3xl">Create a New Story</h2>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="input"/>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="input h-32"/>
            <button type="submit" className="btn">Create</button>
        </form>
    );
}
