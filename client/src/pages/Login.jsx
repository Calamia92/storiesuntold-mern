import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/users/login', { email, password });
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
            <h2 className="text-3xl">Login</h2>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="input"/>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="input"/>
            <button type="submit" className="btn">Login</button>
        </form>
    );
}
