import { Head, useForm } from "@inertiajs/react";
import Layout from "../Layouts/Layout";

function Criar() {
    const { data, setData, post, errors, processing } = useForm({
        nome: "",
        email: "",
        cpf: "",
    });

    function submit(e) {
        e.preventDefault();
        post("/clientes");
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
                                onChange={(e) =>
                                    setData("nome", e.target.value)
                                }
                                className={`form-control ${
                                    errors.nome ? "is-invalid" : ""
                                }`}
                                placeholder="Digite o nome do cliente"
                            />
                            {errors.nome && (
                                <div className="invalid-feedback">
                                    {errors.nome}
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
                                    errors.email ? "is-invalid" : ""
                                }`}
                                placeholder="Digite o email do cliente"
                            />
                            {errors.email && (
                                <div className="invalid-feedback">
                                    {errors.email}
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
                                onChange={(e) => setData("cpf", e.target.value)}
                                className={`form-control ${
                                    errors.cpf ? "is-invalid" : ""
                                }`}
                                placeholder="Digite o CPF do cliente"
                            />
                            {errors.cpf && (
                                <div className="invalid-feedback">
                                    {errors.cpf}
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
