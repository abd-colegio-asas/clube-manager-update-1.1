import {
    POSICOES,
    FORMATO_ESCALACAO,
    FAIXAS_JOGADORES
} from "./dados.js";


/* =========================================================
   NOMES
========================================================= */

const NOMES = {

    "Inglaterra": [
        "James",
        "Oliver",
        "George",
        "Harry",
        "Jack",
        "Charlie",
        "Thomas",
        "William",
        "Leo",
        "Arthur"
    ],

    "França": [
        "Louis",
        "Gabriel",
        "Hugo",
        "Lucas",
        "Jules",
        "Arthur",
        "Mathis",
        "Enzo",
        "Nathan",
        "Theo"
    ],

    "Espanha": [
        "Alejandro",
        "Carlos",
        "Diego",
        "Javier",
        "Miguel",
        "Pablo",
        "Sergio",
        "Alvaro",
        "Daniel",
        "Mateo"
    ],

    "Alemanha": [
        "Lukas",
        "Leon",
        "Felix",
        "Jonas",
        "Paul",
        "Max",
        "Finn",
        "Elias",
        "Noah",
        "Emil"
    ],

    "Itália": [
        "Luca",
        "Marco",
        "Matteo",
        "Francesco",
        "Alessandro",
        "Davide",
        "Lorenzo",
        "Andrea",
        "Gabriele",
        "Riccardo"
    ],

    "Portugal": [
        "João",
        "Diogo",
        "Miguel",
        "Tiago",
        "Gonçalo",
        "Rafael",
        "Martim",
        "Pedro",
        "Bruno",
        "André"
    ]
};


const SOBRENOMES = {

    "Inglaterra": [
        "Smith",
        "Brown",
        "Taylor",
        "Wilson",
        "Johnson",
        "White",
        "Walker",
        "Hall"
    ],

    "França": [
        "Martin",
        "Bernard",
        "Dubois",
        "Thomas",
        "Robert",
        "Richard",
        "Petit",
        "Durand"
    ],

    "Espanha": [
        "Garcia",
        "Rodriguez",
        "Martinez",
        "Lopez",
        "Gonzalez",
        "Fernandez",
        "Sanchez",
        "Perez"
    ],

    "Alemanha": [
        "Müller",
        "Schmidt",
        "Schneider",
        "Fischer",
        "Weber",
        "Meyer",
        "Wagner",
        "Becker"
    ],

    "Itália": [
        "Rossi",
        "Russo",
        "Ferrari",
        "Esposito",
        "Romano",
        "Colombo",
        "Ricci",
        "Marino"
    ],

    "Portugal": [
        "Silva",
        "Santos",
        "Ferreira",
        "Pereira",
        "Oliveira",
        "Costa",
        "Rodrigues",
        "Martins"
    ]
};


/* =========================================================
   FUNÇÕES ALEATÓRIAS
========================================================= */

export function aleatorio(min, max) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;
}


function escolher(array) {

    return array[
        aleatorio(
            0,
            array.length - 1
        )
    ];
}


function gerarId() {

    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .slice(2)
    );
}


/* =========================================================
   VALOR DO JOGADOR
========================================================= */

export function calcularValor(overall) {

    if (overall <= 24)
        return aleatorio(1, 4) * 1_000_000;

    if (overall <= 34)
        return aleatorio(5, 10) * 1_000_000;

    if (overall <= 44)
        return aleatorio(11, 18) * 1_000_000;

    if (overall <= 54)
        return aleatorio(19, 28) * 1_000_000;

    if (overall <= 64)
        return aleatorio(29, 38) * 1_000_000;

    if (overall <= 74)
        return aleatorio(39, 52) * 1_000_000;

    if (overall <= 84)
        return aleatorio(53, 75) * 1_000_000;

    if (overall <= 89)
        return aleatorio(76, 89) * 1_000_000;

    if (overall <= 94)
        return aleatorio(90, 105) * 1_000_000;

    if (overall <= 97)
        return aleatorio(106, 125) * 1_000_000;

    if (overall === 98)
        return aleatorio(126, 140) * 1_000_000;

    return aleatorio(141, 225) * 1_000_000;
}


/* =========================================================
   CRIAR JOGADOR
========================================================= */

export function criarJogador({
    pais,
    idade,
    posicao,
    overallBase
}) {

    const desempenho =
        overallBase;


    const overall =
        Math.round(
            overallBase * 0.55 +
            desempenho * 0.45
        );


    return {

        id: gerarId(),

        nome:
            `${escolher(NOMES[pais])} ${escolher(SOBRENOMES[pais])}`,

        pais,

        idade,

        posicao,

        overallBase,

        desempenho,

        overall,

        valor:
            calcularValor(overall),

        titular:
            false
    };
}


/* =========================================================
   ELENCO INICIAL
========================================================= */

/* =========================================================
   ELENCO INICIAL
========================================================= */

