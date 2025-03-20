import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto p-6">{children}</main>
            <footer className="bg-gray-100 text-center py-4">
                © {new Date().getFullYear()} Stories Untold
            </footer>
        </div>
    );
}
