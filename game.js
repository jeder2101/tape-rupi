
"use strict";

/* =========================================================
   TAPE-RUPI — JORNADA DE APRENDIZAGEM NHANDEWA

   PASTAS DOS ARQUIVOS:

   IMAGENS:
   assets/imagens/

   ÁUDIOS:
   assets/audio/

   TELA INICIAL:
   assets/tela-de-inicio/

   CORREÇÕES:
   1. Primeira pergunta obrigatoriamente ADJAKÁ.
   2. Alternativas somente em texto.
   3. Todas as imagens na mesma pasta.
   4. Todos os áudios na mesma pasta.
   5. Contagem de animais com imagens reais.
   6. Números de 0 a 7 preservados.
   ========================================================= */


/* =========================================================
   1. CAMINHOS DOS ARQUIVOS
   ========================================================= */

const ASSET = {
    images: "assets/imagens/",
    audio: "assets/audio/",
    home: "assets/tela-de-inicio/"
};


/* Todas as imagens são carregadas de assets/imagens/. */

function getImagePath(item) {
    return ASSET.images + item.file;
}


/* =========================================================
   2. NÚMEROS NHANDEWA
   ========================================================= */

const NUMBER_VOCABULARY = [
    {value:0, word:"DJERE", audio:"numero-0.mp3"},
    {value:1, word:"PETEĨ", audio:"numero-1.mp3"},
    {value:2, word:"MÕKÕI", audio:"numero-2.mp3"},
    {value:3, word:"MBOAPY", audio:"numero-3.mp3"},
    {value:4, word:"IRUNDY", audio:"numero-4.mp3"},
    {value:5, word:"NIRUI", audio:"numero-5.mp3"},
    {value:6, word:"YPÉ", audio:"numero-6.mp3"},
    {value:7, word:"TXA'I", audio:"numero-7.mp3"}
];

const NUMBER_PENDING = [8,9,10];


/* =========================================================
   3. VOCABULÁRIO NHANDEWA
   Todos os arquivos de imagem ficam na mesma pasta.
   ========================================================= */

