import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CreateStory() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/sessions', { titre: title, description });
            navigate(`/stories/${data.id}`);
        } catch (err) {
            if (err.response?.status === 401) {
                alert('Tu dois te connecter avant de créer une story.');
                navigate('/login');
            } else {
                console.error(err);
            }
        }
    };
    return (
        <div>
            <h2 className="text-3xl mb-6">All Stories</h2>
            <ul className="space-y-4">
                {sessions.map(s => (
                    <li key={s.id} className="p-4 border rounded hover:shadow">
                        <Link to={`/stories/${s.id}`}>{s.titre}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
