"use strict";

/* =========================================================
   TAPE-RUPI — FASE 2 (NÍVEL MÉDIO) — 36 DESAFIOS

   FONTE: Lições de Gramática Nhandewa-Guarani vol. 1 e vol. 2
   (FUNAI / KAMURI / UNICAMP, 2016 e 2018)
   Cada entrada tem campo "source" indicando o volume e a página.

   Formato compatível com game.js:
   { type, kind, prompt, hint, target, choices, ... }
   ========================================================= */


/* =========================================================
   1. VOCABULÁRIO EXTRA — extraído das referências
   Palavras que NÃO estão em VOCABULARY (game.js) e aparecem
   nos glossários dos PDFs.
   ========================================================= */

const FASE2_EXTRA = {

    // ADVÉRBIOS — vol. 2, p. 10-12
    adv: [
        { word: "WEI",           meaning: "bem, bastante",       page: "vol.2 p.10" },
        { word: "ARIENTÉ",       meaning: "bastante",            page: "vol.2 p.10" },
        { word: "ETÉ",           meaning: "muito",               page: "vol.2 p.10" },
        { word: "MBARIÍ",        meaning: "pouco",               page: "vol.2 p.10" },
        { word: "MBENGWÉ",       meaning: "devagar",             page: "vol.2 p.11" },
        { word: "MBENGWE'I",     meaning: "lentamente",          page: "vol.2 p.11" },
        { word: "PETEREMÉ",      meaning: "rápido",              page: "vol.2 p.11" },
        { word: "WOÍ",           meaning: "rapidamente",         page: "vol.2 p.11" },
        { word: "PÁ",            meaning: "completamente, tudo", page: "vol.2 p.11" },
        { word: "TENGWÁ",        meaning: "certamente",          page: "vol.2 p.11" },
        { word: "RAMĨ",          meaning: "talvez",              page: "vol.2 p.11" },
        { word: "DJIWY",         meaning: "novamente",           page: "vol.2 p.11" },
        { word: "YMÃ",           meaning: "antigamente",         page: "vol.2 p.11" },
        { word: "KWEÉ",          meaning: "ontem",               page: "vol.2 p.11" },
        { word: "KO'AỸ",         meaning: "hoje",                page: "vol.2 p.11" },
        { word: "KO'ẼRO",        meaning: "amanhã",              page: "vol.2 p.11" },
        { word: "KO'Ẽ",          meaning: "cedo, manhã",         page: "vol.2 p.11" },
        { word: "RIRÉ",          meaning: "depois de",           page: "vol.2 p.11" },
        { word: "TERI",          meaning: "ainda",               page: "vol.2 p.11" },
        { word: "MOMBYRY",       meaning: "longe",               page: "vol.2 p.12" },
        { word: "DJAWÉ",         meaning: "perto",               page: "vol.2 p.12" },
        { word: "PY-PY",         meaning: "dentro",              page: "vol.2 p.12" },
        { word: "OKÁ-PY",        meaning: "fora",                page: "vol.2 p.12" },
        { word: "UPÉ-PY",        meaning: "ali, lá",             page: "vol.2 p.12" }
    ],

    // VERBOS — vol. 1, p. 39-40 e vol. 2, p. 29-31
    verb: [
        { word: "KARU",          meaning: "comer, alimentar-se", page: "vol.1 p.39" },
        { word: "KWAÁ",          meaning: "saber",               page: "vol.1 p.39" },
        { word: "MA'Ẽ",          meaning: "olhar, cuidar",       page: "vol.1 p.40" },
        { word: "NUPÃ",          meaning: "bater",               page: "vol.1 p.40" },
        { word: "JAE'O",         meaning: "chorar",              page: "vol.1 p.41" },
        { word: "MOENDY",        meaning: "acender",             page: "vol.1 p.41" },
        { word: "MANDU'A",       meaning: "lembrar",             page: "vol.1 p.42" },
        { word: "GWATÁ",         meaning: "andar",               page: "vol.1 p.39" },
        { word: "DJAPÓ",         meaning: "fazer",               page: "vol.1 p.47" },
        { word: "MBO'E",         meaning: "ensinar",             page: "vol.1 p.47" },
        { word: "DJOGWÁ",        meaning: "comprar",             page: "vol.1 p.47" },
        { word: "IKÓ",           meaning: "estar, ficar",        page: "vol.1 p.47" },
        { word: "DJATY",         meaning: "plantar",             page: "vol.1 p.47" },
        { word: "ISU'U",         meaning: "morder",              page: "vol.1 p.44" },
        { word: "ETXÁ",          meaning: "ver",                 page: "vol.1 p.44" }
    ],

    // GEOGRAFIA — vol. 2, p. 55
    geo: [
        { word: "PARANÁ",        meaning: "rio",                 page: "vol.2 p.55" },
        { word: "PARAGWATSU",    meaning: "mar, oceano",         page: "vol.2 p.55" },
        { word: "YY KWÁ",        meaning: "lago",                page: "vol.2 p.55" },
        { word: "YY AKÃ",        meaning: "cachoeira",           page: "vol.2 p.55" },
        { word: "YBYTY",         meaning: "serra",               page: "vol.2 p.55" },
        { word: "KA'AGWY",       meaning: "mata, floresta",      page: "vol.2 p.55" },
        { word: "TAPÉ",          meaning: "estrada, caminho",    page: "vol.2 p.55" },
        { word: "OKÁ RUTSU",     meaning: "campo",               page: "vol.2 p.55" }
    ],

    // SAUDAÇÕES / FRASES — vol. 2, p. 7
    greeting: [
        { word: "ARY PORÃ",       meaning: "bom dia",            page: "vol.2 p.7" },
        { word: "KA'ARU PORÃ",    meaning: "boa tarde",          page: "vol.2 p.7" },
        { word: "PYNTŨ PORÃ",     meaning: "boa noite",          page: "vol.2 p.7" },
        { word: "ADJIWYMA",       meaning: "tchau",              page: "vol.2 p.7" },
        { word: "NDERA'EWÉ",      meaning: "tudo bem?",          page: "vol.2 p.7" },
        { word: "PEMAẼ PORÃ",     meaning: "bem-vindos",         page: "vol.2 p.7" }
    ],

    // FENÔMENOS E NATUREZA — vol. 2 e vol. 1
    nature: [
        { word: "KWARAY",         meaning: "sol",                page: "vol.1 p.17" },
        { word: "JASY",           meaning: "lua",                page: "vol.2 p.35" },
        { word: "TATÁ",           meaning: "fogo",               page: "vol.1 p.17" },
        { word: "YY",             meaning: "água",               page: "vol.1 p.17" },
        { word: "YBY",            meaning: "terra, chão",        page: "vol.1 p.17" },
        { word: "OKY",            meaning: "chuva",              page: "vol.1 p.20" },
        { word: "YWYRÁ",          meaning: "árvore",             page: "vol.1 p.28" },
        { word: "YYWYRU",         meaning: "vento",              page: "vol.2 p.61" }
    ]
};


