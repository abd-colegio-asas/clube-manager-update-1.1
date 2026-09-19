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
   CRAQUES
========================================================= */

const CRAQUES = [

    /* =========================
       OVERALL 100
    ========================= */

    {
        nome: "Gianluigi Donnarumma",
        pais: "Itália",
        posicao: "Goleiro",
        overall: 100
    },

    {
        nome: "Pau Cubarsí",
        pais: "Espanha",
        posicao: "Zagueiro",
        overall: 100
    },

    {
        nome: "Alessandro Bastoni",
        pais: "Itália",
        posicao: "Zagueiro",
        overall: 100
    },

    {
        nome: "Nuno Mendes",
        pais: "Portugal",
        posicao: "Lateral",
        overall: 100
    },

    {
        nome: "Achraf Hakimi",
        pais: "Marrocos",
        posicao: "Lateral",
        overall: 100
    },

    {
        nome: "Arda Güler",
        pais: "Turquia",
        posicao: "Meia",
        overall: 100
    },

    {
        nome: "João Neves",
        pais: "Portugal",
        posicao: "Meia",
        overall: 100
    },

    {
        nome: "Pedri",
        pais: "Espanha",
        posicao: "Meia",
        overall: 100
    },

    {
        nome: "Khvicha Kvaratskhelia",
        pais: "Geórgia",
        posicao: "Atacante",
        overall: 100
    },

    {
        nome: "Lamine Yamal",
        pais: "Espanha",
        posicao: "Atacante",
        overall: 100
    },

    {
        nome: "Désiré Doué",
        pais: "França",
        posicao: "Atacante",
        overall: 100
    },


    /* =========================
       OVERALL 101
    ========================= */

    {
        nome: "Alisson Becker",
        pais: "Brasil",
        posicao: "Goleiro",
        overall: 101
    },

    {
        nome: "Gabriel Magalhães",
        pais: "Brasil",
        posicao: "Zagueiro",
        overall: 101
    },

    {
        nome: "William Saliba",
        pais: "França",
        posicao: "Zagueiro",
        overall: 101
    },

    {
        nome: "Trent Alexander-Arnold",
        pais: "Inglaterra",
        posicao: "Lateral",
        overall: 101
    },

    {
        nome: "Theo Hernández",
        pais: "França",
        posicao: "Lateral",
        overall: 101
    },

    {
        nome: "Jude Bellingham",
        pais: "Inglaterra",
        posicao: "Meia",
        overall: 101
    },

    {
        nome: "Vitinha",
        pais: "Portugal",
        posicao: "Meia",
        overall: 101
    },

    {
        nome: "Federico Valverde",
        pais: "Uruguai",
        posicao: "Meia",
        overall: 101
    },

    {
        nome: "Erling Haaland",
        pais: "Noruega",
        posicao: "Atacante",
        overall: 101
    },

    {
        nome: "Vinícius Júnior",
        pais: "Brasil",
        posicao: "Atacante",
        overall: 101
    },

    {
        nome: "Ousmane Dembélé",
        pais: "França",
        posicao: "Atacante",
        overall: 101
    },


    /* =========================
       OVERALL 102
    ========================= */

    {
        nome: "Thibaut Courtois",
        pais: "Bélgica",
        posicao: "Goleiro",
        overall: 102
    },

    {
        nome: "Rúben Dias",
        pais: "Portugal",
        posicao: "Zagueiro",
        overall: 102
    },

    {
        nome: "Antonio Rüdiger",
        pais: "Alemanha",
        posicao: "Zagueiro",
        overall: 102
    },

    {
        nome: "Dani Carvajal",
        pais: "Espanha",
        posicao: "Lateral",
        overall: 102
    },

    {
        nome: "Alejandro Grimaldo",
        pais: "Espanha",
        posicao: "Lateral",
        overall: 102
    },

    {
        nome: "Kevin De Bruyne",
        pais: "Bélgica",
        posicao: "Meia",
        overall: 102
    },

    {
        nome: "Rodri",
        pais: "Espanha",
        posicao: "Meia",
        overall: 102
    },

    {
        nome: "Mesut Özil",
        pais: "Alemanha",
        posicao: "Meia",
        overall: 102
    },

    {
        nome: "Harry Kane",
        pais: "Inglaterra",
        posicao: "Atacante",
        overall: 102
    },

    {
        nome: "Kylian Mbappé",
        pais: "França",
        posicao: "Atacante",
        overall: 102
    },

    {
        nome: "Mohamed Salah",
        pais: "Egito",
        posicao: "Atacante",
        overall: 102
    },


    /* =========================
       OVERALL 103
    ========================= */

    {
        nome: "Iker Casillas",
        pais: "Espanha",
        posicao: "Goleiro",
        overall: 103
    },

    {
        nome: "Virgil van Dijk",
        pais: "Países Baixos",
        posicao: "Zagueiro",
        overall: 103
    },

    {
        nome: "Gerard Piqué",
        pais: "Espanha",
        posicao: "Zagueiro",
        overall: 103
    },

    {
        nome: "Marcelo",
        pais: "Brasil",
        posicao: "Lateral",
        overall: 103
    },

    {
        nome: "Dani Alves",
        pais: "Brasil",
        posicao: "Lateral",
        overall: 103
    },

    {
        nome: "Sergio Busquets",
        pais: "Espanha",
        posicao: "Meia",
        overall: 103
    },

    {
        nome: "Xavi Hernández",
        pais: "Espanha",
        posicao: "Meia",
        overall: 103
    },

    {
        nome: "Toni Kroos",
        pais: "Alemanha",
        posicao: "Meia",
        overall: 103
    },

    {
        nome: "Luis Suárez",
        pais: "Uruguai",
        posicao: "Atacante",
        overall: 103
    },

    {
        nome: "Robert Lewandowski",
        pais: "Polônia",
        posicao: "Atacante",
        overall: 103
    },

    {
        nome: "Karim Benzema",
        pais: "França",
        posicao: "Atacante",
        overall: 103
    },


    /* =========================
       OVERALL 104
    ========================= */

    {
        nome: "Gianluigi Buffon",
        pais: "Itália",
        posicao: "Goleiro",
        overall: 104
    },

    {
        nome: "Franco Baresi",
        pais: "Itália",
        posicao: "Zagueiro",
        overall: 104
    },

    {
        nome: "Sergio Ramos",
        pais: "Espanha",
        posicao: "Zagueiro",
        overall: 104
    },

    {
        nome: "Ashley Cole",
        pais: "Inglaterra",
        posicao: "Lateral",
        overall: 104
    },

    {
        nome: "Philipp Lahm",
        pais: "Alemanha",
        posicao: "Lateral",
        overall: 104
    },

    {
        nome: "Andrés Iniesta",
        pais: "Espanha",
        posicao: "Meia",
        overall: 104
    },

    {
        nome: "Luka Modrić",
        pais: "Croácia",
        posicao: "Meia",
        overall: 104
    },

    {
        nome: "Andrea Pirlo",
        pais: "Itália",
        posicao: "Meia",
        overall: 104
    },

    {
        nome: "Romário",
        pais: "Brasil",
        posicao: "Atacante",
        overall: 104
    },

    {
        nome: "Ronaldinho Gaúcho",
        pais: "Brasil",
        posicao: "Atacante",
        overall: 104
    },

    {
        nome: "Rivaldo",
        pais: "Brasil",
        posicao: "Atacante",
        overall: 104
    },


    /* =========================
       OVERALL 105
    ========================= */

    {
        nome: "Manuel Neuer",
        pais: "Alemanha",
        posicao: "Goleiro",
        overall: 105
    },

    {
        nome: "Paolo Maldini",
        pais: "Itália",
        posicao: "Zagueiro",
        overall: 105
    },

    {
        nome: "Franz Beckenbauer",
        pais: "Alemanha",
        posicao: "Zagueiro",
        overall: 105
    },

    {
        nome: "Roberto Carlos",
        pais: "Brasil",
        posicao: "Lateral",
        overall: 105
    },

    {
        nome: "Cafu",
        pais: "Brasil",
        posicao: "Lateral",
        overall: 105
    },

    {
        nome: "Zinedine Zidane",
        pais: "França",
        posicao: "Meia",
        overall: 105
    },

    {
        nome: "Diego Maradona",
        pais: "Argentina",
        posicao: "Meia",
        overall: 105
    },

    {
        nome: "Johan Cruyff",
        pais: "Países Baixos",
        posicao: "Meia",
        overall: 105
    },

    {
        nome: "Ronaldo Nazário",
        pais: "Brasil",
        posicao: "Atacante",
        overall: 105
    },

    {
        nome: "Marco van Basten",
        pais: "Países Baixos",
        posicao: "Atacante",
        overall: 105
    },

    {
        nome: "Neymar Júnior",
        pais: "Brasil",
        posicao: "Atacante",
        overall: 105
    }

];


