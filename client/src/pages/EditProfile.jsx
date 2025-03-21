// src/pages/EditProfile.jsx
import { useContext, useState } from 'react';
import axios from '../api/axiosConfig';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
    const { user, setUser, logout } = useContext(AuthContext);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        // Validation client
        if (!currentPassword) {
            return setError('Veuillez saisir votre mot de passe actuel');
        }
        if (newPassword && newPassword !== confirmNewPassword) {
            return setError('Les mots de passe ne correspondent pas');
        }

        const payload = { username, email, currentPassword };
        if (newPassword) payload.password = newPassword;

        try {
            const { data } = await axios.put(`/users/${user.id}`, payload);
            setUser(data);
            navigate('/profile');
        } catch (err) {
            const msg = err.response?.data?.error;
            setError(msg || 'Erreur lors de la mise à jour du profil.');
        } finally {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm("Cette action est irréversible. Confirmer la suppression du compte ?")) return;
        try {
            await axios.delete(`/users/${user.id}`);
            logout();
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Erreur lors de la suppression du compte.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Modifier mon compte</h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Nom d’utilisateur"
                    className="input w-full"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="input w-full"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe actuel"
                    className="input w-full"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Nouveau mot de passe (optionnel)"
                    className="input w-full"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirmer nouveau mot de passe"
                    className="input w-full"
                    value={confirmNewPassword}
                    onChange={e => setConfirmNewPassword(e.target.value)}
                />
                <button type="submit" className="btn w-full">Mettre à jour</button>
            </form>
            <hr className="my-6" />
            <button
                onClick={handleDeleteAccount}
                className="btn bg-red-600 w-full hover:bg-red-700"
            >
                Supprimer mon compte
            </button>
        </div>
    );
}
