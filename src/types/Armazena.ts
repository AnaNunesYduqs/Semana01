import { Cadastro } from "./cadastro.js";
import { GrupoCadastro } from "./GrupoTransacao.js";

const transacoes: Cadastro[] = JSON.parse(localStorage.getItem("transacoes"),
(key: string, value: string) => {
    if (key === "data") {
        return new Date(value);
    }
    return value;
}
) || [];


const Conta = {

    getDataAcesso(): Date {
        return new Date();
    },

    getGruposTransacoes(): GrupoCadastro[] {
        const gruposTransacoes: GrupoCadastro[] = [];
        const listaTransacoes: Cadastro[] = structuredClone(transacoes);
        const transacoesOrdenadas: Cadastro[] = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao: string = "";
 
        for (let transacao of transacoesOrdenadas) {
           let labelGrupoTransacao: string = transacao.data.toLocaleDateString("pt-br", {month: "long", year:"numeric"});

             if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                 labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                     label: labelGrupoTransacao,
                     transacoes: []
                 });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }

         return gruposTransacoes;

    },

    registrarTransacao(novaTransacao: Cadastro): void {

        transacoes.push(novaTransacao);
        console.log(this.getGruposTransacoes);
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    }

}

export default Conta;