/* =========================================================
   GOATS
========================================================= */

const GOATS = [

    {
        nome: "Pelé",
        pais: "Brasil",
        posicao: "Atacante",
        overall: 106
    },

    {
        nome: "Lionel Messi",
        pais: "Argentina",
        posicao: "Atacante",
        overall: 106
    },

    {
        nome: "Cristiano Ronaldo",
        pais: "Portugal",
        posicao: "Atacante",
        overall: 106
    }

];


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

    if (overall === 99)
        return aleatorio(141, 160) * 1_000_000;

    if (overall === 100)
        return aleatorio(161, 185) * 1_000_000;

    if (overall === 101)
        return aleatorio(186, 210) * 1_000_000;

    if (overall === 102)
        return aleatorio(211, 240) * 1_000_000;

    if (overall === 103)
        return aleatorio(241, 270) * 1_000_000;

    if (overall === 104)
        return aleatorio(271, 300) * 1_000_000;

    if (overall === 105)
        return aleatorio(301, 350) * 1_000_000;

    if (overall === 106)
        return aleatorio(351, 500) * 1_000_000;

    return 1_000_000;
}


/* =========================================================
   CRIAR JOGADOR
========================================================= */

export function criarJogador({
    pais,
    idade,
    posicao,
    overallBase,
    nomeEspecial = null,
    especial = false,
    tipoEspecial = null
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
            nomeEspecial ||
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
            false,

        especial,

        tipoEspecial
    };
}


