import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <Link to="/" className="font-bold">Stories Untold</Link>
            <div>
                {!user
                    ? <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                    : <>
                        <Link to="/profile">Profile</Link>
                        <button onClick={logout}>Logout</button>
                    </>
                }
            </div>
        </nav>
    );
}
