import { Head, Link, useForm } from "@inertiajs/react";
import Layout from "../Layouts/Layout";
import { useState } from "react";

function VerDetalhes({ cliente }) {
    const { delete: destroy } = useForm();
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        destroy(`/clientes/${cliente.id}`);
        setShowModal(false);
    };

    return (
        <div className="container mt-5">
            <Head title="Detalhes do Cliente" />
            <div className="card border-dark mb-3">
                <div className="card-header bg-dark text-white">
                    <h2>Detalhes do Cliente</h2>
                </div>
                <div className="card-body">
                    <h2 className="card-title">{cliente.nome}</h2>
                    <h5 className="card-text">
                        <strong>Email:</strong> {cliente.email}
                    </h5>
                    <h5 className="card-text">
                        <strong>CPF:</strong> {cliente.cpf}
                    </h5>
                    <p className="card-text">
                        <small className="text-muted">
                            Cliente criado em:{" "}
                            {new Date(cliente.created_at).toLocaleString()}
                        </small>
                    </p>
                    <div className="d-flex justify-content-end">
                        <button
                            type="button"
                            className="btn btn-danger me-2"
                            onClick={() => setShowModal(true)}
                        >
                            Excluir
                        </button>
                        <Link
                            href={`/clientes/${cliente.id}/edit`}
                            className="btn btn-success"
                        >
                            Editar
                        </Link>
                    </div>
                </div>
            </div>

            {/* Modal de Confirmação */}
            <div
                className={`modal fade ${showModal ? "show d-block" : ""}`}
                tabIndex="-1"
                role="dialog"
                style={{
                    display: showModal ? "block" : "none",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header position-relative">
                            <button
                                type="button"
                                className="btn-close position-absolute top-0 end-0 p-3"
                                aria-label="Close"
                                onClick={() => setShowModal(false)}
                            />
                            <h5 className="modal-title">Confirmar Exclusão</h5>
                        </div>
                        <div className="modal-body">
                            <p>
                                Você tem certeza de que deseja excluir este
                                cliente?
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleDelete}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

VerDetalhes.layout = (page) => <Layout children={page} />;

export default VerDetalhes;