/* =========================================================
   2. PERGUNTAS DE VOCABULÁRIO (formato igual ao game.js)
   ========================================================= */

function perguntasVocabulario() {

    const qs = [];

    // OBJETOS
    ["KARÓ", "DJAPEPÓ", "KUTXÁ", "IRYMPẼ", "TIPITI"].forEach(w => {

        const item = VOCABULARY.find(v => v.word === w);
        if (!item) return;

        const grupo = VOCABULARY.filter(v => v.category === "OBJETOS");
        const opts = pickThree(item, grupo);

        qs.push({
            type: "word", kind: "OBJETOS",
            prompt: "Como se diz isto na língua Nhandewa?",
            hint: "Observe a imagem. Qual é a palavra correta?",
            target: item.word,
            choices: opts.map(x => x.word)
        });
    });

    // ALIMENTOS
    ["AWATI", "MANDI'O", "PAKOWÁ", "TSANDIÁ", "AKADJU"].forEach(w => {

        const item = VOCABULARY.find(v => v.word === w);
        if (!item) return;

        const grupo = VOCABULARY.filter(v => v.category === "ALIMENTOS");
        const opts = pickThree(item, grupo);

        qs.push({
            type: "word", kind: "ALIMENTOS",
            prompt: "Como se diz isto em Nhandewa?",
            hint: "Cada alimento tem um nome na língua.",
            target: item.word,
            choices: opts.map(x => x.word)
        });
    });

    // ANIMAIS (perguntas invertidas — nível médio)
    ["KATXURU", "KA'I", "DJAKARÉ", "MBOÍ", "MBIKU_DO_PDF"].forEach(animal => {

        if (animal === "MBIKU_DO_PDF") {
            // palavra nova do glossário da referência
            const opts = shuffle([
                "MBIKU", "KATXURU", "DJAKARÉ", "KAPI'I'UWÁ"
            ]);

            qs.push({
                type: "word-new", kind: "ANIMAIS",
                prompt: "Como se diz 'gambá' em Nhandewa?",
                hint: "Palavra do glossário de animais (vol. 2, p. 57).",
                target: "MBIKU",
                choices: opts
            });
            return;
        }

        const item = VOCABULARY.find(v => v.word === animal);
        if (!item) return;

        const grupo = VOCABULARY.filter(v => v.category === "ANIMAIS");
        const opts = pickThree(item, grupo);

        qs.push({
            type: "word", kind: "ANIMAIS",
            prompt: "Como se diz isto na língua Nhandewa?",
            hint: "Observe o animal e escolha o nome verdadeiro.",
            target: item.word,
            choices: opts.map(x => x.word)
        });
    });

    // CORPO
    ["AKÃ", "RETSÁ", "PÓ", "PY", "NHE'Ẽ_DO_PDF"].forEach(item => {

        if (item === "NHE'Ẽ_DO_PDF") {
            const opts = shuffle(["NAMBI", "APYTSÃ-KWÁ", "APYTÉ", "DJURU"]);

            qs.push({
                type: "word-new", kind: "CORPO",
                prompt: "Como se diz 'ouvido' em Nhandewa?",
                hint: "É a parte que escuta (vol. 2, p. 41).",
                target: "APYTSÃ-KWÁ",
                choices: opts
            });
            return;
        }

        const v = VOCABULARY.find(x => x.word === item);
        if (!v) return;

        const grupo = VOCABULARY.filter(x => x.category === "CORPO");
        const opts = pickThree(v, grupo);

        qs.push({
            type: "word", kind: "CORPO",
            prompt: "Como se diz isto na língua Nhandewa?",
            hint: "Parte do corpo humano (vol. 2, p. 41).",
            target: v.word,
            choices: opts.map(x => x.word)
        });
    });

    // PARENTESCO
    ["TXETSY", "TXERU", "TXERAMÕI_NOVO", "TXETXAÍ_NOVO", "TXETUTY"].forEach(item => {

        if (item === "TXERAMÕI_NOVO") {
            const opts = shuffle(["TXERAMÕI", "TXETXAÍ", "TXETSY", "TXETUTY"]);
            qs.push({
                type: "word-new", kind: "PARENTESCO",
                prompt: "Como se diz 'meu avô' em Nhandewa?",
                hint: "Palavra do vocabulário de parentesco (vol. 2, p. 37).",
                target: "TXERAMÕI", choices: opts
            });
            return;
        }

        if (item === "TXETXAÍ_NOVO") {
            const opts = shuffle(["TXETXAÍ", "TXEDJARYI", "TXETSY", "TXEKYPY'Y"]);
            qs.push({
                type: "word-new", kind: "PARENTESCO",
                prompt: "Como se diz 'minha avó' em Nhandewa?",
                hint: "Diferente de txedjaryi, que é qualquer mulher mais velha (vol. 2, p. 37).",
                target: "TXETXAÍ", choices: opts
            });
            return;
        }

        const v = VOCABULARY.find(x => x.word === item);
        if (!v) return;

        const grupo = VOCABULARY.filter(x => x.category === "PARENTESCO");
        const opts = pickThree(v, grupo);

        qs.push({
            type: "word", kind: "PARENTESCO",
            prompt: "Como se diz isto em Nhandewa?",
            hint: "Termo de parentesco (vol. 2, p. 35-37).",
            target: v.word,
            choices: opts.map(x => x.word)
        });
    });

    return qs;
}


