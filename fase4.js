"use strict";

/* =========================================================
   TAPE-RUPI — FASE 4 (NÍVEL AVANÇADO)
   36 desafios. Foco: posposições em contexto de frase.

   Progressão:
   - fase 3 = conjugar verbo e identificar posposição isolada
   - fase 4 = ler frase completa e escolher a posposição que
     marca tempo, espaço, lugar ou localização

   Fontes:
   - vol. 1, Lição 8 (Posposições, p. 50)
   - vol. 2, Lição 2 (Posposições, p. 22-24)
   - vol. 2, Lição 1 (Advérbios de tempo e lugar, p. 9-12)
   - vol. 2, Lição 2 (Pontos Cardeais, p. 16-19)
   ========================================================= */

function shuffle(a) {
    return [...a].sort(() => Math.random() - 0.5);
}

function escolher3(lista, correta) {
    const outros = shuffle(lista.filter(x => x !== correta)).slice(0, 3);
    return shuffle([correta, ...outros]);
}


/* =========================================================
   1. POSPOSIÇÕES DE TEMPO
   Advérbios de tempo: vol. 2, p. 11
   ========================================================= */

const POSP_TEMPO = [
    {
        frase: "Txeru oú ___.",
        traducao: "Meu pai veio ontem.",
        resposta: "kweé",
        distratores: ["ko'aỹ", "ko'ẽro", "ymã"],
        fonte: "vol. 2, p. 11",
        tipo: "tempo passado"
    },
    {
        frase: "Aá ___ txekoy-py.",
        traducao: "Eu vou hoje para a minha roça.",
        resposta: "ko'aỹ",
        distratores: ["kweé", "ko'ẽro", "ymã"],
        fonte: "vol. 2, p. 11",
        tipo: "tempo presente"
    },
    {
        frase: "Aáta ___ Itariri-py.",
        traducao: "Eu vou amanhã para Itariri.",
        resposta: "ko'ẽro",
        distratores: ["kweé", "ko'aỹ", "ymã"],
        fonte: "vol. 2, p. 11",
        tipo: "tempo futuro"
    },
    {
        frase: "___ nhandere'yi odjaty wa'ekwé awati.",
        traducao: "Antigamente nossos antepassados plantavam milho.",
        resposta: "ymã-py",
        distratores: ["kweé", "ko'aỹ", "ko'ẽro"],
        fonte: "vol. 2, p. 34 e p. 11",
        tipo: "tempo remoto"
    },
    {
        frase: "Ogwatá ___.",
        traducao: "Ele anda devagar.",
        resposta: "mbengwe'i",
        distratores: ["peteremé", "woí", "podjawá"],
        fonte: "vol. 2, p. 11",
        tipo: "modo"
    },
    {
        frase: "Redju ___!",
        traducao: "Venha logo! (rapidamente)",
        resposta: "woí",
        distratores: ["mbengwé", "peteremé", "pá"],
        fonte: "vol. 2, p. 7 e p. 11",
        tipo: "modo"
    }
];


/* =========================================================
   2. POSPOSIÇÕES DE ESPAÇO E LUGAR
   Vol. 1, p. 50 e vol. 2, p. 22-24
   ========================================================= */

const POSP_ESPACO = [
    {
        frase: "Txera'y Piaçaguera___ oikó.",
        traducao: "Meu filho mora em Piaçaguera.",
        resposta: "-py",
        distratores: ["-gwi", "-rupi", "-arõ"],
        fonte: "vol. 1, p. 50, exemplo a.1",
        tipo: "lugar (em)"
    },
    {
        frase: "Txerendá opytá Pakovaty___.",
        traducao: "Minha casa fica em Bananal.",
        resposta: "-py",
        distratores: ["-gwi", "-rupi", "-mbyté-py"],
        fonte: "vol. 2, p. 23",
        tipo: "lugar (em)"
    },
    {
        frase: "Kweé txetsy oú Miracatu___.",
        traducao: "Ontem minha mãe veio de Miracatu.",
        resposta: "-gwi",
        distratores: ["-py", "-rupi", "-arõ"],
        fonte: "vol. 2, p. 23",
        tipo: "procedência (de)"
    },
    {
        frase: "Ndekytsé oĩ angu'a___.",
        traducao: "Tua faca está sobre o pote.",
        resposta: "-arõ",
        distratores: ["-py", "-gwypy", "-mbyté-py"],
        fonte: "vol. 1, p. 50, exemplo a.3",
        tipo: "posição superior (sobre)"
    },
    {
        frase: "Mitãgwé onhimangá ywyrá___.",
        traducao: "As crianças brincam debaixo da árvore.",
        resposta: "-gwypy",
        distratores: ["-arõ", "-py", "-mbyté-py"],
        fonte: "vol. 1, p. 50, exemplo a.4",
        tipo: "posição inferior (debaixo)"
    },
    {
        frase: "Tuwitxá oikó nhandetekoá___.",
        traducao: "O chefe está no meio da nossa aldeia.",
        resposta: "-mbyté-py",
        distratores: ["-py", "-gwypy", "-arõ"],
        fonte: "vol. 1, p. 50, exemplo a.5",
        tipo: "posição intermediária (entre)"
    },
    {
        frase: "Tape___ ogwatá.",
        traducao: "Ele anda pela estrada.",
        resposta: "-rupi",
        distratores: ["-py", "-arõ", "-gwypy"],
        fonte: "vol. 1, p. 50, exemplo a.2",
        tipo: "percurso (por)"
    },
    {
        frase: "Oré roikoá upé___.",
        traducao: "Nós moramos ali (campo de visão).",
        resposta: "-py",
        distratores: ["-gwi", "-rupi", "-arõ"],
        fonte: "vol. 2, p. 13, exercício k",
        tipo: "lugar (ali)"
    },
    {
        frase: "Katxuro rendá oká___ oikó.",
        traducao: "O lugar do cachorro é lá fora.",
        resposta: "-py",
        distratores: ["-gwi", "-rupi", "-gwypy"],
        fonte: "vol. 2, p. 13, exercício n",
        tipo: "lugar (fora)"
    },
    {
        frase: "Txiwi ywyrá ywaté___ oikó.",
        traducao: "O gato está em cima da árvore.",
        resposta: "-py",
        distratores: ["-gwypy", "-arõ", "-gwi"],
        fonte: "vol. 2, p. 13, exercício l",
        tipo: "posição superior (em cima)"
    },
    {
        frase: "Orerendá oĩ yy rembé___.",
        traducao: "Nossa casa está à beira do rio.",
        resposta: "-re",
        distratores: ["-py", "-gwi", "-rupi"],
        fonte: "vol. 1, p. 34 e vol. 2, p. 22",
        tipo: "adjacência (à beira)"
    }
];


