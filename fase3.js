"use strict";

/* =========================================================
   TAPE-RUPI — FASE 3 (NÍVEL DIFÍCIL)
   36 desafios. Foco: gramática (conjugação, posposição,
   frase do cotidiano, verbo irregular).

   FONTES:
   - vol. 1, lições 6 (verbos), 8 (posposições)
   - vol. 2, lições 3 (verbos irregulares), 4 (parentesco),
     5 (corpo), datas
   NÃO repete o conteúdo da fase 2 (advérbios/significado).
   ========================================================= */

function shuffle(a) {
    return [...a].sort(() => Math.random() - 0.5);
}

/* ---------------------------------------------------------
   1. CONJUGAÇÃO 1ª CONJ. — VERBO REGULAR
   Do vol. 1, p. 25 e p. 39.
   --------------------------------------------------------- */

const CONJ_1A = [
    { verbo: "gwatá",  traducao: "andar",  paradigma: "oral" },
    { verbo: "ma'ẽ",   traducao: "olhar",  paradigma: "nasal" },
    { verbo: "karu",   traducao: "comer",  paradigma: "oral" },
    { verbo: "kwaá",   traducao: "saber",  paradigma: "oral" },
    { verbo: "nupã",   traducao: "bater",  paradigma: "nasal" }
];

const FORMAS_1A = {
    "gwatá": ["agwatá", "regwatá", "ogwatá", "djagwatá", "rogwatá", "pegwatá"],
    "ma'ẽ":  ["ama'ẽ",  "rema'ẽ",  "oma'ẽ",  "nhama'ẽ",  "roma'ẽ",  "pema'ẽ"],
    "karu":  ["akaru",  "rekaru",  "okaru",  "djakaru",  "rokaru",  "pekaru"],
    "kwaá":  ["aikwaá", "reikwaá", "oikwaá", "djaikwaá", "roikwaá", "peikwaá"],
    "nupã":  ["ainupã", "reinupã", "oinupã", "nhainupã", "roinupã", "peinupã"]
};

const PESSOAS = [
    "1ª pessoa do singular (eu)",
    "2ª pessoa do singular (você)",
    "3ª pessoa do singular (ele/ela)",
    "1ª pessoa do plural inclusivo (nós incl.)",
    "1ª pessoa do plural exclusivo (nós excl.)",
    "2ª pessoa do plural (vocês)"
];

function perguntasConjugacaoRegular() {

    const qs = [];

    CONJ_1A.forEach(({ verbo, traducao }) => {

        const formas = FORMAS_1A[verbo];
        if (!formas) return;

        // duas pessoas por verbo (1ª sg e 3ª sg)
        [0, 2].forEach(indice => {

            const certa = formas[indice];
            const tresOutras = shuffle(
                formas.filter((f, i) => i !== indice)
            ).slice(0, 3);

            qs.push({
                type: "word-new",
                kind: "CONJUGAÇÃO",
                prompt: "Qual é a forma de '" + traducao + "' (" + verbo + ") na " +
                        PESSOAS[indice] + "?",
                hint: "Verbo da 1ª conjugação. Fonte: vol. 1, p. 39.",
                target: certa,
                choices: shuffle([certa, ...tresOutras])
            });
        });
    });

    return qs;
}

/* ---------------------------------------------------------
   2. VERBOS IRREGULARES — vol. 2, p. 29-30
   --------------------------------------------------------- */

const IRREGULARES = {
    ir:     ["aá",   "reó",   "oó",    "djaá",   "roó",   "peó"],
    vir:    ["adju", "redju", "oú",    "djadju", "rodju", "pedju"],
    dizer:  ["a'e",  "ere",   "e'i",   "dja'e",  "ro'e",  "pedje"],
    ter:    ["arekó","rerekó","ogwerekó","djarekó","rogwerekó","perekó"],
    trazer: ["aru",  "reru",  "ogweru","djagweru","rogweru","pegweru"]
};

function perguntasConjugacaoIrregular() {

    const qs = [];

    Object.entries(IRREGULARES).forEach(([infinitivo, formas]) => {

        // 1ª pessoa e 3ª pessoa — as duas onde a irregularidade aparece
        [0, 2].forEach(indice => {

            const certa = formas[indice];
            const tresOutras = shuffle(
                Object.entries(IRREGULARES)
                    .filter(([inf]) => inf !== infinitivo)
                    .map(([, f]) => f[indice])
            ).slice(0, 3);

            qs.push({
                type: "word-new",
                kind: "VERBO IRREGULAR",
                prompt: "Qual é a forma de '" + infinitivo + "' em Nhandewa para " +
                        PESSOAS[indice] + "?",
                hint: "Verbo irregular. Fonte: vol. 2, p. 30.",
                target: certa,
                choices: shuffle([certa, ...tresOutras])
            });
        });
    });

    return qs;
}

/* ---------------------------------------------------------
   3. POSPOSIÇÕES — vol. 1, p. 50
   --------------------------------------------------------- */