/* =========================================================
   3. PERGUNTAS DE ADVÉRBIOS E VERBOS
   ========================================================= */

function perguntasGramatica() {

    const qs = [];

    // ADVÉRBIOS DE TEMPO
    [["KWEÉ","ontem"],["KO'AỸ","hoje"],["KO'ẼRO","amanhã"],["YMÃ","antigamente"]].forEach(([w, m]) => {

        const outros = shuffle(FASE2_EXTRA.adv.filter(a => a.word !== w)).slice(0, 2);
        const opts = shuffle([{ word: w }, ...outros]).map(a => a.word);

        qs.push({
            type: "word-new", kind: "ADVÉRBIOS",
            prompt: `Como se diz '${m}' em Nhandewa?`,
            hint: "Advérbio de tempo (vol. 2, p. 11).",
            target: w, choices: opts
        });
    });

    // ADVÉRBIOS DE LUGAR
    [["MOMBYRY","longe"],["DJAWÉ","perto"],["PY-PY","dentro"],["OKÁ-PY","fora"]].forEach(([w, m]) => {

        const outros = shuffle(FASE2_EXTRA.adv.filter(a => a.word !== w)).slice(0, 2);
        const opts = shuffle([{ word: w }, ...outros]).map(a => a.word);

        qs.push({
            type: "word-new", kind: "ADVÉRBIOS",
            prompt: `Como se diz '${m}' em Nhandewa?`,
            hint: "Advérbio de lugar (vol. 2, p. 12).",
            target: w, choices: opts
        });
    });

    // ADVÉRBIOS DE MODO
    [["MBENGWÉ","devagar"],["WOÍ","rapidamente"],["ETÉ","muito"],["DJIWY","novamente"]].forEach(([w, m]) => {

        const outros = shuffle(FASE2_EXTRA.adv.filter(a => a.word !== w)).slice(0, 2);
        const opts = shuffle([{ word: w }, ...outros]).map(a => a.word);

        qs.push({
            type: "word-new", kind: "ADVÉRBIOS",
            prompt: `Como se diz '${m}' em Nhandewa?`,
            hint: "Advérbio de modo (vol. 2, p. 11).",
            target: w, choices: opts
        });
    });

    // VERBOS
    [["KARU","comer"],["GWATÁ","andar"],["DJAPÓ","fazer"],["KWAÁ","saber"]].forEach(([w, m]) => {

        const outros = shuffle(FASE2_EXTRA.verb.filter(v => v.word !== w)).slice(0, 2);
        const opts = shuffle([{ word: w }, ...outros]).map(v => v.word);

        qs.push({
            type: "word-new", kind: "VERBOS",
            prompt: `Como se diz '${m}' em Nhandewa?`,
            hint: "Verbo da 1ª conjugação (vol. 1, p. 39).",
            target: w, choices: opts
        });
    });

    return qs;
}