const VOCABULARY = [

    // OBJETOS
    {word:"KUTXÁ", meaning:"colher", category:"OBJETOS", audio:"kutxa.mp3", file:"kutxa.png"},
    {word:"KUTXÁ RAKWÁ", meaning:"garfo", category:"OBJETOS", audio:"kutxa_rakwa.mp3", file:"kutxa-rakwa.png"},
    {word:"KARÓ", meaning:"copo/caneca", category:"OBJETOS", audio:"karo.mp3", file:"karo.png"},
    {word:"DJAPEPÓ", meaning:"panela", category:"OBJETOS", audio:"djapepo.mp3", file:"djapepo.png"},
    {word:"ADJAKÁ", meaning:"cesto", category:"OBJETOS", audio:"adjaka.mp3", file:"adjaka.png"},
    {word:"IRYMPẼ", meaning:"peneira", category:"OBJETOS", audio:"irympe.mp3", file:"irympe.png"},
    {word:"TIPITI", meaning:"espremedor", category:"OBJETOS", audio:"tipiti.mp3", file:"tipiti.png"},

    // ALIMENTOS
    {word:"AKADJU", meaning:"caju", category:"ALIMENTOS", audio:"akadju.mp3", file:"akadju.png"},
    {word:"PAKOWÁ", meaning:"banana", category:"ALIMENTOS", audio:"pakowa.mp3", file:"pakowa.png"},
    {word:"TSANDIÁ", meaning:"melancia", category:"ALIMENTOS", audio:"tsandia.mp3", file:"tsandia.png"},
    {word:"AWATI", meaning:"milho", category:"ALIMENTOS", audio:"awati.mp3", file:"awati.png"},
    {word:"MANDI'O", meaning:"mandioca", category:"ALIMENTOS", audio:"mandio.mp3", file:"mandio.png"},
    {word:"PIRÁ", meaning:"peixe", category:"ANIMAIS", audio:"pira.mp3", file:"pira.png"},
    {word:"KAMBY", meaning:"leite", category:"ALIMENTOS", audio:"kamby.mp3", file:"kamby.png"},
    {word:"TSO'O", meaning:"carne", category:"ALIMENTOS", audio:"tsoo.mp3", file:"tsoo.png"},

    // ANIMAIS
    {word:"KATXURU", meaning:"cachorro", category:"ANIMAIS", audio:"katxuru.mp3", file:"katxuru.png"},
    {word:"KA'I", meaning:"macaco", category:"ANIMAIS", audio:"kai.mp3", file:"kai.png"},
    {word:"KAPI'I'UWÁ", meaning:"capivara", category:"ANIMAIS", audio:"kapiiuwa.mp3", file:"kapiiuwa.png"},
    {word:"MBOÍ", meaning:"cobra", category:"ANIMAIS", audio:"mboi.mp3", file:"mboi.png"},
    {word:"NHANDU", meaning:"aranha", category:"ANIMAIS", audio:"nhandu.mp3", file:"nhandu.png"},
    {word:"TAY", meaning:"formiga", category:"ANIMAIS", audio:"tay.mp3", file:"tay.png"},
    {word:"TXIWI", meaning:"gato", category:"ANIMAIS", audio:"txiwi.mp3", file:"txiwi.png"},
    {word:"DJAKARÉ", meaning:"jacaré", category:"ANIMAIS", audio:"djakare.mp3", file:"djakare.png"},
    {word:"TSUGWAI", meaning:"porco doméstico", category:"ANIMAIS", audio:"tsugwai.mp3", file:"tsugwai.png"},
    {word:"POPO'I", meaning:"borboleta", category:"ANIMAIS", audio:"popoi.mp3", file:"popoi.png"},
    {word:"KURURU", meaning:"sapo", category:"ANIMAIS", audio:"kururu.mp3", file:"kururu.png"},

    // CORES
    {word:"PYNTÃ", meaning:"cor", category:"CORES", audio:"pynta.mp3", file:"pynta.png"},
    {word:"IDJU", meaning:"cor", category:"CORES", audio:"idju.mp3", file:"idju.png"},
    {word:"IKYRY", meaning:"cor", category:"CORES", audio:"ikyry.mp3", file:"ikyry.png"},
    {word:"OWY", meaning:"cor", category:"CORES", audio:"owy.mp3", file:"owy.png"},
    {word:"UŨ", meaning:"cor", category:"CORES", audio:"uu.mp3", file:"uu.png"},
    {word:"MORÕTI", meaning:"cor", category:"CORES", audio:"moroti.mp3", file:"moroti.png"},

    // CORPO HUMANO
    {word:"AKÃ", meaning:"cabeça", category:"CORPO", audio:"aka.mp3", file:"aka.png"},
    {word:"AWY", meaning:"cabelo", category:"CORPO", audio:"awy.mp3", file:"awy.png"},
    {word:"KUPÉ", meaning:"costas", category:"CORPO", audio:"kupe.mp3", file:"kupe.png"},
    {word:"POAPY", meaning:"pulso", category:"CORPO", audio:"poapy.mp3", file:"poapy.png"},
    {word:"NAMBI", meaning:"orelha", category:"CORPO", audio:"nambi.mp3", file:"nambi.png"},
    {word:"APYTSÃ-KWÁ", meaning:"ouvido", category:"CORPO", audio:"apytsangwa.mp3", file:"apytsangwa.png"},
    {word:"APYTÉ", meaning:"testa", category:"CORPO", audio:"apyte.mp3", file:"apyte.png"},
    {word:"RETSÁ", meaning:"olho", category:"CORPO", audio:"retsa.mp3", file:"retsa.png"},
    {word:"ROWÁ", meaning:"rosto", category:"CORPO", audio:"rowa.mp3", file:"rowa.png"},
    {word:"APYINGWÁ", meaning:"nariz", category:"CORPO", audio:"apyingwa.mp3", file:"apyingwa.png"},
    {word:"DJURU", meaning:"boca", category:"CORPO", audio:"djuru.mp3", file:"djuru.png"},
    {word:"RAĨ", meaning:"dente", category:"CORPO", audio:"rai.mp3", file:"rai.png"},
    {word:"APENKŨ", meaning:"língua", category:"CORPO", audio:"apenku.mp3", file:"apenku.png"},
    {word:"ATI'Y", meaning:"ombro", category:"CORPO", audio:"atiy.mp3", file:"atiy.png"},
    {word:"POTI'Á", meaning:"peito", category:"CORPO", audio:"potia.mp3", file:"potia.png"},
    {word:"PÓ", meaning:"mão", category:"CORPO", audio:"po.mp3", file:"po.png"},
    {word:"KWÃ", meaning:"dedo da mão", category:"CORPO", audio:"kwa.mp3", file:"kwa.png"},
    {word:"RYÉ", meaning:"barriga", category:"CORPO", audio:"rye.mp3", file:"rye.png"},
    {word:"PURU'Ã", meaning:"umbigo", category:"CORPO", audio:"purua.mp3", file:"purua.png"},
    {word:"TYMÃ", meaning:"perna", category:"CORPO", audio:"tyma.mp3", file:"tyma.png"},
    {word:"TÃKÃ", meaning:"joelho", category:"CORPO", audio:"taka.mp3", file:"taka.png"},
    {word:"ADJU'Y", meaning:"pescoço", category:"CORPO", audio:"adjuy.mp3", file:"adjuy.png"},
    {word:"DJYWÁ", meaning:"braço", category:"CORPO", audio:"djywa.mp3", file:"djywa.png"},
    {word:"PY", meaning:"pé", category:"CORPO", audio:"py.mp3", file:"py.png"},
    {word:"PYTSÃ", meaning:"dedo do pé", category:"CORPO", audio:"pytsa.mp3", file:"pytsa.png"},

    // PARENTESCO
    {word:"TXETSY", meaning:"minha mãe", category:"PARENTESCO", audio:"txetsy.mp3", file:"txetsy.png"},
    {word:"TXERU", meaning:"meu pai", category:"PARENTESCO", audio:"txeru.mp3", file:"txeru.png"},
    {word:"NHANERAMÕI", meaning:"nosso avô (inclusivo)", category:"PARENTESCO", audio:"nhaneramoi.mp3", file:"nhaneramoi.png"},
    {word:"ORERAMÕI", meaning:"nosso avô (exclusivo)", category:"PARENTESCO", audio:"oreramoi.mp3", file:"oreramoi.png"},
    {word:"TXERA'Y", meaning:"meu filho (dito pelo pai)", category:"PARENTESCO", audio:"txeray.mp3", file:"txeray.png"},
    {word:"TXEMEMBY", meaning:"meu filho/minha filha (dito pela mãe)", category:"PARENTESCO", audio:"txememby.mp3", file:"txememby.png"},
    {word:"TXERADJY", meaning:"minha filha (dito pelo pai)", category:"PARENTESCO", audio:"txeradjy.mp3", file:"txeradjy.png"},
    {word:"TXERYWY", meaning:"meu irmão mais novo", category:"PARENTESCO", audio:"txerywy.mp3", file:"txerywy.png"},
    {word:"TXERYKE'Y", meaning:"meu irmão mais velho", category:"PARENTESCO", audio:"txerykey.mp3", file:"txerykey.png"},
    {word:"TXINDY", meaning:"minha irmã mais nova", category:"PARENTESCO", audio:"txindy.mp3", file:"txindy.png"},
    {word:"TXEKYPY'Y", meaning:"minha irmã mais velha", category:"PARENTESCO", audio:"txekypy.mp3", file:"txekypy.png"},
    {word:"TXETUTY", meaning:"meu tio", category:"PARENTESCO", audio:"txetuty.mp3", file:"txetuty.png"},
    {word:"TXETSY'Y", meaning:"minha tia", category:"PARENTESCO", audio:"txetsyy.mp3", file:"txetsyy.png"}
];


