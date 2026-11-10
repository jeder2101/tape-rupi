/* =====================================================
   TAPE-RUPI — ÁUDIO COMPLETO (com detecção automática
   de acerto/erro via classes .correct e .wrong)
   ===================================================== */

(function () {
  'use strict';

  let ctx = null;
  let master = null;
  let ambienteGain = null;
  let ambienteLigado = false;
  let ambienteIniciado = false;
  let preferenciaLigada = true;
  const fontesAmbiente = [];

  /* ---------- contexto ---------- */

  function criarContexto() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) { console.warn('[som] AudioContext indisponível'); return null; }
    try {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.destination);
      return ctx;
    } catch (e) { console.error('[som] erro contexto:', e); return null; }
  }

  function acordar() {
    if (!ctx) criarContexto();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(function () {});
    }
  }

  /* ---------- tons ---------- */

  function tom(freq, inicio, duracao, tipo, volume) {
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = tipo || 'sine';
    osc.frequency.setValueAtTime(freq, inicio);
    const pico = volume == null ? 0.2 : volume;
    env.gain.setValueAtTime(0.0001, inicio);
    env.gain.exponentialRampToValueAtTime(pico, inicio + 0.02);
    env.gain.exponentialRampToValueAtTime(0.0001, inicio + duracao);
    osc.connect(env);
    env.connect(master);
    osc.start(inicio);
    osc.stop(inicio + duracao + 0.05);
  }

  function acerto() {
    const c = criarContexto(); if (!c) return;
    acordar();
    const t = c.currentTime + 0.03;
    tom(523.25, t, 0.18, 'triangle', 0.25);
    tom(659.25, t + 0.10, 0.20, 'triangle', 0.25);
    tom(783.99, t + 0.20, 0.30, 'triangle', 0.28);
    console.log('[som] ACERTO');
  }

  function erro() {
    const c = criarContexto(); if (!c) return;
    acordar();
    const t = c.currentTime + 0.03;
    tom(311.13, t, 0.22, 'sawtooth', 0.18);
    tom(207.65, t + 0.14, 0.32, 'sawtooth', 0.18);
    console.log('[som] ERRO');
  }

  function clique() {
    const c = criarContexto(); if (!c) return;
    acordar();
    const t = c.currentTime + 0.01;
    tom(880, t, 0.07, 'square', 0.10);
  }

  /* ---------- ruído ---------- */

  function criarRuido(segundos) {
    const sr = ctx.sampleRate;
    const n = Math.floor(sr * segundos);
    const buf = ctx.createBuffer(1, n, sr);
    const d = buf.getChannelData(0);
    let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886*b0 + w*0.0555179;
      b1 = 0.99332*b1 + w*0.0750759;
      b2 = 0.96900*b2 + w*0.1538520;
      b3 = 0.86650*b3 + w*0.3104856;
      b4 = 0.55000*b4 + w*0.5329522;
      b5 = -0.7616*b5 - w*0.0168980;
      d[i] = (b0+b1+b2+b3+b4+b5+b6 + w*0.5362) * 0.10;
      b6 = w*0.115926;
    }
    return buf;
  }

  /* ---------- ambiente ---------- */

  function iniciarAmbiente() {
    const c = criarContexto(); if (!c) return;
    acordar();
    if (ambienteLigado || !preferenciaLigada) return;

    if (!ambienteIniciado) {
      ambienteGain = c.createGain();
      ambienteGain.gain.value = 0.0001;
      ambienteGain.connect(master);

      const ruido = c.createBufferSource();
      ruido.buffer = criarRuido(5);
      ruido.loop = true;

      const filtro = c.createBiquadFilter();
      filtro.type = 'lowpass';
      filtro.frequency.value = 700;
      filtro.Q.value = 0.6;

      const ruidoGain = c.createGain();
      ruidoGain.gain.value = 0.40;

      ruido.connect(filtro);
      filtro.connect(ruidoGain);
      ruidoGain.connect(ambienteGain);
      ruido.start();

      const passaro = c.createOscillator();
      passaro.type = 'sine';
      passaro.frequency.value = 2200;

      const lfo = c.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.13;

      const lfoGain = c.createGain();
      lfoGain.gain.value = 700;

      const passaroGain = c.createGain();
      passaroGain.gain.value = 0.022;

      lfo.connect(lfoGain);
      lfoGain.connect(passaro.frequency);
      passaro.connect(passaroGain);
      passaroGain.connect(ambienteGain);

      passaro.start();
      lfo.start();

      fontesAmbiente.push(ruido, passaro, lfo);
      ambienteIniciado = true;
    }

    const now = c.currentTime;
    ambienteGain.gain.cancelScheduledValues(now);
    ambienteGain.gain.setValueAtTime(0.0001, now);
    ambienteGain.gain.exponentialRampToValueAtTime(0.22, now + 2.0);
    ambienteLigado = true;
    atualizarBotao();
    console.log('[som] ambiente ON');
  }

  function pararAmbiente() {
    if (!ctx || !ambienteLigado) return;
    const now = ctx.currentTime;
    ambienteGain.gain.cancelScheduledValues(now);
    ambienteGain.gain.setValueAtTime(ambienteGain.gain.value, now);
    ambienteGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
    ambienteLigado = false;
    atualizarBotao();
    console.log('[som] ambiente OFF');
  }

  function alternarAmbiente() {
    if (ambienteLigado) { preferenciaLigada = false; pararAmbiente(); }
    else { preferenciaLigada = true; iniciarAmbiente(); }
  }

  function atualizarBotao() {
    const b = document.getElementById('sound');
    if (!b) return;
    b.textContent = ambienteLigado ? '♫' : '♪';
    b.title = ambienteLigado ? 'Desligar som' : 'Ligar som';
    b.setAttribute('aria-pressed', ambienteLigado ? 'true' : 'false');
  }

  /* ---------- desbloqueio autoplay ---------- */

  let desbloqueou = false;
  function desbloquear() {
    if (desbloqueou) return;
    desbloqueou = true;
    criarContexto();
    acordar();
    setTimeout(function () {
      if (preferenciaLigada && !ambienteLigado) iniciarAmbiente();
    }, 200);
  }
  document.addEventListener('pointerdown', desbloquear, true);
  document.addEventListener('touchstart', desbloquear, true);
  document.addEventListener('keydown', desbloquear, true);

  /* ---------- botão som sem depender do game.js ---------- */

  function prepararBotao() {
    const b = document.getElementById('sound');
    if (!b) return;
    const novo = b.cloneNode(true);
    b.parentNode.replaceChild(novo, b);
    novo.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      alternarAmbiente();
    });
    atualizarBotao();
  }

  /* ---------- detectar acerto/erro pelas classes ---------- */

  function observarRespostas() {
    const alvo = document.getElementById('answers');
    if (!alvo) {
      console.warn('[som] #answers não encontrado — som de respostas desativado');
      return;
    }

    // dispara quando elementos ganham classes .correct / .wrong
    const mo = new MutationObserver(function (lote) {
      lote.forEach(function (m) {
        if (m.type !== 'attributes' || m.attributeName !== 'class') return;
        const el = m.target;
        if (!el.classList) return;
        if (el.classList.contains('correct')) acerto();
        else if (el.classList.contains('wrong')) erro();
      });
    });

    mo.observe(alvo, { attributes: true, attributeFilter: ['class'], subtree: true });

    // fallback extra: clique direto em .answer já validado
    alvo.addEventListener('click', function (e) {
      const btn = e.target.closest('.answer');
      if (!btn) return;
      // o game.js pode já ter limpo classes; então só toca clique como feedback
      if (!btn.classList.contains('correct') && !btn.classList.contains('wrong')) {
        clique();
      }
    }, true);

    console.log('[som] observador de respostas ativo em #answers');
  }

  /* ---------- boot ---------- */

  function boot() {
    prepararBotao();
    observarRespostas();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.som = {
    acerto: acerto,
    erro: erro,
    clique: clique,
    ambiente: iniciarAmbiente,
    pararAmbiente: pararAmbiente,
    alternarAmbiente: alternarAmbiente
  };

  console.log('[som] módulo carregado');
})();
