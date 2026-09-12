import {
    criarElencoInicial,
    calcularOverallTime
} from "./jogadores.js";

import {
    formatarDinheiro,
    comprarJogador,
    venderJogador
} from "./mercado.js";

import {
    criarTemporada,
    prepararCampeonato,
    prepararProximaPartida,
    jogarPartida,
    atualizarEtapa,
    finalizarTemporada,
    obterClassificacao
} from "./temporada.js";


/* =========================================================
   SAVE
========================================================= */

const CHAVE_SAVE =
    "simuladorFutebolSave";


function salvarJogo() {

    if (!clube) {
        return;
    }

    const save = {
        clube,
        temporadaAtual
    };

    localStorage.setItem(
        CHAVE_SAVE,
        JSON.stringify(save)
    );
}


function carregarJogo() {

    const dados =
        localStorage.getItem(
            CHAVE_SAVE
        );

    if (!dados) {
        return false;
    }

    try {

        const save =
            JSON.parse(dados);

        clube =
            save.clube;

        temporadaAtual =
            save.temporadaAtual || null;

        window.clubeAtual =
            clube;

        return true;

    } catch (erro) {

        console.error(
            "Erro ao carregar save:",
            erro
        );

        return false;
    }
}


function existeSave() {

    return !!localStorage.getItem(
        CHAVE_SAVE
    );
}


function apagarSave() {

    localStorage.removeItem(
        CHAVE_SAVE
    );

    clube = null;

    temporadaAtual = null;

    window.clubeAtual = null;
}


/* =========================================================
   ESTADO
========================================================= */

let clube = null;

let temporadaAtual = null;

let voltandoDaTemporada = false;


/* =========================================================
   TELAS
========================================================= */

const telas = [

    "telaCriacao",

    "telaPrincipal",

    "telaElenco",

    "telaMercado",

    "telaTemporada",

    "telaHistorico"

];


function mostrarTela(id) {

    telas.forEach(
        tela => {

            const elemento =
                document.getElementById(
                    tela
                );

            if (elemento) {

                elemento.classList.add(
                    "oculto"
                );
            }
        }
    );


    const destino =
        document.getElementById(
            id
        );


    if (destino) {

        destino.classList.remove(
            "oculto"
        );
    }
}


/* =========================================================
   MENU INICIAL
========================================================= */

const btnNovoClube =
    document.getElementById(
        "btnNovoClube"
    );

const btnContinuar =
    document.getElementById(
        "btnContinuar"
    );

const btnApagarSave =
    document.getElementById(
        "btnApagarSave"
    );

const menuInicial =
    document.getElementById(
        "menuInicial"
    );

const formularioCriacao =
    document.getElementById(
        "formularioCriacao"
    );


function atualizarMenuInicial() {

    const temSave =
        existeSave();

    btnContinuar.disabled =
        !temSave;

    btnApagarSave.disabled =
        !temSave;
}


btnNovoClube.addEventListener(
    "click",
    () => {

        if (existeSave()) {

            const confirmar =
                confirm(
                    "Você já possui um save. Criar um novo clube apagará o progresso atual. Deseja continuar?"
                );

            if (!confirmar) {
                return;
            }

            apagarSave();
        }


        document.getElementById(
            "nomeClube"
        ).value = "";


        document.getElementById(
            "paisClube"
        ).value = "";


        menuInicial.classList.add(
            "oculto"
        );


        formularioCriacao.classList.remove(
            "oculto"
        );
    }
);


btnContinuar.addEventListener(
    "click",
    () => {

        if (!carregarJogo()) {
            return;
        }


        atualizarInterface();


        if (temporadaAtual) {

            mostrarTela(
                "telaTemporada"
            );

            mostrarPartida();

        } else {

            mostrarTela(
                "telaPrincipal"
            );
        }
    }
);


btnApagarSave.addEventListener(
    "click",
    () => {

        if (!existeSave()) {
            return;
        }


        const confirmar =
            confirm(
                "Tem certeza que deseja apagar seu save? Todo o progresso será perdido."
            );


        if (!confirmar) {
            return;
        }


        apagarSave();


        alert(
            "Save apagado com sucesso!"
        );


        atualizarMenuInicial();
    }
);


/* =========================================================
   CRIAR CLUBE
========================================================= */

document
    .getElementById(
        "btnCriarClube"
    )
    .addEventListener(
        "click",
        criarClube
    );


