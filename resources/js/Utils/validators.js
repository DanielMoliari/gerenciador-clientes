/**
 * Função para validar o CPF.
 * @param {string} cpf
 * @returns {boolean}
 */
export function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    return resto === parseInt(cpf.substring(10, 11));
}

/**
 * Função para formatar o texto do CPF.
 * @param {string} cpf
 * @returns {string}
 */
export const verCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

/**
 * Função para formatar o texto dos inputs CPF.
 * @param {string} cpf
 * @returns {string}
 */
export function formatarFormCPF(cpf) {
    let value = cpf.replace(/\D/g, "");

    if (value.length > 11) {
        value = value.substring(0, 11);
    }

    if (value.length > 3 && value.length <= 6) {
        value = value.replace(/(\d{3})(\d+)/, "$1.$2");
    } else if (value.length > 6 && value.length <= 9) {
        value = value.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    } else if (value.length > 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4");
    }

    return value;
}

/**
 * Função para validar os inputs de Criação e Edição de Clientes.
 * @param {Array} data
 * @returns {Array}
 */
export function validateForm(data) {
    let errors = {};

    if (!data.nome.trim()) {
        errors.nome = "Nome é obrigatório.";
    }

    if (!data.email.trim()) {
        errors.email = "Email é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Email inválido.";
    }

    const cpfNumeros = data.cpf.replace(/\D/g, "");

    if (!cpfNumeros.trim()) {
        errors.cpf = "CPF é obrigatório.";
    } else if (cpfNumeros.length !== 11) {
        errors.cpf = "CPF deve ter 11 dígitos.";
    } else if (!validarCPF(cpfNumeros)) {
        errors.cpf = "CPF inválido.";
    }

    return errors;
}
