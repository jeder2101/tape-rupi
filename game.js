"use strict";
/* TAPE-RUPI — conteúdo Nhandewa organizado por temas.
   Formas dos números 0–7 preservadas conforme informadas pelo usuário.
   8–10 ficam reservados até receber a forma confirmada; não inventar traduções.
   Corpo humano e parentesco seguem Lições de Gramática Nhandewa-Guarani, vol. 2.
*/
const ASSET={words:"assets/audio/palavras/",images:"assets/imagens/vocabulario/",animals:"assets/imagens/animais/"};

const NUMBER_VOCABULARY=[
 {value:0,word:"DJERE",audio:"numero-0.mp3"},
 {value:1,word:"PETEĨ",audio:"numero-1.mp3"},
 {value:2,word:"MÕKÕI",audio:"numero-2.mp3"},
 {value:3,word:"MBOAPY",audio:"numero-3.mp3"},
 {value:4,word:"IRUNDY",audio:"numero-4.mp3"},
 {value:5,word:"NIRUI",audio:"numero-5.mp3"},
 {value:6,word:"YPÉ",audio:"numero-6.mp3"},
 {value:7,word:"TXA'I",audio:"numero-7.mp3"}
];
const NUMBER_PENDING=[8,9,10];

const VOCABULARY=[
 // Objetos e alimentos — vocabulário já presente na versão inicial e no material de referência.
 {word:"KUTXÁ",meaning:"colher",emoji:"🥄",category:"OBJETOS",audio:"kutxa.mp3",file:"kutxa.png"},
 {word:"KUTXÁ RAKWÁ",meaning:"garfo",emoji:"🍴",category:"OBJETOS",audio:"kutxa_rakwa.mp3",file:"kutxa-rakwa.png"},
 {word:"KARÓ",meaning:"copo/caneca",emoji:"🥤",category:"OBJETOS",audio:"karo.mp3",file:"karo.png"},
 {word:"DJAPEPÓ",meaning:"panela",emoji:"🍲",category:"OBJETOS",audio:"djapepo.mp3",file:"djapepo.png"},
 {word:"ADJAKÁ",meaning:"cesto",emoji:"🧺",category:"OBJETOS",audio:"adjaka.mp3",file:"adjaka.png"},
 {word:"IRYMPẼ",meaning:"peneira",emoji:"🧺",category:"OBJETOS",audio:"irympe.mp3",file:"irympe.png"},
 {word:"TIPITI",meaning:"espremedor",emoji:"🪵",category:"OBJETOS",audio:"tipiti.mp3",file:"tipiti.png"},
 {word:"AKADJU",meaning:"caju",emoji:"🥭",category:"ALIMENTOS",audio:"akadju.mp3",file:"akadju.png"},
 {word:"PAKOWÁ",meaning:"banana",emoji:"🍌",category:"ALIMENTOS",audio:"pakowa.mp3",file:"pakowa.png"},
 {word:"TSANDIÁ",meaning:"melancia",emoji:"🍉",category:"ALIMENTOS",audio:"tsandia.mp3",file:"tsandia.png"},
 {word:"AWATI",meaning:"milho",emoji:"🌽",category:"ALIMENTOS",audio:"awati.mp3",file:"awati.png"},
 {word:"MANDI'O",meaning:"mandioca",emoji:"🌱",category:"ALIMENTOS",audio:"mandio.mp3",file:"mandio.png"},
 {word:"PIRÁ",meaning:"peixe",emoji:"🐟",category:"ANIMAIS",audio:"pira.mp3",file:"pira.png"},
 {word:"KAMBY",meaning:"leite",emoji:"🥛",category:"ALIMENTOS",audio:"kamby.mp3",file:"kamby.png"},
 {word:"TSO'O",meaning:"carne",emoji:"🍖",category:"ALIMENTOS",audio:"tsoo.mp3",file:"tsoo.png"},
 // Animais — Lições de Gramática Nhandewa-Guarani, vol. 2.
 {word:"KATXURU",meaning:"cachorro",emoji:"🐕",category:"ANIMAIS",audio:"katxuru.mp3",file:"katxuru.png"},
 {word:"KA'I",meaning:"macaco",emoji:"🐒",category:"ANIMAIS",audio:"kai.mp3",file:"kai.png"},
 {word:"KAPI'I'UWÁ",meaning:"capivara",emoji:"🦫",category:"ANIMAIS",audio:"kapiiuwa.mp3",file:"kapiiuwa.png"},
 {word:"MBOÍ",meaning:"cobra",emoji:"🐍",category:"ANIMAIS",audio:"mboi.mp3",file:"mboi.png"},
 {word:"NHANDU",meaning:"aranha",emoji:"🕷️",category:"ANIMAIS",audio:"nhandu.mp3",file:"nhandu.png"},
 {word:"TAY",meaning:"formiga",emoji:"🐜",category:"ANIMAIS",audio:"tay.mp3",file:"tay.png"},
 {word:"TXIWI",meaning:"gato",emoji:"🐈",category:"ANIMAIS",audio:"txiwi.mp3",file:"txiwi.png"},
 {word:"DJAKARÉ",meaning:"jacaré",emoji:"🐊",category:"ANIMAIS",audio:"djakare.mp3",file:"djakare.png"},
 {word:"TSUGWAI",meaning:"porco doméstico",emoji:"🐖",category:"ANIMAIS",audio:"tsugwai.mp3",file:"tsugwai.png"},
 {word:"POPO'I",meaning:"borboleta",emoji:"🦋",category:"ANIMAIS",audio:"popoi.mp3",file:"popoi.png"},
 {word:"KURURU",meaning:"sapo",emoji:"🐸",category:"ANIMAIS",audio:"kururu.mp3",file:"kururu.png"},
 // Cores — formas mantidas como aparecem no vocabulário; associação cromática pode ser ajustada pela comunidade.
 {word:"PYNTÃ",meaning:"cor",emoji:"🎨",category:"CORES",audio:"pynta.mp3"},
 {word:"IDJU",meaning:"cor",emoji:"🎨",category:"CORES",audio:"idju.mp3"},
 {word:"IKYRY",meaning:"cor",emoji:"🎨",category:"CORES",audio:"ikyry.mp3"},
 {word:"OWY",meaning:"cor",emoji:"🎨",category:"CORES",audio:"owy.mp3"},
 {word:"UŨ",meaning:"cor",emoji:"🎨",category:"CORES",audio:"uu.mp3"},
 {word:"MORÕTI",meaning:"cor",emoji:"🎨",category:"CORES",audio:"moroti.mp3"},
 // Corpo humano — base lexical indicada entre parênteses no material (txe = marca possessiva).
 {word:"(TXE)AKÃ",meaning:"cabeça",emoji:"🧑",category:"CORPO",audio:"aka.mp3"},
 {word:"(TXE)'AWY",meaning:"cabelo",emoji:"💇",category:"CORPO",audio:"awy.mp3"},
 {word:"(TXE)KUPÉ",meaning:"costas",emoji:"🧍",category:"CORPO",audio:"kupe.mp3"},
 {word:"(TXE)POAPY",meaning:"pulso",emoji:"⌚",category:"CORPO",audio:"poapy.mp3"},
 {word:"(TXE)NAMBI",meaning:"orelha",emoji:"👂",category:"CORPO",audio:"nambi.mp3"},
 {word:"(TXE)APYTSÃ-KWÁ",meaning:"ouvido",emoji:"👂",category:"CORPO",audio:"apytsangwa.mp3"},
 {word:"(TXE)APYTÉ",meaning:"testa",emoji:"🙂",category:"CORPO",audio:"apyte.mp3"},
 {word:"(TXE)RETSÁ",meaning:"olho",emoji:"👁️",category:"CORPO",audio:"retsa.mp3"},
 {word:"(TXE)ROWÁ",meaning:"rosto",emoji:"😊",category:"CORPO",audio:"rowa.mp3"},
 {word:"(TXE)APYINGWÁ",meaning:"nariz",emoji:"👃",category:"CORPO",audio:"apyingwa.mp3"},
 {word:"(TXE)DJURU",meaning:"boca",emoji:"👄",category:"CORPO",audio:"djuru.mp3"},
 {word:"(TXE)RAĨ",meaning:"dente",emoji:"🦷",category:"CORPO",audio:"rai.mp3"},
 {word:"(TXE)APENKŨ",meaning:"língua",emoji:"👅",category:"CORPO",audio:"apenku.mp3"},
 {word:"(TXE)ATI'Y",meaning:"ombro",emoji:"🧍",category:"CORPO",audio:"atiy.mp3"},
 {word:"(TXE)POTI'Á",meaning:"peito",emoji:"🫁",category:"CORPO",audio:"potia.mp3"},
 {word:"(TXE)PÓ",meaning:"mão",emoji:"✋",category:"CORPO",audio:"po.mp3"},
 {word:"(TXE)KWÃ",meaning:"dedo da mão",emoji:"☝️",category:"CORPO",audio:"kwa.mp3"},
 {word:"(TXE)RYÉ",meaning:"barriga",emoji:"🧍",category:"CORPO",audio:"rye.mp3"},
 {word:"(TXE)PURU'Ã",meaning:"umbigo",emoji:"🧍",category:"CORPO",audio:"purua.mp3"},
 {word:"(TXE)TYMÃ",meaning:"perna",emoji:"🦵",category:"CORPO",audio:"tyma.mp3"},
 {word:"(TXE)TÃKÃ",meaning:"joelho",emoji:"🦵",category:"CORPO",audio:"taka.mp3"},
 {word:"(TXE)ADJU'Y",meaning:"pescoço",emoji:"🧍",category:"CORPO",audio:"adjuy.mp3"},
 {word:"(TXE)DJYWÁ",meaning:"braço",emoji:"💪",category:"CORPO",audio:"djywa.mp3"},
 {word:"(TXE)PY",meaning:"pé",emoji:"🦶",category:"CORPO",audio:"py.mp3"},
 {word:"(TXE)PYTSÃ",meaning:"dedo do pé",emoji:"🦶",category:"CORPO",audio:"pytsa.mp3"},
 // Parentesco — formas possessivas como exemplificadas no material didático.
 {word:"TXETSY",meaning:"minha mãe",emoji:"👩",category:"PARENTESCO",audio:"txetsy.mp3"},
 {word:"TXERU",meaning:"meu pai",emoji:"👨",category:"PARENTESCO",audio:"txeru.mp3"},
 {word:"NHANERAMÕI",meaning:"nosso avô (inclusivo)",emoji:"👴",category:"PARENTESCO",audio:"nhaneramoi.mp3"},
 {word:"ORERAMÕI",meaning:"nosso avô (exclusivo)",emoji:"👴",category:"PARENTESCO",audio:"oreramoi.mp3"},
 {word:"TXERA'Y",meaning:"meu filho (dito pelo pai)",emoji:"🧒",category:"PARENTESCO",audio:"txeray.mp3"},
 {word:"TXEMEMBY",meaning:"meu filho/minha filha (dito pela mãe)",emoji:"🧒",category:"PARENTESCO",audio:"txememby.mp3"},
 {word:"TXERADJY",meaning:"minha filha (dito pelo pai)",emoji:"👧",category:"PARENTESCO",audio:"txeradjy.mp3"},
 {word:"TXERYWY",meaning:"meu irmão mais novo",emoji:"👦",category:"PARENTESCO",audio:"txerywy.mp3"},
 {word:"TXERYKE'Y",meaning:"meu irmão mais velho",emoji:"🧑",category:"PARENTESCO",audio:"txerykey.mp3"},
 {word:"TXINDY",meaning:"minha irmã mais nova",emoji:"👧",category:"PARENTESCO",audio:"txindy.mp3"},
 {word:"TXEKYPY'Y",meaning:"minha irmã mais velha",emoji:"👩",category:"PARENTESCO",audio:"txekypy.mp3"},
 {word:"TXETUTY",meaning:"meu tio",emoji:"👨",category:"PARENTESCO",audio:"txetuty.mp3"},
 {word:"TXETSY'Y",meaning:"minha tia",emoji:"👩",category:"PARENTESCO",audio:"txetsyy.mp3"}
];

