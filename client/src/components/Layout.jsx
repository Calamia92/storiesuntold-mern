// src/components/Layout.jsx
import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-50">
                <Navbar />
            </header>
            <main className="flex-grow container mx-auto p-6">
                {children}
            </main>
            <footer className="bg-gray-200 text-gray-600 text-center py-4">
                © {new Date().getFullYear()} Stories Untold. All rights reserved.
            </footer>
        </div>
    );
}