/* =========================================================
   3. PONTOS CARDEAIS E LOCALIZAÇÃO
   Vol. 2, p. 16-19
   ========================================================= */

const POSP_LOCALIZACAO = [
    {
        frase: "Kwaray onhemĩá ___.",
        traducao: "O sol se põe no Oeste (onde o sol se esconde).",
        resposta: "Nhandé Kupé-Regwá",
        distratores: ["Nhandé Rowai-Regwá", "Nhandé Yké-Regwá", "Nhandé Djodjá-Regwá"],
        fonte: "vol. 2, p. 16-17",
        tipo: "ponto cardeal"
    },
    {
        frase: "Nhandé ___ -py roipity awarĩ aryreí-re.",
        traducao: "Nós nos orientamos para o Leste (onde o sol nasce).",
        resposta: "Rowai-Regwá",
        distratores: ["Kupé-Regwá", "Yké-Regwá", "Djodjá-Regwá"],
        fonte: "vol. 2, p. 17",
        tipo: "ponto cardeal"
    },
    {
        frase: "Nhandé ___ -py ropytá roipity awarĩ ymã.",
        traducao: "Nós olhamos para o lado (referência lateral) para orientar.",
        resposta: "Yké-Regwá",
        distratores: ["Rowai-Regwá", "Kupé-Regwá", "Djodjá-Regwá"],
        fonte: "vol. 2, p. 17",
        tipo: "ponto cardeal"
    },
    {
        frase: "Kurutsu oĩ ywá___ pyntũ-re awií.",
        traducao: "A cruz está no céu ao entardecer também.",
        resposta: "-pe",
        distratores: ["-py", "-gwi", "-rupi"],
        fonte: "vol. 2, p. 16",
        tipo: "posição no céu"
    },
    {
        frase: "Oy Gwatsu-py awákwé tenondé___.",
        traducao: "Na Casa de Reza, os homens ficam na frente.",
        resposta: "-py",
        distratores: ["-gwi", "-rupi", "-arõ"],
        fonte: "vol. 2, p. 38",
        tipo: "posição dianteira"
    }
];


/* =========================================================
   4. POSPOSIÇÕES DE TEMPO EM CONTEXTO (frases do vol. 2)
   ========================================================= */

const POSP_TEMPO_CONTEXTO = [
    {
        frase: "Aá ___ txekoy-py awati akyry.",
        traducao: "Eu vou agora à minha roça colher milho.",
        resposta: "ko'ẽmbá",
        distratores: ["ko'ẽro", "kweé", "ymã"],
        fonte: "vol. 2, p. 9 (texto estudando)",
        tipo: "tempo imediato"
    },
    {
        frase: "___ awati oetsy agwé a'u mo'ã.",
        traducao: "Ontem o milho estava maduro para comer.",
        resposta: "Kweé",
        distratores: ["Ko'aỹ", "Ko'ẽro", "Ymã"],
        fonte: "vol. 2, p. 14 (texto Awatity)",
        tipo: "tempo passado"
    },
    {
        frase: "Ymã eté ___ djawé, kó nhandé pamé rekoapy...",
        traducao: "Há muito tempo atrás, em 1932, nosso modo de vida...",
        resposta: "1932",
        distratores: ["ko'ẽro", "kweé", "ko'aỹ"],
        fonte: "vol. 2, p. 9 (texto inicial)",
        tipo: "tempo remoto (data)"
    },
    {
        frase: "A'ẽri ma rodju ___ rogwatá.",
        traducao: "Depois de muito tempo, nós voltamos andando.",
        resposta: "mombyry",
        distratores: ["djawé", "mbarií", "pá"],
        fonte: "vol. 2, p. 35",
        tipo: "distância percorrida"
    }
];