const state={index:0,score:0,answered:false,sound:true,time:null,questions:[]};
const $=id=>document.getElementById(id);
function periodNow(){const h=new Date().getHours();if(h>=5&&h<12)return{name:"Manhã",icon:"☀",title:"Bom dia de jornada!",desc:"A luz da manhã abre o caminho para novas descobertas.",msg:"A jornada começa com a luz do dia."};if(h>=12&&h<18)return{name:"Tarde",icon:"◉",title:"Boa tarde de jornada!",desc:"O caminho continua. Observe cada detalhe e descubra.",msg:"A tarde convida a explorar."};return{name:"Noite",icon:"☾",title:"Boa noite de jornada!",desc:"Quando a noite chega, a atenção ilumina o caminho.",msg:"A noite também guarda descobertas."}}
function screen(id){["home","game","finish"].forEach(x=>$(x).classList.toggle("active",x===id))}
function audio(file){if(!state.sound||!file)return;const a=new Audio(ASSET.words+file);a.volume=.85;a.play().catch(()=>{});}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function pickThree(item,list){const others=shuffle(list.filter(x=>x.word!==item.word)).slice(0,2);return shuffle([item,...others])}
function buildQuestions(){
 const qs=[];
 // Reconhecimento das palavras em cada campo semântico.
 ["CORES","ANIMAIS","CORPO","PARENTESCO","OBJETOS","ALIMENTOS"].forEach(cat=>{
   const group=VOCABULARY.filter(v=>v.category===cat);
   shuffle(group).slice(0,cat==="CORPO"?5:cat==="ANIMAIS"?5:cat==="PARENTESCO"?4:3).forEach((item,i)=>{
     const opts=pickThree(item,group);
     qs.push({type:"word",kind:cat,prompt:"Como se diz isto na língua Nhandewa?",hint:"Observe a imagem e escolha a palavra correspondente.",target:item.word,choices:opts.map(x=>x.word)});
   });
 });
 // Desafios de reconhecer os numerais que já foram informados.
 shuffle(NUMBER_VOCABULARY).slice(0,4).forEach(n=>{
   const opts=shuffle(NUMBER_VOCABULARY.filter(x=>Math.abs(x.value-n.value)<=2)).slice(0,3);
   if(!opts.some(x=>x.value===n.value))opts[0]=n;
   qs.push({type:"number",kind:"NÚMEROS",prompt:"Qual é a palavra Nhandewa para este número?",hint:"Observe o algarismo e escolha a forma correspondente.",target:n.value,choices:shuffle(opts).map(x=>x.value)});
 });
 // Contagem ilustrada de animais: apenas 0–7, faixa com formas fornecidas.
 const animalSet=["🐟","🦋","🐸","🐜","🐢","🐦"];
 [0,1,2,3,4,5,6,7].forEach((n,i)=>{
   const opts=shuffle(NUMBER_VOCABULARY.filter(x=>Math.abs(x.value-n)<=2)).slice(0,3);
   if(!opts.some(x=>x.value===n))opts[0]=NUMBER_VOCABULARY.find(x=>x.value===n);
   qs.push({type:"count",kind:"CONTE E DESCUBRA",prompt:"Quantos animais aparecem nesta imagem?",hint:"Conte cada figura uma vez e escolha a palavra do número.",target:n,animal:animalSet[i%animalSet.length],choices:shuffle(opts).map(x=>x.value)});
 });
 return shuffle(qs);
}
function start(){state.index=0;state.score=0;state.time=periodNow();state.questions=buildQuestions();$("time-chip").textContent="JORNADA DA "+state.time.name.toUpperCase();$("period-label").textContent="JORNADA DA "+state.time.name.toUpperCase();$("greeting").textContent=state.time.title;$("period-desc").textContent=state.time.desc;$("period-icon").textContent=state.time.icon;$("period-name").textContent=state.time.name;$("period-message").textContent=state.time.msg;screen("game");render()}
function word(w){return VOCABULARY.find(v=>v.word===w)}
function numberWord(n){return NUMBER_VOCABULARY.find(v=>v.value===n)}
function render(){const q=state.questions[state.index];state.answered=false;$("qnum").textContent="DESAFIO "+String(state.index+1).padStart(2,"0");$("qkind").textContent=q.kind;$("prompt").textContent=q.prompt;$("hint").textContent=q.hint;$("progress-text").textContent=`${state.index+1} / ${state.questions.length}`;$("progress-fill").style.width=(state.index/state.questions.length*100)+"%";$("score").textContent=state.score;$("stars").textContent=state.score>=180?"★ ★ ★":state.score>=100?"★ ★ ☆":state.score>=40?"★ ☆ ☆":"☆ ☆ ☆";$("feedback").textContent="";$("feedback").className="feedback";$("next").disabled=true;$("next").textContent=state.index===state.questions.length-1?"VER RESULTADO →":"PRÓXIMO DESAFIO →";visual(q);answers(q)}
function visual(q){const box=$("visual");box.innerHTML="";$("listen").disabled=true;$("listen").onclick=null;
 if(q.type==="word"){
   const item=word(q.target),card=document.createElement("div");card.className="visual-card";const symbol=document.createElement("span");symbol.className="visual-emoji";symbol.textContent=item.emoji||"✦";const label=document.createElement("span");label.className="visual-label";label.textContent="OBSERVE";card.append(symbol,label);box.append(card);
   if(item.file){const img=new Image();img.src=ASSET.images+item.file;img.onload=()=>{img.alt="Ilustração do desafio";img.style.cssText="width:78px;height:78px;object-fit:contain";symbol.replaceWith(img)}}
   $("listen").disabled=false;$("listen").onclick=()=>audio(item.audio);
 }else if(q.type==="number"){
   const card=document.createElement("div");card.className="visual-card";const n=document.createElement("span");n.className="visual-emoji";n.textContent=String(q.target);const lab=document.createElement("span");lab.className="visual-label";lab.textContent="NÚMERO";card.append(n,lab);box.append(card);
 }else{
   const wrap=document.createElement("div");wrap.className="visual-count";for(let i=0;i<q.target;i++){const s=document.createElement("span");s.textContent=q.animal;s.setAttribute("aria-hidden","true");wrap.append(s)}box.append(wrap);const n=document.createElement("span");n.className="visual-note";n.textContent=q.target===0?"NENHUM ANIMAL":"CONTE AS FIGURAS";box.append(n);
 }
}
function answers(q){const box=$("answers");box.innerHTML="";q.choices.forEach(v=>{const b=document.createElement("button");b.className="answer";b.type="button";if(q.type==="word"){const item=word(v);b.innerHTML=`<span class="answer-symbol">${item.emoji||"✦"}</span><span class="answer-word">${v}</span>`}else{const n=numberWord(v);b.innerHTML=`<span class="answer-symbol">${v}</span><span class="answer-word">${n?n.word:"NÚMERO "+v}</span>`}b.addEventListener("click",()=>check(v,b));box.append(b)})}
function check(value,button){if(state.answered)return;const q=state.questions[state.index],ok=value===q.target;state.answered=true;document.querySelectorAll(".answer").forEach(b=>b.disabled=true);if(ok){state.score+=10;button.classList.add("correct");$("feedback").textContent="AGUYJEVETE! Você encontrou a resposta.";$("feedback").className="feedback";if(q.type==="word")audio(word(q.target).audio);else if(q.type==="number"||q.type==="count")audio(numberWord(q.target)?.audio)}else{button.classList.add("wrong");const expected=q.type==="word"?q.target:numberWord(q.target)?.word;const right=[...document.querySelectorAll(".answer")].find(b=>b.querySelector(".answer-word").textContent===expected);if(right)right.classList.add("correct");$("feedback").textContent="Ainda não! Observe novamente. A resposta certa está destacada.";$("feedback").className="feedback error"}$("score").textContent=state.score;$("stars").textContent=state.score>=180?"★ ★ ★":state.score>=100?"★ ★ ☆":state.score>=40?"★ ☆ ☆":"☆ ☆ ☆";$("next").disabled=false}
function next(){if(!state.answered)return;if(state.index<state.questions.length-1){state.index++;render()}else finish()}
function finish(){$("progress-fill").style.width="100%";$("final-score").textContent=state.score;$("finish-message").textContent=state.time.title+" Sua jornada terminou com "+state.score+" pontos. Continue explorando e aprendendo!";$("time-chip").textContent="JORNADA CONCLUÍDA";screen("finish")}
$("start").addEventListener("click",start);$("again").addEventListener("click",start);$("next").addEventListener("click",next);$("home-button").addEventListener("click",()=>{$("time-chip").textContent="JORNADA DO DIA";screen("home")});
$("sound").addEventListener("click",()=>{state.sound=!state.sound;$("sound").textContent=state.sound?"♫":"♪̸";$("sound").setAttribute("aria-label",state.sound?"Desativar sons":"Ativar sons")});
(function(){const p=periodNow();$("time-chip").textContent="JORNADA DA "+p.name.toUpperCase()})();