function criarClube() {

    const nome =
        document
            .getElementById(
                "nomeClube"
            )
            .value
            .trim();


    const pais =
        document
            .getElementById(
                "paisClube"
            )
            .value;


    if (!nome) {

        alert(
            "Digite o nome do clube."
        );

        return;
    }


    if (!pais) {

        alert(
            "Escolha um país."
        );

        return;
    }


    clube = {

        id:
            Math.random()
                .toString(36)
                .slice(2),

        nome,

        pais,

        dinheiro:
            10_000_000,

        jogadores:
            criarElencoInicial(
                pais
            ),

        mercado: [],

        vendasTemporada: 0,

        titulos: {

            nacional: 0,

            copa: 0,

            champions: 0,

            mundial: 0
        },

        historico: []
    };


    window.clubeAtual =
        clube;


    definirTitularesAutomaticamente();


    atualizarInterface();


    salvarJogo();


    mostrarTela(
        "telaPrincipal"
    );
}


/* =========================================================
   TITULARES AUTOMÁTICOS
========================================================= */

function definirTitularesAutomaticamente() {

    const limites = {

        Goleiro: 1,

        Zagueiro: 2,

        Lateral: 2,

        Meia: 3,

        Atacante: 3
    };


    clube.jogadores.forEach(
        jogador => {

            jogador.titular =
                false;
        }
    );


    for (
        const posicao
        in limites
    ) {

        const jogadores =
            clube.jogadores
                .filter(
                    jogador =>
                        jogador.posicao ===
                        posicao
                )
                .sort(
                    (a, b) =>
                        b.overall -
                        a.overall
                );


        jogadores
            .slice(
                0,
                limites[posicao]
            )
            .forEach(
                jogador => {

                    jogador.titular =
                        true;
                }
            );
    }
}


/* =========================================================
   INTERFACE
========================================================= */

function atualizarInterface() {

    if (!clube) {
        return;
    }


    document
        .getElementById(
            "nomeClubeHeader"
        )
        .textContent =
        clube.nome;


    document
        .getElementById(
            "dinheiroHeader"
        )
        .textContent =
        formatarDinheiro(
            clube.dinheiro
        );


    document
        .getElementById(
            "tituloClube"
        )
        .textContent =
        clube.nome;


    document
        .getElementById(
            "infoPais"
        )
        .textContent =
        clube.pais;


    document
        .getElementById(
            "infoDinheiro"
        )
        .textContent =
        formatarDinheiro(
            clube.dinheiro
        );


    document
        .getElementById(
            "infoTemporada"
        )
        .textContent =
        clube.historico.length + 1;


    document
        .getElementById(
            "infoOverall"
        )
        .textContent =
        calcularOverallInterface();


    document
        .getElementById(
            "cabecalhoClube"
        )
        .classList.remove(
            "oculto"
        );
}


function calcularOverallInterface() {

    const titulares =
        clube.jogadores.filter(
            jogador =>
                jogador.titular
        );


    if (
        titulares.length !== 11
    ) {

        return 0;
    }


    return calcularOverallTime(
        clube.jogadores
    );
}


/* =========================================================
   ELENCO
========================================================= */

document
    .getElementById(
        "btnElenco"
    )
    .addEventListener(
        "click",
        () => {

            voltandoDaTemporada =
                false;


            mostrarElenco();


            mostrarTela(
                "telaElenco"
            );
        }
    );


document
    .getElementById(
        "btnVoltarElenco"
    )
    .addEventListener(
        "click",
        voltarDoElenco
    );


function voltarDoElenco() {

    if (
        temporadaAtual &&
        voltandoDaTemporada
    ) {

        voltandoDaTemporada =
            false;


        atualizarInterface();


        mostrarTela(
            "telaTemporada"
        );


        mostrarPartida();


        return;
    }


    atualizarInterface();


    mostrarTela(
        "telaPrincipal"
    );
}


/* =========================================================
   MOSTRAR ELENCO
========================================================= */