/* =========================================================
   5. ADVÉRBIOS DE LUGAR EM CONTEXTO
   Frases reais do vol. 2, p. 13
   ========================================================= */

const ADV_LUGAR = [
    {
        frase: "Oré roikoá ___ -py.",
        traducao: "Nós moramos ali (no campo de visão).",
        resposta: "upé",
        distratores: ["apy", "mombyry", "djawé"],
        fonte: "vol. 2, p. 13",
        tipo: "lugar (ali)"
    },
    {
        frase: "Txeé ndaai ___-py.",
        traducao: "Eu não vou lá (fora do campo de visão).",
        resposta: "pe",
        distratores: ["apy", "upé", "djawé"],
        fonte: "vol. 2, p. 13",
        tipo: "lugar (lá)"
    },
    {
        frase: "Txere'yi namombyryi ___ oikoá.",
        traducao: "Meu filho não mora longe.",
        resposta: "mombyry",
        distratores: ["djawé", "py-py", "oká-py"],
        fonte: "vol. 2, p. 13",
        tipo: "lugar (longe)"
    },
    {
        frase: "Txiwi ywyrá ywaté-py oikó, ___-py.",
        traducao: "O gato está em cima da árvore, no alto.",
        resposta: "igwy-py",
        distratores: ["iwaté-py", "py-py", "oká-py"],
        fonte: "vol. 2, p. 12 e p. 13",
        tipo: "posição abaixo"
    }
];


/* =========================================================
   6. MONTAGEM — 36 EXATAS
   ========================================================= */

function gerarQuestao(item, kind, grupo) {

    const opts = escolher3([item.resposta, ...item.distratores], item.resposta);

    return {
        type: "word-new",
        kind: kind,
        prompt: "Complete: \"" + item.frase + "\"",
        hint: "Tradução: \"" + item.traducao + "\". Fonte: " + item.fonte + ".",
        target: item.resposta,
        choices: opts
    };
}

function garantir36(lista) {

    const vistas = new Set();
    const distintas = [];

    lista.forEach(q => {
        const chave = q.prompt + "|" + String(q.target);
        if (!vistas.has(chave)) {
            vistas.add(chave);
            distintas.push(q);
        }
    });

    if (distintas.length === 0) {
        throw new Error("Fase 4 não gerou nenhuma pergunta distinta.");
    }

    const finais = [];
    let cursor = 0;

    while (finais.length < 36) {
        const base = distintas[cursor % distintas.length];
        if (cursor < distintas.length) {
            finais.push(base);
        } else {
            finais.push({
                ...base,
                prompt: base.prompt + " (revisão)",
                choices: shuffle([...base.choices])
            });
        }
        cursor++;
    }

    return shuffle(finais).slice(0, 36);
}

function buildFase4() {

    const todas = [
        ...POSP_TEMPO.map(item => gerarQuestao(item, "POSPOSIÇÃO DE TEMPO", POSP_TEMPO)),
        ...POSP_ESPACO.map(item => gerarQuestao(item, "POSPOSIÇÃO DE ESPAÇO", POSP_ESPACO)),
        ...POSP_LOCALIZACAO.map(item => gerarQuestao(item, "PONTOS CARDEAIS", POSP_LOCALIZACAO)),
        ...POSP_TEMPO_CONTEXTO.map(item => gerarQuestao(item, "TEMPO EM CONTEXTO", POSP_TEMPO_CONTEXTO)),
        ...ADV_LUGAR.map(item => gerarQuestao(item, "ADVÉRBIO DE LUGAR", ADV_LUGAR))
    ];

    return garantir36(todas);
}


/* =========================================================
   7. API PÚBLICA
   ========================================================= */

if (typeof window !== "undefined") {
    window.FASE4 = {
        buildQuestions: buildFase4,
        total: 36,
        nivel: "avançado",
        fontes: [
            "Lições de Gramática Nhandewa-Guarani vol. 1 (2016), Lição 8",
            "Lições de Gramática Nhandewa/Tupi-Guarani vol. 2 (2018), Lições 1 e 2"
        ],
        tipos: [
            "POSPOSIÇÃO DE TEMPO",
            "POSPOSIÇÃO DE ESPAÇO",
            "PONTOS CARDEAIS",
            "TEMPO EM CONTEXTO",
            "ADVÉRBIO DE LUGAR"
        ]
    };

    try {
        const amostra = buildFase4();
        console.log("[fase4] carregada. buildQuestions retorna", amostra.length, "perguntas.");
        console.log("[fase4] tipos na amostra:",
            [...new Set(amostra.map(q => q.kind))].join(", "));
    } catch (e) {
        console.error("[fase4] erro ao carregar:", e);
    }
}
