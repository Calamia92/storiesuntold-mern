// src/pages/EditProfile.jsx
import { useContext, useState } from 'react';
import axios from '../api/axiosConfig';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
    const { user, setUser, logout } = useContext(AuthContext);
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        // Si l'utilisateur veut changer son mot de passe, vérifier que les champs correspondent
        if (newPassword || confirmNewPassword) {
            if (newPassword !== confirmNewPassword) {
                setError("Les mots de passe ne correspondent pas");
                return;
            }
        }

        try {
            // Construire le payload : si newPassword est fourni, l'inclure dans la mise à jour
            const payload = { username, email };
            if (newPassword) {
                payload.password = newPassword;
            }
            const { data } = await axios.put(`/users/${user.id}`, payload);
            setUser(data);
            navigate('/profile');
        } catch (err) {
            console.error(err);
            setError('Erreur lors de la mise à jour du profil.');
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
            try {
                await axios.delete(`/users/${user.id}`);
                logout();
                navigate('/');
            } catch (err) {
                console.error(err);
                setError('Erreur lors de la suppression du compte.');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Modifier le compte</h2>
            {error && <p className="text-red-600">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Nom d'utilisateur</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="input w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="input w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Nouveau mot de passe (optionnel)</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className="input w-full"
                        placeholder="Laissez vide pour ne pas changer"
                    />
                </div>
                <div>
                    <label className="block mb-1">Confirmer le nouveau mot de passe</label>
                    <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={e => setConfirmNewPassword(e.target.value)}
                        className="input w-full"
                        placeholder="Laissez vide pour ne pas changer"
                    />
                </div>
                <button type="submit" className="btn w-full">Mettre à jour</button>
            </form>
            <div className="mt-4">
                <button onClick={handleDeleteAccount} className="btn bg-red-600 w-full">
                    Supprimer le compte
                </button>
            </div>
        </div>
    );
}