/* =========================================================
   4. ESTADO DO JOGO
   ========================================================= */

const state = {
    index: 0,
    score: 0,
    answered: false,
    sound: true,
    time: null,
    questions: []
};

const $ = id => document.getElementById(id);


/* =========================================================
   5. PERÍODO DO DIA
   ========================================================= */

function periodNow() {

    const h = new Date().getHours();

    if (h >= 5 && h < 12) {
        return {
            name: "Manhã",
            icon: "☀",
            title: "Ko´ẽ Porã!",
            desc: "A luz da manhã abre o caminho para novas descobertas.",
            msg: "A jornada começa com a luz do dia."
        };
    }

    if (h >= 12 && h < 18) {
        return {
            name: "Tarde",
            icon: "◉",
            title: "Ka´aru Porã!",
            desc: "O caminho continua. Observe cada detalhe e descubra.",
            msg: "A tarde convida a explorar."
        };
    }

    return {
        name: "Noite",
        icon: "☾",
        title: "Pỹtũ Porã!",
        desc: "Quando a noite chega, a atenção ilumina o caminho.",
        msg: "A noite também guarda descobertas."
    };
}


/* =========================================================
   6. NAVEGAÇÃO ENTRE TELAS
   ========================================================= */

function screen(id) {

    ["home", "game", "finish"].forEach(x => {
        $(x).classList.toggle("active", x === id);
    });
}


