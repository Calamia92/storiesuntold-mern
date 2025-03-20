import { createContext, useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // On mount, check profile
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/users/me')
                .then(res => setUser(res.data))
                .catch(() => localStorage.removeItem('token'));
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
