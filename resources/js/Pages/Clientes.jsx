import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Layout from "../Layouts/Layout";
import { useState } from "react";

function Clientes({ clientes }) {
    const { delete: destroy } = useForm();
    const { flash } = usePage().props;
    const [flashMsg, setFlashMsg] = useState(flash.message);
    const { component } = usePage();

    setTimeout(() => {
        setFlashMsg(null);
    }, 2000);

    return (
        <>
            <Head title={component} />

            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="text-dark fw-bold">Clientes</h1>
                    <div className="d-flex">
                        {flashMsg && (
                            <div
                                className="alert alert-danger alert-dismissible fade show mb-0"
                                role="alert"
                            >
                                {flashMsg}
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="alert"
                                    aria-label="Close"
                                ></button>
                            </div>
                        )}

                        {flash.success && (
                            <div
                                className="alert alert-success alert-dismissible fade show mb-0"
                                role="alert"
                            >
                                {flash.success}
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="alert"
                                    aria-label="Close"
                                ></button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="row">
                    {clientes.data.map((cliente) => (
                        <div key={cliente.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h5 className="card-title text-dark fw-semibold">
                                        {cliente.nome}
                                    </h5>
                                    <p className="card-text mb-2">
                                        <span className="fw-bold">Email:</span>{" "}
                                        {cliente.email}
                                    </p>
                                    <p className="card-text">
                                        <span className="fw-bold">CPF:</span>{" "}
                                        {cliente.cpf}
                                    </p>
                                    <div className="d-flex justify-content-end">
                                        <Link
                                            href={`/clientes/${cliente.id}`}
                                            className="btn btn-outline-dark"
                                        >
                                            Ver Detalhes
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-center py-4">
                    {clientes.links.map((link) =>
                        link.url ? (
                            <Link
                                key={link.label}
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`btn btn-outline-dark mx-2 ${
                                    link.active ? "active" : ""
                                }`}
                            />
                        ) : (
                            <span
                                key={link.label}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className="btn btn-light mx-2"
                            />
                        )
                    )}
                </div>
            </div>
        </>
    );
}

Clientes.layout = (page) => <Layout children={page} />;

export default Clientes;
