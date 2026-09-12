import {
    FAIXAS_CLUBES
} from "./dados.js";

import {
    atualizarDesempenho,
    calcularOverallTime,
    aleatorio
} from "./jogadores.js";


/* =========================================================
   CRIAR CLUBES DA IA
========================================================= */

export function criarClubesIA(
    clubes
) {

    return clubes.map(
        ([nome, nivel], index) => {

            const [
                min,
                max
            ] =
                FAIXAS_CLUBES[nivel];


            return {

                id:
                    `ia_${index}_${Date.now()}_${Math.random()}`,

                nome,

                nivel,

                overall:
                    aleatorio(
                        min,
                        max
                    )
            };
        }
    );
}


/* =========================================================
   ATUALIZAR FORÇA
========================================================= */

export function atualizarForcaClubes(
    clubes
) {

    for (
        const clube
        of clubes
    ) {

        const [
            min,
            max
        ] =
            FAIXAS_CLUBES[
                clube.nivel
            ];


        clube.overall =
            aleatorio(
                min,
                max
            );
    }
}


/* =========================================================
   SIMULAR PARTIDA
========================================================= */

export function simularPartida(
    overallJogador,
    overallAdversario
) {

    const diferenca =
        overallJogador -
        overallAdversario;


    let chanceJogador =
        0.50 +
        diferenca * 0.008;


    chanceJogador =
        Math.max(
            0.10,
            Math.min(
                0.90,
                chanceJogador
            )
        );


    const jogadorVence =
        Math.random() <
        chanceJogador;


    let golsJogador;

    let golsAdversario;


    if (jogadorVence) {

        golsJogador =
            aleatorio(1, 5);


        golsAdversario =
            aleatorio(
                0,
                golsJogador - 1
            );

    }

    else {

        golsAdversario =
            aleatorio(1, 5);


        golsJogador =
            aleatorio(
                0,
                golsAdversario - 1
            );
    }


    return {

        venceu:
            jogadorVence,

        golsJogador,

        golsAdversario
    };
}


/* =========================================================
   ATUALIZAR JOGADORES DA PARTIDA
========================================================= */

export function atualizarJogadoresDaPartida(
    clube,
    venceu
) {

    const titulares =
        clube.jogadores.filter(
            jogador =>
                jogador.titular
        );


    for (
        const jogador
        of titulares
    ) {

        atualizarDesempenho(
            jogador,
            venceu
        );
    }
}


/* =========================================================
   ESCOLHER ADVERSÁRIO
========================================================= */

export function escolherAdversario(
    clubesIA,
    niveis
) {

    const possiveis =
        clubesIA.filter(
            clube =>
                niveis.includes(
                    clube.nivel
                )
        );


    if (
        possiveis.length === 0
    ) {

        return clubesIA[
            aleatorio(
                0,
                clubesIA.length - 1
            )
        ];
    }


    return possiveis[
        aleatorio(
            0,
            possiveis.length - 1
        )
    ];
}


/* =========================================================
   OVERALL DO CLUBE
========================================================= */

export function obterOverallClube(
    clube
) {

    return calcularOverallTime(
        clube.jogadores
    );
}