function mostrarElenco() {

    const lista =
        document.getElementById(
            "listaElenco"
        );


    lista.innerHTML = "";


    clube.jogadores.forEach(
        jogador => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "jogador";


            div.innerHTML = `

                <div class="jogador-info">

                    <span class="jogador-nome">
                        ${jogador.nome}
                    </span>

                    <span class="jogador-detalhes">
                        ${jogador.posicao}
                        |
                        ${jogador.idade} anos
                        |
                        ${jogador.pais}
                    </span>

                    <span>
                        Overall:
                        <strong>
                            ${jogador.overall}
                        </strong>
                    </span>

                    <span>
                        Desempenho:
                        <strong>
                            ${jogador.desempenho}
                        </strong>
                    </span>

                    <span class="valor">
                        Valor:
                        ${formatarDinheiro(
                            jogador.valor
                        )}
                    </span>

                    <span>
                        ${
                            jogador.titular
                                ? "🟢 Titular"
                                : "⚪ Reserva"
                        }
                    </span>

                </div>

                <button>
                    ${
                        jogador.titular
                            ? "Retirar"
                            : "Titular"
                    }
                </button>
            `;


            div
                .querySelector(
                    "button"
                )
                .addEventListener(
                    "click",
                    () =>
                        alternarTitular(
                            jogador
                        )
                );


            lista.appendChild(
                div
            );
        }
    );


    mostrarEscalacao();
}


/* =========================================================
   ALTERNAR TITULAR
========================================================= */

function alternarTitular(
    jogador
) {

    if (
        jogador.titular
    ) {

        jogador.titular =
            false;


        mostrarElenco();


        atualizarInterface();


        salvarJogo();


        return;
    }


    const limites = {

        Goleiro: 1,

        Zagueiro: 2,

        Lateral: 2,

        Meia: 3,

        Atacante: 3
    };


    const quantidade =
        clube.jogadores.filter(
            outro =>
                outro.titular &&
                outro.posicao ===
                jogador.posicao
        ).length;


    if (
        quantidade >=
        limites[jogador.posicao]
    ) {

        alert(
            `Já existem ${limites[jogador.posicao]} jogadores titulares nessa posição.`
        );

        return;
    }


    const total =
        clube.jogadores.filter(
            outro =>
                outro.titular
        ).length;


    if (
        total >= 11
    ) {

        alert(
            "Você já possui 11 titulares."
        );

        return;
    }


    jogador.titular =
        true;


    mostrarElenco();


    atualizarInterface();


    salvarJogo();
}


/* =========================================================
   ESCALAÇÃO
========================================================= */

function mostrarEscalacao() {

    const container =
        document.getElementById(
            "escalacao"
        );


    container.innerHTML = "";


    const posicoes = [

        "Goleiro",

        "Zagueiro",

        "Lateral",

        "Meia",

        "Atacante"

    ];


    for (
        const posicao
        of posicoes
    ) {

        const jogadores =
            clube.jogadores.filter(
                jogador =>
                    jogador.titular &&
                    jogador.posicao ===
                    posicao
            );


        jogadores.forEach(
            jogador => {

                const div =
                    document.createElement(
                        "div"
                    );


                div.className =
                    "slot";


                div.innerHTML = `

                    <strong>
                        ${posicao}
                    </strong>

                    <br>

                    ${jogador.nome}

                    <br>

                    Overall:
                    ${jogador.overall}

                    <br>

                    Desempenho:
                    ${jogador.desempenho}
                `;


                container.appendChild(
                    div
                );
            }
        );
    }
}


/* =========================================================
   MERCADO
========================================================= */

document
    .getElementById(
        "btnMercado"
    )
    .addEventListener(
        "click",
        () => {

            mostrarMercado();


            mostrarTela(
                "telaMercado"
            );
        }
    );


document
    .getElementById(
        "btnVoltarMercado"
    )
    .addEventListener(
        "click",
        () => {

            atualizarInterface();


            mostrarTela(
                "telaPrincipal"
            );
        }
    );


function mostrarMercado() {

    const lista =
        document.getElementById(
            "listaMercado"
        );


    lista.innerHTML = "";


    if (
        clube.mercado.length === 0
    ) {

        lista.innerHTML =
            "<p>O mercado ainda não foi gerado.</p>";

    }

    else {

        clube.mercado.forEach(
            jogador => {

                const div =
                    document.createElement(
                        "div"
                    );


                div.className =
                    "jogador";


                div.innerHTML = `

                    <div class="jogador-info">

                        <span class="jogador-nome">
                            ${jogador.nome}
                        </span>

                        <span class="jogador-detalhes">
                            ${jogador.posicao}
                            |
                            ${jogador.idade} anos
                            |
                            ${jogador.pais}
                        </span>

                        <strong>
                            Overall:
                            ${jogador.overall}
                        </strong>

                        <span class="valor">
                            ${formatarDinheiro(
                                jogador.valor
                            )}
                        </span>

                    </div>

                    <button>
                        Comprar
                    </button>
                `;


                div
                    .querySelector(
                        "button"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            const resultado =
                                comprarJogador(
                                    clube,
                                    jogador
                                );


                            alert(
                                resultado.mensagem
                            );


                            if (
                                resultado.sucesso
                            ) {

                                clube.mercado =
                                    clube.mercado.filter(
                                        outro =>
                                            outro.id !==
                                            jogador.id
                                    );


                                mostrarMercado();


                                atualizarInterface();


                                salvarJogo();
                            }
                        }
                    );


                lista.appendChild(
                    div
                );
            }
        );
    }


    mostrarVenda();
}


