import {
    CLUBES
} from "./dados.js";

import {
    completarElenco,
    envelhecerJogadores,
    calcularOverallTime,
    aleatorio
} from "./jogadores.js";

import {
    simularPartida,
    atualizarJogadoresDaPartida,
    escolherAdversario
} from "./partidas.js";

import {
    gerarMercado
} from "./mercado.js";


/* =========================================================
   CRIAR TEMPORADA
========================================================= */

export function criarTemporada(
    clube
) {

    const clubesIA =
        CLUBES[clube.pais].map(
            ([nome, nivel], index) => {

                const [
                    min,
                    max
                ] =
                    nivel === "Grande"
                        ? [85, 99]
                        : nivel === "Médio"
                            ? [60, 84]
                            : [15, 59];


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


    const tabela = {};


    tabela.jogador = {

        id: "jogador",

        nome:
            clube.nome,

        overall:
            calcularOverallTime(
                clube.jogadores
            ),

        jogos: 0,

        vitorias: 0,

        derrotas: 0,

        pontos: 0,

        golsPro: 0,

        golsContra: 0,

        saldo: 0
    };


    for (
        const clubeIA
        of clubesIA
    ) {

        tabela[clubeIA.id] = {

            id:
                clubeIA.id,

            nome:
                clubeIA.nome,

            overall:
                clubeIA.overall,

            jogos: 0,

            vitorias: 0,

            derrotas: 0,

            pontos: 0,

            golsPro: 0,

            golsContra: 0,

            saldo: 0
        };
    }


    return {

        numero:
            clube.historico.length + 1,

        clubesIA,

        tabela,

        etapa:
            "campeonato",

        partidaAtual:
            null,


        campeonato: {

            rodada: 0,

            vitorias: 0,

            derrotas: 0,

            golsPro: 0,

            golsContra: 0,

            pontos: 0,

            posicao: null,

            adversarios: [],

            terminado: false
        },


        copa: {

            jogo: 0,

            vitorias: 0,

            terminado: false,

            campeao: false,

            adversarios: []
        },


        champions: {

            classificado: false,

            jogo: 0,

            vitorias: 0,

            terminado: false,

            campeao: false,

            adversarios: []
        },


        mundial: {

            disputado: false,

            campeao: false
        }
    };
}


/* =========================================================
   PREPARAR CAMPEONATO
========================================================= */

export function prepararCampeonato(
    temporada,
    clube
) {

    temporada.campeonato.adversarios =
        [...temporada.clubesIA]
            .sort(
                () =>
                    Math.random() -
                    0.5
            );


    temporada.campeonato.rodada =
        0;


    /*
        Recalcula força da IA
        no começo da temporada.
    */

    for (
        const clubeIA
        of temporada.clubesIA
    ) {

        const [
            min,
            max
        ] =
            clubeIA.nivel === "Grande"
                ? [85, 99]
                : clubeIA.nivel === "Médio"
                    ? [60, 84]
                    : [15, 59];


        clubeIA.overall =
            aleatorio(
                min,
                max
            );


        temporada.tabela[
            clubeIA.id
        ].overall =
            clubeIA.overall;
    }


    temporada.tabela.jogador.overall =
        calcularOverallTime(
            clube.jogadores
        );
}


/* =========================================================
   PREPARAR JOGO DO CAMPEONATO
========================================================= */

function prepararJogoCampeonato(
    temporada
) {

    if (
        temporada.campeonato.rodada >= 9
    ) {

        return null;
    }


    const adversario =
        temporada.campeonato.adversarios[
            temporada.campeonato.rodada
        ];


    temporada.campeonato.rodada++;


    temporada.partidaAtual = {

        competicao:
            "Campeonato Nacional",

        adversario,

        overallAdversario:
            adversario.overall
    };


    return temporada.partidaAtual;
}


/* =========================================================
   REGISTRAR RESULTADO NA TABELA
========================================================= */

function registrarResultadoTabela(
    temporada,
    resultado
) {

    const partida =
        temporada.partidaAtual;


    const seuTime =
        temporada.tabela.jogador;


    const adversario =
        temporada.tabela[
            partida.adversario.id
        ];


    seuTime.jogos++;

    adversario.jogos++;


    seuTime.golsPro +=
        resultado.golsJogador;


    seuTime.golsContra +=
        resultado.golsAdversario;


    adversario.golsPro +=
        resultado.golsAdversario;


    adversario.golsContra +=
        resultado.golsJogador;


    if (
        resultado.venceu
    ) {

        seuTime.vitorias++;

        seuTime.pontos += 3;

        adversario.derrotas++;

    }

    else {

        adversario.vitorias++;

        adversario.pontos += 3;

        seuTime.derrotas++;
    }


    seuTime.saldo =
        seuTime.golsPro -
        seuTime.golsContra;


    adversario.saldo =
        adversario.golsPro -
        adversario.golsContra;
}


/* =========================================================
   SIMULAR JOGOS DA IA
========================================================= */

function simularPartidasEntreIA(
    temporada
) {

    const clubes =
        temporada.clubesIA;


    for (
        let i = 0;
        i < clubes.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < clubes.length;
            j++
        ) {

            const casa =
                clubes[i];


            const fora =
                clubes[j];


            const resultado =
                simularPartida(
                    casa.overall,
                    fora.overall
                );


            const tabelaCasa =
                temporada.tabela[
                    casa.id
                ];


            const tabelaFora =
                temporada.tabela[
                    fora.id
                ];


            tabelaCasa.jogos++;

            tabelaFora.jogos++;


            tabelaCasa.golsPro +=
                resultado.golsJogador;


            tabelaCasa.golsContra +=
                resultado.golsAdversario;


            tabelaFora.golsPro +=
                resultado.golsAdversario;


            tabelaFora.golsContra +=
                resultado.golsJogador;


            if (
                resultado.venceu
            ) {

                tabelaCasa.vitorias++;

                tabelaCasa.pontos += 3;

                tabelaFora.derrotas++;

            }

            else {

                tabelaFora.vitorias++;

                tabelaFora.pontos += 3;

                tabelaCasa.derrotas++;
            }


            tabelaCasa.saldo =
                tabelaCasa.golsPro -
                tabelaCasa.golsContra;


            tabelaFora.saldo =
                tabelaFora.golsPro -
                tabelaFora.golsContra;
        }
    }
}


/* =========================================================
   CLASSIFICAÇÃO
========================================================= */

export function obterClassificacao(
    temporada
) {

    return Object.values(
        temporada.tabela
    ).sort(
        (a, b) => {

            if (
                b.pontos !==
                a.pontos
            ) {

                return (
                    b.pontos -
                    a.pontos
                );
            }


            if (
                b.saldo !==
                a.saldo
            ) {

                return (
                    b.saldo -
                    a.saldo
                );
            }


            return (
                b.golsPro -
                a.golsPro
            );
        }
    );
}


/* =========================================================
   FINALIZAR CAMPEONATO
========================================================= */

function finalizarCampeonato(
    temporada
) {

    /*
        Simula os 36 jogos entre
        os 9 clubes da IA.
    */

    simularPartidasEntreIA(
        temporada
    );


    const tabelaJogador =
        temporada.tabela.jogador;


    tabelaJogador.saldo =
        tabelaJogador.golsPro -
        tabelaJogador.golsContra;


    const classificacao =
        obterClassificacao(
            temporada
        );


    const posicao =
        classificacao.findIndex(
            time =>
                time.id === "jogador"
        ) + 1;


    temporada.campeonato.posicao =
        posicao;


    temporada.campeonato.pontos =
        tabelaJogador.pontos;


    temporada.campeonato.vitorias =
        tabelaJogador.vitorias;


    temporada.campeonato.derrotas =
        tabelaJogador.derrotas;


    temporada.campeonato.golsPro =
        tabelaJogador.golsPro;


    temporada.campeonato.golsContra =
        tabelaJogador.golsContra;


    temporada.campeonato.terminado =
        true;
}


/* =========================================================
   PRÊMIO DO CAMPEONATO
========================================================= */

export function obterPremioCampeonato(
    posicao
) {

    if (posicao === 1)
        return 50_000_000;

    if (posicao === 2)
        return 40_000_000;

    if (posicao === 3)
        return 30_000_000;

    if (posicao === 4)
        return 20_000_000;

    if (posicao === 5)
        return 15_000_000;

    return 10_000_000;
}


/* =========================================================
   COPA
========================================================= */

function prepararJogoCopa(
    temporada
) {

    if (
        temporada.copa.jogo >= 6
    ) {

        return null;
    }


    let niveis;


    if (
        temporada.copa.jogo < 2
    ) {

        niveis =
            ["Pequeno"];

    }

    else if (
        temporada.copa.jogo < 4
    ) {

        niveis =
            ["Médio"];

    }

    else {

        niveis =
            ["Grande"];
    }


    /*
        Não permite repetir adversário.
    */

    const adversariosUsados =
        temporada.copa.adversarios;


    const disponiveis =
        temporada.clubesIA.filter(
            clubeIA =>
                !adversariosUsados.some(
                    adversario =>
                        adversario.nome ===
                        clubeIA.nome
                )
        );


    const adversario =
        escolherAdversario(
            disponiveis,
            niveis
        );


    /*
        Guarda o adversário
        para impedir repetição.
    */

    temporada.copa.adversarios.push(
        adversario
    );


    temporada.copa.jogo++;


    temporada.partidaAtual = {

        competicao:
            "Copa Nacional",

        adversario,

        overallAdversario:
            adversario.overall
    };


    return temporada.partidaAtual;
}


/* =========================================================
   CRIAR CLUBES DA CHAMPIONS
========================================================= */

function criarClubesChampions(
    clube
) {

    const clubes =
        [];


    for (
        const pais
        of Object.keys(CLUBES)
    ) {

        for (
            const [nome, nivel]
            of CLUBES[pais]
        ) {

            /*
                Não pode enfrentar
                o próprio clube.
            */

            if (
                nome === clube.nome
            ) {

                continue;
            }


            const [
                min,
                max
            ] =
                nivel === "Grande"
                    ? [85, 99]
                    : nivel === "Médio"
                        ? [60, 84]
                        : [15, 59];


            clubes.push({

                id:
                    `champions_${pais}_${nome}`,

                nome,

                nivel,

                overall:
                    aleatorio(
                        min,
                        max
                    ),

                pais
            });
        }
    }


    return clubes;
}


/* =========================================================
   CHAMPIONS
========================================================= */

function prepararJogoChampions(
    temporada,
    clube
) {

    if (
        !temporada.champions.classificado
    ) {

        return null;
    }


    if (
        temporada.champions.jogo >= 6
    ) {

        return null;
    }


    /*
        Na primeira partida, criamos
        a lista de clubes dos 6 países.
    */

    if (
        temporada.champions.adversarios.length === 0
    ) {

        const todosClubes =
            criarClubesChampions(
                clube
            );


        /*
            2 médios + 4 grandes.
        */

        const medios =
            todosClubes.filter(
                clubeIA =>
                    clubeIA.nivel === "Médio"
            );


        const grandes =
            todosClubes.filter(
                clubeIA =>
                    clubeIA.nivel === "Grande"
            );


        /*
            Sorteia 2 médios sem repetição.
        */

        const mediosEscolhidos =
            [];


        while (
            mediosEscolhidos.length < 2 &&
            medios.length > 0
        ) {

            const indice =
                aleatorio(
                    0,
                    medios.length - 1
                );


            mediosEscolhidos.push(
                medios.splice(indice, 1)[0]
            );
        }


        /*
            Sorteia 4 grandes sem repetição.
        */

        const grandesEscolhidos =
            [];


        while (
            grandesEscolhidos.length < 4 &&
            grandes.length > 0
        ) {

            const indice =
                aleatorio(
                    0,
                    grandes.length - 1
                );


            grandesEscolhidos.push(
                grandes.splice(indice, 1)[0]
            );
        }


        temporada.champions.adversarios =
            [
                ...mediosEscolhidos,
                ...grandesEscolhidos
            ];
    }


    const adversario =
        temporada.champions.adversarios[
            temporada.champions.jogo
        ];


    temporada.champions.jogo++;


    temporada.partidaAtual = {

        competicao:
            "Champions League",

        adversario,

        overallAdversario:
            adversario.overall
    };


    return temporada.partidaAtual;
}


/* =========================================================
   MUNDIAL
========================================================= */

function prepararMundial(
    temporada
) {

    if (
        !temporada.champions.campeao
    ) {

        return null;
    }


    if (
        temporada.mundial.disputado
    ) {

        return null;
    }


    const adversarios = [

        "River Plate",

        "Boca Juniors",

        "Flamengo",

        "Palmeiras",

        "Peñarol",

        "Nacional"

    ];


    const nome =
        adversarios[
            aleatorio(
                0,
                adversarios.length - 1
            )
        ];


    temporada.mundial.disputado =
        true;


    temporada.partidaAtual = {

        competicao:
            "Mundial de Clubes",

        adversario: {

            nome,

            nivel:
                "Sul-Americano",

            overall:
                80
        },

        overallAdversario:
            80
    };


    return temporada.partidaAtual;
}


/* =========================================================
   PREPARAR PRÓXIMA PARTIDA
========================================================= */

export function prepararProximaPartida(
    clube,
    temporada
) {

    if (
        temporada.partidaAtual
    ) {

        return temporada.partidaAtual;
    }


    switch (
        temporada.etapa
    ) {

        case "campeonato":

            return prepararJogoCampeonato(
                temporada
            );


        case "copa":

            return prepararJogoCopa(
                temporada
            );


        case "champions":

            return prepararJogoChampions(
                temporada,
                clube
            );


        case "mundial":

            return prepararMundial(
                temporada
            );


        default:

            return null;
    }
}


/* =========================================================
   JOGAR PARTIDA
========================================================= */

export function jogarPartida(
    clube,
    temporada
) {

    const partida =
        temporada.partidaAtual;


    if (!partida) {
        return null;
    }


    let resultado;


    /*
        Mundial:
        exatamente 50%.
    */

    if (
        partida.competicao ===
        "Mundial de Clubes"
    ) {

        const venceu =
            Math.random() < 0.5;


        if (venceu) {

            resultado = {

                venceu: true,

                golsJogador:
                    aleatorio(1, 4),

                golsAdversario:
                    aleatorio(0, 2)
            };

        }

        else {

            resultado = {

                venceu: false,

                golsJogador:
                    aleatorio(0, 2),

                golsAdversario:
                    aleatorio(1, 4)
            };
        }

    }

    else {

        resultado =
            simularPartida(

                calcularOverallTime(
                    clube.jogadores
                ),

                partida.overallAdversario
            );
    }


    /*
        Somente titulares
        recebem alteração.
    */

    atualizarJogadoresDaPartida(
        clube,
        resultado.venceu
    );


    /*
        Campeonato.
    */

    if (
        temporada.etapa ===
        "campeonato"
    ) {

        registrarResultadoTabela(
            temporada,
            resultado
        );
    }


    /*
        Outras competições.
    */

    processarResultado(
        clube,
        temporada,
        resultado
    );


    temporada.partidaAtual =
        null;


    return resultado;
}


/* =========================================================
   PROCESSAR RESULTADO
========================================================= */

function processarResultado(
    clube,
    temporada,
    resultado
) {

    switch (
        temporada.etapa
    ) {

        case "copa":

            if (
                resultado.venceu
            ) {

                temporada.copa.vitorias++;

                clube.dinheiro +=
                    5_000_000;

            }

            else {

                temporada.copa.terminado =
                    true;

                temporada.copa.campeao =
                    false;


                temporada.etapa =
                    temporada.champions.classificado
                        ? "champions"
                        : "fim";
            }

            break;


        case "champions":

            if (
                resultado.venceu
            ) {

                temporada.champions.vitorias++;

                clube.dinheiro +=
                    10_000_000;

            }

            else {

                temporada.champions.terminado =
                    true;

                temporada.champions.campeao =
                    false;

                temporada.etapa =
                    "fim";
            }

            break;


        case "mundial":

            if (
                resultado.venceu
            ) {

                temporada.mundial.campeao =
                    true;

                clube.dinheiro +=
                    30_000_000;
            }


            temporada.etapa =
                "fim";

            break;
    }
}


/* =========================================================
   ATUALIZAR ETAPA
========================================================= */

export function atualizarEtapa(
    clube,
    temporada
) {

    /*
        CAMPEONATO
    */

    if (
        temporada.etapa ===
        "campeonato"
    ) {

        if (
            temporada.campeonato.rodada >= 9
        ) {

            finalizarCampeonato(
                temporada
            );


            clube.dinheiro +=
                obterPremioCampeonato(
                    temporada.campeonato.posicao
                );


            temporada.champions.classificado =
                temporada.campeonato.posicao <= 4;


            temporada.etapa =
                "copa";
        }
    }


    /*
        COPA
    */

    else if (
        temporada.etapa ===
        "copa"
    ) {

        if (
            temporada.copa.jogo >= 6
        ) {

            temporada.copa.terminado =
                true;

            temporada.copa.campeao =
                true;


            clube.dinheiro +=
                30_000_000;


            temporada.etapa =
                temporada.champions.classificado
                    ? "champions"
                    : "fim";
        }
    }


    /*
        CHAMPIONS
    */

    else if (
        temporada.etapa ===
        "champions"
    ) {

        if (
            temporada.champions.jogo >= 6
        ) {

            temporada.champions.terminado =
                true;

            temporada.champions.campeao =
                true;


            clube.dinheiro +=
                50_000_000;


            temporada.etapa =
                "mundial";
        }
    }


    /*
        MUNDIAL
    */

    else if (
        temporada.etapa ===
        "mundial"
    ) {

        if (
            temporada.mundial.disputado
        ) {

            temporada.etapa =
                "fim";
        }
    }
}


/* =========================================================
   FINALIZAR TEMPORADA
========================================================= */

export function finalizarTemporada(
    clube,
    temporada
) {

    /*
        Envelhecimento.
    */

    const resultado =
        envelhecerJogadores(
            clube.jogadores
        );


    clube.jogadores =
        resultado.jogadores;


    /*
        Completa elenco se
        houver menos de 11.
    */

    clube.jogadores =
        completarElenco(
            clube.jogadores,
            clube.pais
        );


    /*
        Remove titulares antigos.
    */

    clube.jogadores.forEach(
        jogador => {

            jogador.titular =
                false;
        }
    );


    /*
        Novo mercado.
    */

    clube.mercado =
        gerarMercado();


    /*
        Títulos.
    */

    if (
        temporada.campeonato.posicao === 1
    ) {

        clube.titulos.nacional++;
    }


    if (
        temporada.copa.campeao
    ) {

        clube.titulos.copa++;
    }


    if (
        temporada.champions.campeao
    ) {

        clube.titulos.champions++;
    }


    if (
        temporada.mundial.campeao
    ) {

        clube.titulos.mundial++;
    }


    /*
        Histórico.
    */

    clube.historico.push({

        temporada:
            temporada.numero,


        campeonato: {

            posicao:
                temporada.campeonato.posicao,

            vitorias:
                temporada.campeonato.vitorias,

            derrotas:
                temporada.campeonato.derrotas,

            pontos:
                temporada.campeonato.pontos,

            golsPro:
                temporada.campeonato.golsPro,

            golsContra:
                temporada.campeonato.golsContra
        },


        copa:
            temporada.copa.campeao,


        champions:
            temporada.champions.campeao,


        mundial:
            temporada.mundial.campeao
    });


    /*
        Zera limite de vendas.
    */

    clube.vendasTemporada =
        0;


    return resultado;
}