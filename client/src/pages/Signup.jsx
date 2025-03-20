import { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.post('/users/register', { username, email, password });
        nav('/login');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
            <h2 className="text-3xl">Sign Up</h2>
            <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" className="input"/>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="input"/>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="input"/>
            <button type="submit" className="btn">Sign Up</button>
        </form>
    );
}
