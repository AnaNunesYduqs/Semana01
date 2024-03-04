import Conta from "../types/Armazena.js";
import ListarAutores from "./listaAutor.js";
const elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario.addEventListener("submit", function (event) {
    try {
        event.preventDefault();
        if (!elementoFormulario.checkValidity()) {
            alert("Por favor preencher todos os campos da transação.");
            return;
        }
        const inputNome = elementoFormulario.querySelector("#nome");
        const inputEmail = elementoFormulario.querySelector("#email");
        const inputBio = elementoFormulario.querySelector("#bio");
        let nome = inputNome.value;
        let email = inputEmail.value;
        let biografia = inputBio.value;
        const validarEmail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i;
        if (!validarEmail.test(email)) {
            alert("Informe um Email válido!");
            return;
        }
        if (biografia.length < 100) {
            alert("A biografia deve ter ao menos 100 caracteres!");
            return;
        }
        else if ((biografia.length > 500)) {
            alert("A biografia deve ter no máximo 500 caracteres!");
            return;
        }
        const NovoCadastro = {
            nome: nome,
            email: email,
            biografia: biografia,
            data: new Date(),
        };
        Conta.registrarTransacao(NovoCadastro);
        ListarAutores.atualizar();
        elementoFormulario.reset();
    }
    catch (erro) {
        alert(erro.message);
    }
});