/* =========================================================
   4. PERGUNTAS DE GEOGRAFIA, NATUREZA E SAUDAÇÕES
   ========================================================= */

function perguntasTemáticas() {

    const qs = [];

    // GEOGRAFIA
    [["PARANÁ","rio"],["YY AKÃ","cachoeira"],["KA'AGWY","mata"],["TAPÉ","estrada"]].forEach(([w, m]) => {

        const outros = shuffle(FASE2_EXTRA.geo.filter(g => g.word !== w)).slice(0, 2);
        const opts = shuffle([{ word: w }, ...outros]).map(g => g.word);

        qs.push({
            type: "word-new", kind: "GEOGRAFIA",
            prompt: `Como se diz '${m}' em Nhandewa?`,
            hint: "Vocabulário geográfico (vol. 2, p. 55).",
            target: w, choices: opts
        });
    });

    // NATUREZA
    [["KWARAY","sol"],["YY","água"],["TATÁ","fogo"],["OKY","chuva"],["JASY","lua"]].forEach(([w, m]) => {

        const outros = shuffle(FASE2_EXTRA.nature.filter(n => n.word !== w)).slice(0, 2);
        const opts = shuffle([{ word: w }, ...outros]).map(n => n.word);

        qs.push({
            type: "word-new", kind: "NATUREZA",
            prompt: `Como se diz '${m}' em Nhandewa?`,
            hint: "Elemento da natureza (vol. 1 e vol. 2).",
            target: w, choices: opts
        });
    });

    // SAUDAÇÕES
    [["ARY PORÃ","bom dia"],["KA'ARU PORÃ","boa tarde"],["PYNTŨ PORÃ","boa noite"],["ADJIWYMA","tchau"]].forEach(([w, m]) => {

        const outros = shuffle(FASE2_EXTRA.greeting.filter(g => g.word !== w)).slice(0, 2);
        const opts = shuffle([{ word: w }, ...outros]).map(g => g.word);

        qs.push({
            type: "word-new", kind: "SAUDAÇÕES",
            prompt: `Como se diz '${m}' em Nhandewa?`,
            hint: "Frase do cotidiano (vol. 2, p. 7).",
            target: w, choices: opts
        });
    });

    return qs;
}