/* =========================================================
   VENDA
========================================================= */

function mostrarVenda() {

    const lista =
        document.getElementById(
            "listaVenda"
        );


    lista.innerHTML = "";


    clube.jogadores.forEach(
        jogador => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "jogador";


            div.innerHTML = `

                <div class="jogador-info">

                    <span class="jogador-nome">
                        ${jogador.nome}
                    </span>

                    <span class="jogador-detalhes">
                        ${jogador.posicao}
                        |
                        Overall ${jogador.overall}
                    </span>

                    <span class="valor">
                        ${formatarDinheiro(
                            jogador.valor
                        )}
                    </span>

                </div>

                <button>
                    Vender
                </button>
            `;


            div
                .querySelector(
                    "button"
                )
                .addEventListener(
                    "click",
                    () => {

                        const resultado =
                            venderJogador(
                                clube,
                                jogador.id
                            );


                        alert(
                            resultado.mensagem
                        );


                        if (
                            resultado.sucesso
                        ) {

                            mostrarMercado();


                            atualizarInterface();


                            salvarJogo();
                        }
                    }
                );


            lista.appendChild(
                div
            );
        }
    );
}


/* =========================================================
   INICIAR TEMPORADA
========================================================= */

document
    .getElementById(
        "btnIniciarTemporada"
    )
    .addEventListener(
        "click",
        iniciarTemporada
    );


function iniciarTemporada() {

    if (
        !escalaçãoValida()
    ) {

        alert(
            "A escalação precisa ter 1 goleiro, 2 zagueiros, 2 laterais, 3 meias e 3 atacantes."
        );


        mostrarElenco();


        mostrarTela(
            "telaElenco"
        );


        return;
    }


    temporadaAtual =
        criarTemporada(
            clube
        );


    prepararCampeonato(
        temporadaAtual,
        clube
    );


    prepararProximaPartida(
        clube,
        temporadaAtual
    );


    salvarJogo();


    mostrarTela(
        "telaTemporada"
    );


    mostrarPartida();
}


/* =========================================================
   VALIDAR ESCALAÇÃO
========================================================= */

function escalaçãoValida() {

    const titulares =
        clube.jogadores.filter(
            jogador =>
                jogador.titular
        );


    if (
        titulares.length !== 11
    ) {

        return false;
    }


    const limites = {

        Goleiro: 1,

        Zagueiro: 2,

        Lateral: 2,

        Meia: 3,

        Atacante: 3
    };


    for (
        const posicao
        in limites
    ) {

        const quantidade =
            titulares.filter(
                jogador =>
                    jogador.posicao ===
                    posicao
            ).length;


        if (
            quantidade !==
            limites[posicao]
        ) {

            return false;
        }
    }


    return true;
}


/* =========================================================
   MOSTRAR PARTIDA
========================================================= */

function mostrarPartida() {

    const partida =
        temporadaAtual?.partidaAtual;


    if (!partida) {

        avancarEtapa();

        return;
    }


    document
        .getElementById(
            "tituloCompeticao"
        )
        .textContent =
        partida.competicao;


    document
        .getElementById(
            "informacoesPartida"
        )
        .innerHTML = `

            <div class="partida-card">

                <h3>
                    ${clube.nome}
                    ×
                    ${partida.adversario.nome}
                </h3>

                <p>
                    Seu overall:

                    <strong>
                        ${calcularOverallTime(
                            clube.jogadores
                        )}
                    </strong>
                </p>

                <p>
                    Adversário:

                    <strong>
                        ${partida.overallAdversario}
                    </strong>
                </p>

                <p>
                    Partida:
                    ${obterNumeroPartida()}
                </p>

            </div>
        `;


    document
        .getElementById(
            "resultadoPartida"
        )
        .innerHTML = "";


    document
        .getElementById(
            "btnJogarPartida"
        )
        .classList.remove(
            "oculto"
        );


    document
        .getElementById(
            "btnContinuarTemporada"
        )
        .classList.add(
            "oculto"
        );


    criarBotaoAlterarEscalacao();
}