export function criarElencoInicial(pais) {

    const elenco = [];


    /* =====================================================
       TITULARES
    ===================================================== */

    const estruturaTitulares = [

        ["Goleiro", 1],

        ["Zagueiro", 2],

        ["Lateral", 2],

        ["Meia", 3],

        ["Atacante", 3]

    ];


    for (
        const [posicao, quantidade]
        of estruturaTitulares
    ) {

        for (
            let i = 0;
            i < quantidade;
            i++
        ) {

            elenco.push(
                criarJogador({

                    pais,

                    idade:
                        aleatorio(17, 30),

                    posicao,

                    overallBase:
                        aleatorio(35, 65)
                })
            );
        }
    }


    /* =====================================================
       RESERVAS
    ===================================================== */

    const estruturaReservas = [

        "Goleiro",

        "Zagueiro",

        "Lateral",

        "Meia",

        "Atacante"

    ];


    for (
        const posicao
        of estruturaReservas
    ) {

        elenco.push(
            criarJogador({

                pais,

                idade:
                    aleatorio(17, 30),

                posicao,

                overallBase:
                    aleatorio(25, 50)
            })
        );
    }


    return elenco;
}

/* =========================================================
   JOGADOR DO MERCADO
========================================================= */

export function criarJogadorMercado(
    paises
) {

    const pais =
        escolher(paises);


    const posicao =
        escolher(POSICOES);


    const idade =
        aleatorio(17, 44);


    const tier =
        aleatorio(1, 5);


    const [min, max] =
        FAIXAS_JOGADORES[tier];


    return criarJogador({

        pais,

        idade,

        posicao,

        overallBase:
            aleatorio(min, max)
    });
}


/* =========================================================
   ATUALIZAR DESEMPENHO
========================================================= */

export function atualizarDesempenho(
    jogador,
    venceu
) {

    /*
        Chance inicial de aumento.
    */

    let chanceAumento =
        venceu
            ? 0.70
            : 0.35;


    /*
        Jogadores de 38+ têm
        mais dificuldade para evoluir.
    */

    if (
        jogador.idade >= 38
    ) {

        chanceAumento *= 0.55;
    }


    const aumenta =
        Math.random() <
        chanceAumento;


    if (aumenta) {

        jogador.desempenho +=
            aleatorio(1, 3);

    }

    else {

        jogador.desempenho -=
            aleatorio(1, 2);
    }


    /*
        Limites.
    */

    jogador.desempenho =
        Math.max(
            1,
            Math.min(
                99,
                jogador.desempenho
            )
        );


    jogador.overall =
        Math.round(
            jogador.overallBase * 0.55 +
            jogador.desempenho * 0.45
        );


    jogador.overall =
        Math.max(
            1,
            Math.min(
                99,
                jogador.overall
            )
        );


    jogador.valor =
        calcularValor(
            jogador.overall
        );
}


/* =========================================================
   ENVELHECER JOGADORES
========================================================= */

export function envelhecerJogadores(
    jogadores
) {

    const sobreviventes = [];


    for (
        const jogador
        of jogadores
    ) {

        jogador.idade++;


        /*
            Aos 38+, começa a queda.
        */

        if (
            jogador.idade >= 38
        ) {

            jogador.overallBase -=
                aleatorio(0, 2);


            jogador.desempenho -=
                aleatorio(0, 2);


            jogador.overallBase =
                Math.max(
                    1,
                    jogador.overallBase
                );


            jogador.desempenho =
                Math.max(
                    1,
                    jogador.desempenho
                );
        }


        /*
            Aos 45 anos,
            aposenta.
        */

        if (
            jogador.idade >= 45
        ) {

            continue;
        }


        jogador.overall =
            Math.round(
                jogador.overallBase * 0.55 +
                jogador.desempenho * 0.45
            );


        jogador.overall =
            Math.max(
                1,
                Math.min(
                    99,
                    jogador.overall
                )
            );


        jogador.valor =
            calcularValor(
                jogador.overall
            );


        jogador.titular =
            false;


        sobreviventes.push(
            jogador
        );
    }


    return {
        jogadores: sobreviventes
    };
}


/* =========================================================
   COMPLETAR ELENCO
========================================================= */

export function completarElenco(
    jogadores,
    pais
) {

    const elenco =
        [...jogadores];


    const quantidadePorPosicao = {};


    for (
        const posicao
        of POSICOES
    ) {

        quantidadePorPosicao[posicao] =
            elenco.filter(
                jogador =>
                    jogador.posicao ===
                    posicao
            ).length;
    }


    /*
        Primeiro garante as posições
        mínimas para uma escalação.
    */

    for (
        const posicao
        of POSICOES
    ) {

        const necessario =
            FORMATO_ESCALACAO[posicao];


        while (
            quantidadePorPosicao[posicao] <
            necessario &&
            elenco.length < 22
        ) {

            elenco.push(
                criarJogador({

                    pais,

                    idade: 17,

                    posicao,

                    overallBase:
                        aleatorio(30, 45)
                })
            );


            quantidadePorPosicao[posicao]++;
        }
    }


    /*
        Se ainda houver menos de 11,
        completa com qualquer posição.
    */

    while (
        elenco.length < 11
    ) {

        const posicao =
            escolher(POSICOES);


        elenco.push(
            criarJogador({

                pais,

                idade: 17,

                posicao,

                overallBase:
                    aleatorio(30, 45)
            })
        );
    }


    return elenco;
}


/* =========================================================
   OVERALL DO TIME
========================================================= */

export function calcularOverallTime(
    jogadores
) {

    const titulares =
        jogadores.filter(
            jogador =>
                jogador.titular
        );


    if (
        titulares.length !== 11
    ) {

        return 0;
    }


    const soma =
        titulares.reduce(
            (total, jogador) =>
                total + jogador.overall,
            0
        );


    return Math.round(
        soma / 11
    );
}