import { Cadastro } from "../types/cadastro.js";
import Conta from "../types/Armazena.js";
import ListarAutores from "./listaAutor.js";

const elementoFormulario = document.querySelector(".block-nova-transacao form") as HTMLFormElement;

elementoFormulario.addEventListener("submit", function(event) {
    try {
        event.preventDefault();
        if (!elementoFormulario.checkValidity()) {
            alert("Por favor preencher todos os campos da transação.");
            return; 
        }

        const inputNome = elementoFormulario.querySelector("#nome") as HTMLInputElement;
        const inputEmail = elementoFormulario.querySelector("#email") as HTMLInputElement;
        const inputBio = elementoFormulario.querySelector("#bio") as HTMLInputElement;

        let nome: string = inputNome.value;
        let email: string = inputEmail.value;
        let biografia: string = inputBio.value;

        const validarEmail: RegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i;
       
        if (!validarEmail.test(email)) {
            alert("Informe um Email válido!");
            return;
        }
 
       if (biografia.length < 100){
           alert("A biografia deve ter ao menos 100 caracteres!");
           return;
 
       }else if ( (biografia.length > 500)){
           alert("A biografia deve ter no máximo 500 caracteres!");
           return;
       }

        const NovoCadastro:Cadastro = {
            nome: nome,
            email: email,
            biografia: biografia,
            data: new Date(),
        }
        
        Conta.registrarTransacao(NovoCadastro);
        ListarAutores.atualizar();
        elementoFormulario.reset();
    }
    catch(erro) {
        alert(erro.message);
    }
});