/* =========================================================
   NÚMERO DA PARTIDA
========================================================= */

function obterNumeroPartida() {

    if (
        temporadaAtual.etapa ===
        "campeonato"
    ) {

        return (
            `${temporadaAtual.campeonato.rodada}/9`
        );
    }


    if (
        temporadaAtual.etapa ===
        "copa"
    ) {

        return (
            `${temporadaAtual.copa.jogo}/6`
        );
    }


    if (
        temporadaAtual.etapa ===
        "champions"
    ) {

        return (
            `${temporadaAtual.champions.jogo}/6`
        );
    }


    if (
        temporadaAtual.etapa ===
        "mundial"
    ) {

        return "Final";
    }


    return "";
}


/* =========================================================
   BOTÃO ALTERAR ESCALAÇÃO
========================================================= */

function criarBotaoAlterarEscalacao() {

    const informacoes =
        document.getElementById(
            "informacoesPartida"
        );


    const antigo =
        document.getElementById(
            "btnAlterarEscalacao"
        );


    if (antigo) {

        antigo.remove();
    }


    const botao =
        document.createElement(
            "button"
        );


    botao.id =
        "btnAlterarEscalacao";


    botao.textContent =
        "👥 Alterar escalação";


    botao.className =
        "btn-secundario";


    botao.addEventListener(
        "click",
        abrirEscalacaoDuranteTemporada
    );


    informacoes.appendChild(
        botao
    );
}


/* =========================================================
   ABRIR ESCALAÇÃO DURANTE TEMPORADA
========================================================= */

function abrirEscalacaoDuranteTemporada() {

    if (!temporadaAtual) {
        return;
    }


    voltandoDaTemporada =
        true;


    mostrarElenco();


    mostrarTela(
        "telaElenco"
    );
}


/* =========================================================
   JOGAR JOGO
========================================================= */

document
    .getElementById(
        "btnJogarPartida"
    )
    .addEventListener(
        "click",
        jogarJogo
    );


function jogarJogo() {

    if (
        !temporadaAtual ||
        !temporadaAtual.partidaAtual
    ) {

        return;
    }


    const resultado =
        jogarPartida(
            clube,
            temporadaAtual
        );


    const div =
        document.getElementById(
            "resultadoPartida"
        );


    if (
        resultado.venceu
    ) {

        div.innerHTML = `

            <div class="vitoria">

                🟢 VITÓRIA

                <br><br>

                ${resultado.golsJogador}
                ×
                ${resultado.golsAdversario}

            </div>
        `;

    }

    else {

        div.innerHTML = `

            <div class="derrota">

                🔴 DERROTA

                <br><br>

                ${resultado.golsJogador}
                ×
                ${resultado.golsAdversario}

            </div>
        `;
    }


    mostrarDesempenhoPosPartida();


    atualizarInterface();


    salvarJogo();


    document
        .getElementById(
            "btnJogarPartida"
        )
        .classList.add(
            "oculto"
        );


    document
        .getElementById(
            "btnContinuarTemporada"
        )
        .classList.remove(
            "oculto"
        );
}


/* =========================================================
   DESEMPENHO PÓS-PARTIDA
========================================================= */

function mostrarDesempenhoPosPartida() {

    const container =
        document.getElementById(
            "resultadoPartida"
        );


    const titulares =
        clube.jogadores
            .filter(
                jogador =>
                    jogador.titular
            )
            .sort(
                (a, b) =>
                    b.desempenho -
                    a.desempenho
            );


    const div =
        document.createElement(
            "div"
        );


    div.className =
        "desempenho-pos-jogo";


    div.innerHTML = `

        <h3>
            📊 Desempenho dos jogadores
        </h3>

        <div>

            ${titulares.map(
                jogador => `

                    <div class="linha-desempenho">

                        <span>
                            ${jogador.nome}
                        </span>

                        <strong>
                            ${jogador.desempenho}
                        </strong>

                    </div>
                `
            ).join("")}

        </div>
    `;


    container.appendChild(
        div
    );
}


/* =========================================================
   CONTINUAR
========================================================= */

document
    .getElementById(
        "btnContinuarTemporada"
    )
    .addEventListener(
        "click",
        continuarTemporada
    );