/* =========================================================
   CRIAR CRAQUE / GOAT
========================================================= */

function criarJogadorEspecial(
    jogadorBase
) {

    const idade =
        jogadorBase.overall === 106
            ? aleatorio(17, 25)
            : aleatorio(17, 30);


    return criarJogador({

        pais:
            jogadorBase.pais,

        idade,

        posicao:
            jogadorBase.posicao,

        overallBase:
            jogadorBase.overall,

        nomeEspecial:
            jogadorBase.nome,

        especial:
            true,

        tipoEspecial:
            jogadorBase.overall === 106
                ? "GOAT"
                : "CRAQUE"
    });
}


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
   JOGADOR NORMAL DO MERCADO
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
        Craques e GOATs possuem
        overall/desempenho fixos.
    */

    if (
        jogador.especial
    ) {

        jogador.desempenho =
            jogador.overall;

        jogador.overallBase =
            jogador.overall;

        jogador.overall =
            jogador.overall;

        return;
    }


    let chanceAumento =
        venceu
            ? 0.70
            : 0.35;


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
            Craques e GOATs não sofrem
            queda de atributos com a idade.
        */

        if (
            jogador.especial
        ) {

            if (
                jogador.idade >= 45
            ) {

                continue;
            }


            jogador.overallBase =
                jogador.overall;

            jogador.desempenho =
                jogador.overall;

            jogador.valor =
                jogador.valor;

            jogador.titular =
                false;


            sobreviventes.push(
                jogador
            );

            continue;
        }


        /*
            Jogadores normais:
            aos 38+, começa a queda.
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


/* =========================================================
   EXPORTAR LISTAS ESPECIAIS
========================================================= */

export {
    CRAQUES,
    GOATS,
    criarJogadorEspecial
};