/* =========================================================
   5. CONTAGEM E NÚMEROS — NÍVEL MÉDIO (5 a 7)
   ========================================================= */

function perguntasNumeros() {

    const qs = [];

    [4, 5, 6, 7].forEach(n => {

        const item = NUMBER_VOCABULARY.find(x => x.value === n);
        if (!item) return;

        const vizinhos = shuffle(
            NUMBER_VOCABULARY.filter(x => x.value !== n)
        ).slice(0, 3);

        const opts = shuffle([item, ...vizinhos]).map(x => x.value);

        qs.push({
            type: "number", kind: "NÚMEROS",
            prompt: "Que número é este em Nhandewa?",
            hint: "Leia o algarismo e escolha a palavra correta.",
            target: n, choices: opts
        });
    });

    // contagem visual — 5 imagens de animais (mais desafiador)
    const animalSet = VOCABULARY.filter(
        v => v.category === "ANIMAIS" && v.file
    );

    [5, 6, 7].forEach(n => {

        const vizinhos = shuffle(
            NUMBER_VOCABULARY.filter(x => Math.abs(x.value - n) <= 2 && x.value !== n)
        ).slice(0, 2);

        const centro = NUMBER_VOCABULARY.find(x => x.value === n);
        const opts = shuffle([centro, ...vizinhos]).map(x => x.value);

        qs.push({
            type: "count", kind: "CONTE E DESCUBRA",
            prompt: "Quantos animais aparecem?",
            hint: "Conte com calma e escolha o número Nhandewa.",
            target: n, countItem: animalSet[Math.floor(Math.random() * animalSet.length)],
            choices: opts
        });
    });

    return qs;
}


/* =========================================================
   6. MONTAGEM DA FASE 2
   ========================================================= */

function buildFase2() {

    const todas = [
        ...perguntasVocabulario(),
        ...perguntasGramatica(),
        ...perguntasTemáticas(),
        ...perguntasNumeros()
    ];

    // garante exatamente 36: acrescenta se sobrar, remove se faltar
    if (todas.length > 36) {
        return shuffle(todas).slice(0, 36);
    }

    // fallback: repete itens com escolhas diferentes
    while (todas.length < 36) {
        const base = todas[Math.floor(Math.random() * todas.length)];
        todas.push({ ...base, choices: shuffle([...base.choices]) });
    }

    return shuffle(todas);
}


/* =========================================================
   7. API PÚBLICA
   ========================================================= */

window.FASE2 = {
    buildQuestions: buildFase2,
    total: 36,
    nivel: "médio",
    fonte: "Lições de Gramática Nhandewa-Guarani vol. 1 (2016) e vol. 2 (2018)",
    vocabularioExtra: FASE2_EXTRA
};