/* =========================================================
   7. ÁUDIO
   Todos os áudios são carregados de assets/audio/.
   ========================================================= */

function audio(file) {

    if (!state.sound || !file) return;

    const a = new Audio(ASSET.audio + file);

    a.volume = 0.85;

    a.play().catch(() => {});
}


/* =========================================================
   8. FUNÇÕES AUXILIARES
   ========================================================= */

function shuffle(a) {
    return [...a].sort(() => Math.random() - 0.5);
}

function pickThree(item, list) {

    const others = shuffle(
        list.filter(x => x.word !== item.word)
    ).slice(0, 2);

    return shuffle([item, ...others]);
}

function word(w) {
    return VOCABULARY.find(v => v.word === w);
}

function numberWord(n) {
    return NUMBER_VOCABULARY.find(v => v.value === n);
}


/* =========================================================
   9. CRIAÇÃO DAS PERGUNTAS
   ========================================================= */

function buildQuestions() {

    const qs = [];

    // PRIMEIRA QUESTÃO: ADJAKÁ

    const firstItem = VOCABULARY.find(
        v => v.word === "ADJAKÁ"
    );

    if (!firstItem) {
        throw new Error("A palavra ADJAKÁ não foi encontrada.");
    }

    const objectGroup = VOCABULARY.filter(
        v => v.category === "OBJETOS"
    );

    const firstQuestion = {
        type: "word",
        kind: "OBJETOS",
        prompt: "Como se diz cesto na língua Nhandewa?",
        hint: "Observe a figura e escolha a palavra correta.",
        target: "ADJAKÁ",
        choices: pickThree(firstItem, objectGroup).map(x => x.word)
    };


    // PERGUNTAS DE VOCABULÁRIO

    [
        "CORES",
        "ANIMAIS",
        "CORPO",
        "PARENTESCO",
        "OBJETOS",
        "ALIMENTOS"
    ].forEach(cat => {

        let group = VOCABULARY.filter(
            v => v.category === cat
        );

        if (cat === "OBJETOS") {
            group = group.filter(
                v => v.word !== "ADJAKÁ"
            );
        }

        const quantidade =
            cat === "CORPO" ? 5 :
            cat === "ANIMAIS" ? 5 :
            cat === "PARENTESCO" ? 4 : 3;

        shuffle(group).slice(0, quantidade).forEach(item => {

            const opts = pickThree(item, group);

            qs.push({
                type: "word",
                kind: cat,
                prompt: "Como se diz isto na língua Nhandewa?",
                hint: "Observe a imagem e escolha a palavra correspondente.",
                target: item.word,
                choices: opts.map(x => x.word)
            });

        });
    });


    // PERGUNTAS DE NÚMEROS

    shuffle(NUMBER_VOCABULARY).slice(0, 4).forEach(n => {

        const opts = shuffle(
            NUMBER_VOCABULARY.filter(
                x => Math.abs(x.value - n.value) <= 2
            )
        ).slice(0, 3);

        if (!opts.some(x => x.value === n.value)) {
            opts[0] = n;
        }

        qs.push({
            type: "number",
            kind: "NÚMEROS",
            prompt: "Qual é a palavra Nhandewa para este número?",
            hint: "Observe o algarismo e escolha a forma correspondente.",
            target: n.value,
            choices: shuffle(opts).map(x => x.value)
        });

    });


    // CONTAGEM DE ANIMAIS COM IMAGENS REAIS

    const animalSet = VOCABULARY.filter(
        v => v.category === "ANIMAIS" && v.file
    );

    [0, 1, 2, 3, 4, 5, 6, 7].forEach(n => {

        const opts = shuffle(
            NUMBER_VOCABULARY.filter(
                x => Math.abs(x.value - n) <= 2
            )
        ).slice(0, 3);

        if (!opts.some(x => x.value === n)) {
            opts[0] = NUMBER_VOCABULARY.find(
                x => x.value === n
            );
        }

        const selectedAnimal = animalSet[
            Math.floor(Math.random() * animalSet.length)
        ];

        qs.push({
            type: "count",
            kind: "CONTE E DESCUBRA",
            prompt: "Quantos animais aparecem nesta imagem?",
            hint: "Conte cada figura uma vez e escolha a palavra do número.",
            target: n,
            countItem: selectedAnimal,
            choices: shuffle(opts).map(x => x.value)
        });

    });


    // PRIMEIRA PERGUNTA FIXA.
    // DEMAIS PERGUNTAS ALEATÓRIAS.

    return [
        firstQuestion,
        ...shuffle(qs)
    ];
}