function continuarTemporada() {

    if (!temporadaAtual) {
        return;
    }


    atualizarEtapa(
        clube,
        temporadaAtual
    );


    if (
        temporadaAtual.etapa ===
        "fim"
    ) {

        terminarTemporada();

        return;
    }


    prepararProximaPartida(
        clube,
        temporadaAtual
    );


    if (
        temporadaAtual.etapa ===
        "fim"
    ) {

        terminarTemporada();

        return;
    }


    salvarJogo();


    mostrarPartida();
}


/* =========================================================
   AVANÇAR ETAPA
========================================================= */

function avancarEtapa() {

    if (!temporadaAtual) {
        return;
    }


    atualizarEtapa(
        clube,
        temporadaAtual
    );


    if (
        temporadaAtual.etapa ===
        "fim"
    ) {

        terminarTemporada();

        return;
    }


    prepararProximaPartida(
        clube,
        temporadaAtual
    );


    if (
        temporadaAtual.etapa ===
        "fim"
    ) {

        terminarTemporada();

        return;
    }


    salvarJogo();


    mostrarPartida();
}


/* =========================================================
   FINALIZAR TEMPORADA
========================================================= */

function terminarTemporada() {

    if (!temporadaAtual) {
        return;
    }


    const numero =
        temporadaAtual.numero;


    finalizarTemporada(
        clube,
        temporadaAtual
    );


    definirTitularesAutomaticamente();


    temporadaAtual =
        null;


    voltandoDaTemporada =
        false;


    atualizarInterface();


    salvarJogo();


    alert(
        `Temporada ${numero} encerrada!`
    );


    mostrarTela(
        "telaPrincipal"
    );
}


/* =========================================================
   HISTÓRICO
========================================================= */

document
    .getElementById(
        "btnHistorico"
    )
    .addEventListener(
        "click",
        () => {

            mostrarHistorico();


            mostrarTela(
                "telaHistorico"
            );
        }
    );


document
    .getElementById(
        "btnVoltarHistorico"
    )
    .addEventListener(
        "click",
        () => {

            mostrarTela(
                "telaPrincipal"
            );
        }
    );


function mostrarHistorico() {

    const titulos =
        document.getElementById(
            "titulosHistorico"
        );


    titulos.innerHTML = `

        <div class="info-grid">

            <div>

                <strong>
                    Campeonatos
                </strong>

                ${clube.titulos.nacional}

            </div>


            <div>

                <strong>
                    Copas
                </strong>

                ${clube.titulos.copa}

            </div>


            <div>

                <strong>
                    Champions
                </strong>

                ${clube.titulos.champions}

            </div>


            <div>

                <strong>
                    Mundiais
                </strong>

                ${clube.titulos.mundial}

            </div>

        </div>
    `;


    const lista =
        document.getElementById(
            "listaHistorico"
        );


    lista.innerHTML = "";


    if (
        clube.historico.length === 0
    ) {

        lista.innerHTML =
            "<p>Nenhuma temporada disputada.</p>";

        return;
    }


    [...clube.historico]
        .reverse()
        .forEach(
            temporada => {

                const div =
                    document.createElement(
                        "div"
                    );


                div.className =
                    "historico-card";


                div.innerHTML = `

                    <h3>
                        Temporada
                        ${temporada.temporada}
                    </h3>

                    <p>
                        Campeonato:
                        ${temporada.campeonato.posicao}º
                    </p>

                    <p>
                        Pontos:
                        ${temporada.campeonato.pontos}
                    </p>

                    <p>
                        Vitórias:
                        ${temporada.campeonato.vitorias}
                    </p>

                    <p>
                        Derrotas:
                        ${temporada.campeonato.derrotas}
                    </p>

                    <p>
                        Gols:
                        ${temporada.campeonato.golsPro}
                        -
                        ${temporada.campeonato.golsContra}
                    </p>

                    <p>
                        Copa:
                        ${
                            temporada.copa
                                ? "🏆 Campeão"
                                : "❌ Não campeão"
                        }
                    </p>

                    <p>
                        Champions:
                        ${
                            temporada.champions
                                ? "🏆 Campeão"
                                : "❌ Não campeão"
                        }
                    </p>

                    <p>
                        Mundial:
                        ${
                            temporada.mundial
                                ? "🏆 Campeão"
                                : "❌ Não campeão"
                        }
                    </p>
                `;


                lista.appendChild(
                    div
                );
            }
        );
}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

mostrarTela(
    "telaCriacao"
);


menuInicial.classList.remove(
    "oculto"
);


formularioCriacao.classList.add(
    "oculto"
);


atualizarMenuInicial();