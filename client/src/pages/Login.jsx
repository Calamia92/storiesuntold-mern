// src/pages/Login.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleSubmit = async e => {
        e.preventDefault();
        if (!email || !password) {
            setErrorMsg('Veuillez remplir tous les champs');
            return;
        }
        setLoading(true);
        setErrorMsg('');
        try {
            const { data } = await axios.post('/users/login', { email, password });
            localStorage.setItem('token', data.token);
            // Mettre à jour le contexte utilisateur directement avec la réponse
            setUser(data.user);
            navigate('/');
        } catch (err) {
            console.error(err);
            setErrorMsg(
                err.response && err.response.data?.error
                    ? err.response.data.error
                    : 'Erreur lors de la connexion'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4 p-4 border rounded shadow">
            <h2 className="text-3xl text-center">Login</h2>
            {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                className="input w-full"
                disabled={loading}
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="input w-full"
                disabled={loading}
            />
            <button type="submit" className="btn w-full" disabled={loading}>
                {loading ? 'Connexion en cours...' : 'Login'}
            </button>
        </form>
    );
}