const POSPOSICOES = [
    { posp: "-py",       significado: "em, para",           exemplo: "Txera'y Piaçaguera-py oikó." },
    { posp: "-rupi",     significado: "por, pelo (caminho)", exemplo: "Tape-rupi ogwatá." },
    { posp: "-arõ",      significado: "em cima, sobre",      exemplo: "Ndekytsé oĩ angu'a-arõ." },
    { posp: "-gwypy",    significado: "embaixo, debaixo",    exemplo: "Mitãgwé onhimangá ywyrá-gwypy." },
    { posp: "-mbyté-py", significado: "entre, no meio",      exemplo: "Tuwitxá oikó nhandetekoá-mbyté-py." },
    { posp: "-gwi",      significado: "de (origem)",         exemplo: "Kweé txetsy oú Miracatu-gwi." }
];

function perguntasPosposicoes() {

    const qs = [];

    shuffle(POSPOSICOES).slice(0, 5).forEach(item => {

        const outras = shuffle(
            POSPOSICOES.filter(p => p.posp !== item.posp)
        ).slice(0, 3);

        qs.push({
            type: "word-new",
            kind: "POSPOSIÇÃO",
            prompt: "O que significa a posposição " + item.posp + "?",
            hint: "Exemplo: " + item.exemplo + " (vol. 1, p. 50)",
            target: item.significado,
            choices: shuffle([
                item.significado,
                ...outras.map(p => p.significado)
            ])
        });
    });

    return qs;
}

/* ---------------------------------------------------------
   4. FRASES DO COTIDIANO — vol. 2, p. 7
   --------------------------------------------------------- */

const FRASES_COTIDIANO = [
    { nhe: "Ndera'ewé?",           pt: "Tudo bem?"           },
    { nhe: "Pemaẽ porã!",           pt: "Bem-vindos!"         },
    { nhe: "Tereó porã Nhanderú rewé!", pt: "Vai com Deus"   },
    { nhe: "Adjiwyma",              pt: "Tchau"               },
    { nhe: "Pendu!",                pt: "Ouçam!"              },
    { nhe: "Pekarú porã!",          pt: "Comam direitinho!"   },
    { nhe: "Txerypeyi",             pt: "Estou com sono"      },
    { nhe: "Txenhimbyayi",          pt: "Estou com fome"      }
];

function perguntasFrases() {

    const qs = [];

    shuffle(FRASES_COTIDIANO).slice(0, 5).forEach(item => {

        const outras = shuffle(
            FRASES_COTIDIANO.filter(f => f.nhe !== item.nhe)
        ).slice(0, 3);

        qs.push({
            type: "word-new",
            kind: "FRASE DO COTIDIANO",
            prompt: "O que significa a frase " + item.nhe + "?",
            hint: "Fonte: vol. 2, p. 7.",
            target: item.pt,
            choices: shuffle([
                item.pt,
                ...outras.map(f => f.pt)
            ])
        });
    });

    return qs;
}

/* ---------------------------------------------------------
   5. MESES — vol. 2, p. 46
   --------------------------------------------------------- */

const MESES = [
    { nhe: "DJATSYTEĨ",   pt: "janeiro"  },
    { nhe: "DJATSYKÕE",   pt: "fevereiro" },
    { nhe: "DJATSYAPY",   pt: "março"    },
    { nhe: "DJATSYRUNDY", pt: "abril"    },
    { nhe: "DJATSYPÓ",    pt: "maio"     },
    { nhe: "DJATSYPÁ",    pt: "outubro"  }
];

function perguntasMeses() {

    const qs = [];

    shuffle(MESES).slice(0, 4).forEach(item => {
        const outras = shuffle(
            MESES.filter(m => m.nhe !== item.nhe)
        ).slice(0, 3);

        qs.push({
            type: "word-new",
            kind: "CALENDÁRIO",
            prompt: "Que mês do ano é " + item.nhe + "?",
            hint: "Calendário Nhandewa (vol. 2, p. 46).",
            target: item.pt,
            choices: shuffle([item.pt, ...outras.map(m => m.pt)])
        });
    });

    return qs;
}

/* ---------------------------------------------------------
   6. MONTAGEM — 36 EXATAS
   --------------------------------------------------------- */

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
        throw new Error("Fase 3 não gerou nenhuma pergunta distinta.");
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

function buildFase3() {

    const todas = [
        ...perguntasConjugacaoRegular(),
        ...perguntasConjugacaoIrregular(),
        ...perguntasPosposicoes(),
        ...perguntasFrases(),
        ...perguntasMeses()
    ];

    return garantir36(todas);
}

if (typeof window !== "undefined") {
    window.FASE3 = {
        buildQuestions: buildFase3,
        total: 36,
        nivel: "difícil",
        fontes: [
            "Lições de Gramática Nhandewa-Guarani vol. 1 (2016)",
            "Lições de Gramática Nhandewa/Tupi-Guarani vol. 2 (2018)"
        ]
    };
    console.log("[fase3] carregada. buildQuestions retorna", buildFase3().length, "perguntas");
}
