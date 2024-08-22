import { Link } from "@inertiajs/react";

export default function Layout({ children }) {
    return (
        <div className="d-flex flex-column min-vh-100">
            <header className="bg-dark py-3 shadow-sm">
                <nav className="container d-flex justify-content-between align-items-center">
                    <Link
                        className="text-white text-decoration-none fs-4 fw-bold"
                        href="/"
                    >
                        Página Inicial
                    </Link>
                    <Link
                        className="text-white text-decoration-none fs-4 fw-bold"
                        href="/clientes/create"
                    >
                        Cadastrar Cliente
                    </Link>
                </nav>
            </header>

            <main className="container-fluid mt-0 flex-grow-1">{children}</main>

            <footer className="bg-dark text-white text-center py-4 mt-auto">
                <p className="mb-0">
                    &copy; 2024 Gerenciador de Clientes. Feito por Daniel
                    Moliari
                </p>
            </footer>
        </div>
    );
}
