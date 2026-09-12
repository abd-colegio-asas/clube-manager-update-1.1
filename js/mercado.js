import {
    criarJogadorMercado
} from "./jogadores.js";


const PAISES = [

    "Inglaterra",

    "França",

    "Espanha",

    "Alemanha",

    "Itália",

    "Portugal"

];


/* =========================================================
   FORMATAR DINHEIRO
========================================================= */

export function formatarDinheiro(
    valor
) {

    return new Intl.NumberFormat(
        "pt-BR",
        {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0
        }
    ).format(valor);
}


/* =========================================================
   GERAR MERCADO
========================================================= */

export function gerarMercado() {

    const mercado = [];


    for (
        let i = 0;
        i < 5;
        i++
    ) {

        mercado.push(
            criarJogadorMercado(
                PAISES
            )
        );
    }


    return mercado;
}


/* =========================================================
   COMPRAR
========================================================= */

export function comprarJogador(
    clube,
    jogador
) {

    if (
        clube.jogadores.length >= 22
    ) {

        return {

            sucesso: false,

            mensagem:
                "Seu elenco já possui 22 jogadores."
        };
    }


    if (
        clube.dinheiro <
        jogador.valor
    ) {

        return {

            sucesso: false,

            mensagem:
                "Dinheiro insuficiente."
        };
    }


    clube.dinheiro -=
        jogador.valor;


    jogador.titular =
        false;


    clube.jogadores.push(
        jogador
    );


    return {

        sucesso: true,

        mensagem:
            `${jogador.nome} foi contratado!`
    };
}


/* =========================================================
   VENDER
========================================================= */

export function venderJogador(
    clube,
    jogadorId
) {

    if (
        clube.jogadores.length <= 11
    ) {

        return {

            sucesso: false,

            mensagem:
                "Você não pode vender jogadores quando possui exatamente 11."
        };
    }


    if (
        clube.vendasTemporada >= 2
    ) {

        return {

            sucesso: false,

            mensagem:
                "Você já realizou as 2 vendas permitidas nesta temporada."
        };
    }


    const index =
        clube.jogadores.findIndex(
            jogador =>
                jogador.id ===
                jogadorId
        );


    if (
        index === -1
    ) {

        return {

            sucesso: false,

            mensagem:
                "Jogador não encontrado."
        };
    }


    const jogador =
        clube.jogadores[index];


    /* =====================================================
       VERIFICAR QUANTIDADE MÍNIMA POR POSIÇÃO
    ===================================================== */

    const minimoPorPosicao = {

        "Goleiro": 1,

        "Zagueiro": 2,

        "Lateral": 2,

        "Meia": 3,

        "Atacante": 3

    };


    const minimo =
        minimoPorPosicao[jogador.posicao];


    if (
        minimo !== undefined
    ) {

        const quantidade =
            clube.jogadores.filter(
                jogadorAtual =>
                    jogadorAtual.posicao ===
                    jogador.posicao
            ).length;


        if (
            quantidade <= minimo
        ) {

            return {

                sucesso: false,

                mensagem:
                    `Não é possível vender este jogador. Seu elenco precisa ter pelo menos ${minimo} jogador(es) na posição ${jogador.posicao}.`
            };
        }
    }


    /* =====================================================
       REALIZAR VENDA
    ===================================================== */

    clube.dinheiro +=
        jogador.valor;


    clube.jogadores.splice(
        index,
        1
    );


    clube.vendasTemporada++;


    return {

        sucesso: true,

        mensagem:
            `${jogador.nome} foi vendido por ${formatarDinheiro(jogador.valor)}.`
    };
}