/* =========================================================
   10. INICIAR JORNADA
   ========================================================= */

function start() {

    state.index = 0;
    state.score = 0;
    state.time = periodNow();
    state.questions = buildQuestions();

    $("time-chip").textContent =
        "JORNADA DA " + state.time.name.toUpperCase();

    $("period-label").textContent =
        "JORNADA DA " + state.time.name.toUpperCase();

    $("greeting").textContent = state.time.title;
    $("period-desc").textContent = state.time.desc;
    $("period-icon").textContent = state.time.icon;
    $("period-name").textContent = state.time.name;
    $("period-message").textContent = state.time.msg;

    screen("game");

    render();
}


/* =========================================================
   11. CARREGAMENTO DE IMAGENS
   Todas as imagens ficam em assets/imagens/.
   ========================================================= */

function createImage(item, className = "question-image") {

    const img = document.createElement("img");

    img.className = className;
    img.alt = item.meaning || "Imagem do vocabulário Nhandewa";
    img.src = getImagePath(item);

    img.onerror = function() {

        this.style.display = "none";

        const warning = document.createElement("span");

        warning.className = "image-missing";
        warning.textContent = "Imagem não encontrada: " + item.file;

        this.insertAdjacentElement("afterend", warning);
    };

    return img;
}


/* =========================================================
   12. ATUALIZAR TELA DO DESAFIO
   ========================================================= */

function render() {

    const q = state.questions[state.index];

    state.answered = false;

    $("qnum").textContent =
        "DESAFIO " + String(state.index + 1).padStart(2, "0");

    $("qkind").textContent = q.kind;
    $("prompt").textContent = q.prompt;
    $("hint").textContent = q.hint;

    $("progress-text").textContent =
        `${state.index + 1} / ${state.questions.length}`;

    $("progress-fill").style.width =
        (state.index / state.questions.length * 100) + "%";

    $("score").textContent = state.score;

    $("stars").textContent =
        state.score >= 180 ? "★ ★ ★" :
        state.score >= 100 ? "★ ★ ☆" :
        state.score >= 40 ? "★ ☆ ☆" : "☆ ☆ ☆";

    $("feedback").textContent = "";
    $("feedback").className = "feedback";

    $("next").disabled = true;

    $("next").textContent =
        state.index === state.questions.length - 1
        ? "VER RESULTADO →"
        : "PRÓXIMO DESAFIO →";

    visual(q);
    answers(q);
}


/* =========================================================
   13. APRESENTAÇÃO DAS IMAGENS
   ========================================================= */

function visual(q) {

    const box = $("visual");

    box.innerHTML = "";

    $("listen").disabled = true;
    $("listen").onclick = null;


    // PERGUNTA DE VOCABULÁRIO

    if (q.type === "word") {

        const item = word(q.target);

        if (!item) {
            throw new Error("Palavra não encontrada: " + q.target);
        }

        const card = document.createElement("div");

        card.className = "visual-card";

        const label = document.createElement("span");

        label.className = "visual-label";
        label.textContent = "OBSERVE A IMAGEM";

        card.append(createImage(item, "visual-image"), label);

        box.append(card);

        $("listen").disabled = false;

        $("listen").onclick = () => {
            audio(item.audio);
        };

    }


    // PERGUNTA DE NÚMEROS

    else if (q.type === "number") {

        const card = document.createElement("div");

        card.className = "visual-card";

        const n = document.createElement("span");

        n.className = "visual-number";
        n.textContent = String(q.target);

        const lab = document.createElement("span");

        lab.className = "visual-label";
        lab.textContent = "NÚMERO";

        card.append(n, lab);

        box.append(card);

        const item = numberWord(q.target);

        if (item) {
            $("listen").disabled = false;

            $("listen").onclick = () => {
                audio(item.audio);
            };
        }

    }


    // CONTAGEM DE ANIMAIS COM IMAGENS

    else if (q.type === "count") {

        const wrap = document.createElement("div");

        wrap.className = "visual-count";

        if (q.target === 0) {

            const empty = document.createElement("span");

            empty.className = "visual-note";
            empty.textContent = "NENHUM ANIMAL";

            wrap.append(empty);

        } else {

            for (let i = 0; i < q.target; i++) {

                const img = createImage(
                    q.countItem,
                    "count-animal-image"
                );

                img.alt = "Animal " + (i + 1);

                wrap.append(img);
            }
        }

        box.append(wrap);

        const note = document.createElement("span");

        note.className = "visual-note";

        note.textContent =
            q.target === 0
            ? "OBSERVE A IMAGEM"
            : "CONTE AS FIGURAS";

        box.append(note);
    }
}


