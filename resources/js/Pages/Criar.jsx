import { Head, useForm } from "@inertiajs/react";
import Layout from "../Layouts/Layout";
import { useState } from "react";
import { validarCPF } from "../Utils/validators"; // Ajuste o caminho conforme necessário

function Criar() {
    const { data, setData, post, errors, processing } = useForm({
        nome: "",
        email: "",
        cpf: "",
    });

    const [localErrors, setLocalErrors] = useState({});

    function handleNomeChange(e) {
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
        setData("nome", value);
    }

    function handleCpfChange(e) {
        const value = e.target.value.replace(/\D/g, "");
        setData("cpf", value);
    }

    function validateForm() {
        let errors = {};

        if (!data.nome.trim()) {
            errors.nome = "Nome é obrigatório.";
        }

        if (!data.email.trim()) {
            errors.email = "Email é obrigatório.";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Email inválido.";
        }

        if (!data.cpf.trim()) {
            errors.cpf = "CPF é obrigatório.";
        } else if (data.cpf.length !== 11) {
            errors.cpf = "CPF deve ter 11 dígitos.";
        } else if (!validarCPF(data.cpf)) {
            errors.cpf = "CPF inválido.";
        }

        setLocalErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function submit(e) {
        e.preventDefault();

        if (validateForm()) {
            post("/clientes");
        }
    }

    return (
        <>
            <Head title="Cadastrar Cliente" />

            <div className="container mt-5">
                <h1 className="text-center text-dark mb-4">
                    Cadastrar Cliente
                </h1>

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
                            {processing ? "Cadastrando..." : "Cadastrar"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

Criar.layout = (page) => <Layout children={page} />;

export default Criar;
