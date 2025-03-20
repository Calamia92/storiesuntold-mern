// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-gray-800 text-white shadow">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold">
                    Stories Untold
                </Link>
                <div className="md:flex space-x-6 hidden">
                    <Link to="/stories" className="hover:text-gray-300">Stories</Link>
                    {!user ? (
                        <>
                            <Link to="/login" className="hover:text-gray-300">Login</Link>
                            <Link to="/signup" className="hover:text-gray-300">Signup</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/profile" className="hover:text-gray-300">Profile</Link>
                            <button onClick={logout} className="hover:text-gray-300">Logout</button>
                        </>
                    )}
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} aria-label="Toggle Menu">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-gray-800 px-4 pt-2 pb-4 space-y-2">
                    <Link to="/stories" className="block hover:text-gray-300" onClick={toggleMenu}>Stories</Link>
                    {!user ? (
                        <>
                            <Link to="/login" className="block hover:text-gray-300" onClick={toggleMenu}>Login</Link>
                            <Link to="/signup" className="block hover:text-gray-300" onClick={toggleMenu}>Signup</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/profile" className="block hover:text-gray-300" onClick={toggleMenu}>Profile</Link>
                            <button onClick={logout} className="block w-full text-left hover:text-gray-300">Logout</button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
