import { Head, useForm } from "@inertiajs/react";
import Layout from "../Layouts/Layout";
import { useState } from "react";
import { formatarFormCPF, validateForm } from "../Utils/validators";
function Editar({ cliente }) {
    const { data, setData, put, errors, processing } = useForm({
        nome: cliente.nome || "",
        email: cliente.email || "",
        cpf: cliente.cpf ? formatarFormCPF(cliente.cpf) : "",
    });

    const [localErrors, setLocalErrors] = useState({});

    function handleNomeChange(e) {
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
        setData("nome", value);
    }

    function handleCpfChange(e) {
        const value = formatarFormCPF(e.target.value);
        setData("cpf", value);
    }

    function submit(e) {
        e.preventDefault();

        const validationErrors = validateForm(data);
        setLocalErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            put(`/clientes/${cliente.id}`);
        }
    }

    return (
        <>
            <Head title="Editar Cliente" />

            <div className="container mt-5">
                <h1 className="text-center text-dark mb-4">Editar Cliente</h1>

                <div className="col-md-6 mx-auto">
                    <form onSubmit={submit} className="card p-4 shadow-sm">
                        <div className="mb-3">
                            <label htmlFor="nome" className="form-label">
                                Nome
                            </label>
                            <input
                                id="nome"
                                type="text"
                                value={data.nome}
                                onChange={handleNomeChange}
                                className={`form-control ${
                                    localErrors.nome || errors.nome
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="Digite o nome do cliente"
                            />
                            {(localErrors.nome || errors.nome) && (
                                <div className="invalid-feedback">
                                    {localErrors.nome || errors.nome}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className={`form-control ${
                                    localErrors.email || errors.email
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="Digite o email do cliente"
                            />
                            {(localErrors.email || errors.email) && (
                                <div className="invalid-feedback">
                                    {localErrors.email || errors.email}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="cpf" className="form-label">
                                CPF
                            </label>
                            <input
                                id="cpf"
                                type="text"
                                value={data.cpf}
                                onChange={handleCpfChange}
                                className={`form-control ${
                                    localErrors.cpf || errors.cpf
                                        ? "is-invalid"
                                        : ""
                                }`}
                                placeholder="Digite o CPF do cliente"
                                maxLength={14}
                            />
                            {(localErrors.cpf || errors.cpf) && (
                                <div className="invalid-feedback">
                                    {localErrors.cpf || errors.cpf}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark w-100 mt-3"
                            disabled={processing}
                        >
                            {processing ? "Atualizando..." : "Atualizar"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

Editar.layout = (page) => <Layout children={page} />;

export default Editar;