/* =========================================================
   14. ALTERNATIVAS — SOMENTE TEXTO
   ========================================================= */

function answers(q) {

    const box = $("answers");

    box.innerHTML = "";

    q.choices.forEach(v => {

        const b = document.createElement("button");

        b.className = "answer";
        b.type = "button";

        // NÃO COLOCAR EMOJIS OU IMAGENS NAS ALTERNATIVAS.

        if (q.type === "word") {

            b.textContent = v;

        } else {

            const n = numberWord(v);

            b.textContent = n ? n.word : String(v);
        }

        b.addEventListener("click", () => {
            check(v, b);
        });

        box.append(b);
    });
}


/* =========================================================
   15. CORREÇÃO DAS RESPOSTAS
   ========================================================= */

function check(value, button) {

    if (state.answered) return;

    const q = state.questions[state.index];

    const ok = value === q.target;

    state.answered = true;

    document.querySelectorAll(".answer").forEach(b => {
        b.disabled = true;
    });

    if (ok) {

        state.score += 10;

        button.classList.add("correct");

        $("feedback").textContent =
            "AGUYJEVETE! Você encontrou a resposta.";

        $("feedback").className = "feedback";

        if (q.type === "word") {

            audio(word(q.target)?.audio);

        } else if (q.type === "number" || q.type === "count") {

            audio(numberWord(q.target)?.audio);
        }

    } else {

        button.classList.add("wrong");

        const expected =
            q.type === "word"
            ? q.target
            : numberWord(q.target)?.word;

        const right = [
            ...document.querySelectorAll(".answer")
        ].find(b => b.textContent === expected);

        if (right) {
            right.classList.add("correct");
        }

        $("feedback").textContent =
            "Ainda não! Observe novamente. A resposta certa está destacada.";

        $("feedback").className = "feedback error";
    }

    $("score").textContent = state.score;

    $("stars").textContent =
        state.score >= 180 ? "★ ★ ★" :
        state.score >= 100 ? "★ ★ ☆" :
        state.score >= 40 ? "★ ☆ ☆" : "☆ ☆ ☆";

    $("next").disabled = false;
}


/* =========================================================
   16. PRÓXIMO DESAFIO
   ========================================================= */

function next() {

    if (!state.answered) return;

    if (state.index < state.questions.length - 1) {

        state.index++;

        render();

    } else {

        finish();
    }
}


/* =========================================================
   17. FINAL DA JORNADA
   ========================================================= */

function finish() {

    $("progress-fill").style.width = "100%";

    $("final-score").textContent = state.score;

    $("finish-message").textContent =
        state.time.title +
        " Sua jornada terminou com " +
        state.score +
        " pontos. Continue explorando e aprendendo!";

    $("time-chip").textContent = "JORNADA CONCLUÍDA";

    screen("finish");
}


/* =========================================================
   18. BOTÕES E EVENTOS
   ========================================================= */

$("start").addEventListener("click", start);

$("again").addEventListener("click", start);

$("next").addEventListener("click", next);

$("home-button").addEventListener("click", () => {

    $("time-chip").textContent = "JORNADA DO DIA";

    screen("home");
});

$("sound").addEventListener("click", () => {

    state.sound = !state.sound;

    $("sound").textContent =
        state.sound ? "♫" : "♪̸";

    $("sound").setAttribute(
        "aria-label",
        state.sound ? "Desativar sons" : "Ativar sons"
    );
});


/* =========================================================
   19. IDENTIFICAÇÃO DO PERÍODO DO DIA
   ========================================================= */

(function() {

    const p = periodNow();

    $("time-chip").textContent =
        "JORNADA DA " + p.name.toUpperCase();

})();
