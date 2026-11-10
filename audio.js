/* =====================================================
   TAPE-RUPI — ÁUDIO COMPLETO
   Ambiente (floresta sintetizada), acerto, erro, clique.
   Expõe: window.som.{acerto, erro, clique, ambiente, pararAmbiente}
   ===================================================== */

(function () {
  'use strict';

  let ctx = null;
  let master = null;
  let ambienteGain = null;
  let ambienteLigado = false;
  let ambienteIniciado = false; // evita reiniciar nós
  let preferenciaLigada = true; // ambiente começa ligado por padrão
  const fontesAmbiente = [];

  /* ---------------------------------------------
     Contexto de áudio
     --------------------------------------------- */

  function criarContexto() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) {
      console.warn('[som] AudioContext indisponível');
      return null;
    }
    try {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.destination);
      console.log('[som] contexto criado, estado:', ctx.state);
      return ctx;
    } catch (e) {
      console.error('[som] erro ao criar contexto:', e);
      return null;
    }
  }

  function acordar() {
    if (!ctx) criarContexto();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().then(function () {
        console.log('[som] contexto retomado:', ctx.state);
      }).catch(function (e) {
        console.warn('[som] falha ao retomar:', e);
      });
    }
  }

  /* ---------------------------------------------
     Toms curtos
     --------------------------------------------- */

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
    const c = criarContexto();
    if (!c) return;
    acordar();
    const t = c.currentTime + 0.03;
    tom(523.25, t, 0.18, 'triangle', 0.25);
    tom(659.25, t + 0.10, 0.20, 'triangle', 0.25);
    tom(783.99, t + 0.20, 0.30, 'triangle', 0.28);
  }

  function erro() {
    const c = criarContexto();
    if (!c) return;
    acordar();
    const t = c.currentTime + 0.03;
    tom(311.13, t, 0.22, 'sawtooth', 0.18);
    tom(207.65, t + 0.14, 0.32, 'sawtooth', 0.18);
  }

  function clique() {
    const c = criarContexto();
    if (!c) return;
    acordar();
    const t = c.currentTime + 0.01;
    tom(880, t, 0.07, 'square', 0.10);
  }

  /* ---------------------------------------------
     Ruído rosa para o ambiente
     --------------------------------------------- */

  function criarRuido(segundos) {
    const sr = ctx.sampleRate;
    const n = Math.floor(sr * segundos);
    const buf = ctx.createBuffer(1, n, sr);
    const d = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.96900 * b2 + w * 0.1538520;
      b3 = 0.86650 * b3 + w * 0.3104856;
      b4 = 0.55000 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.0168980;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.10;
      b6 = w * 0.115926;
    }
    return buf;
  }

  /* ---------------------------------------------
     Ambiente — floresta sintetizada
     --------------------------------------------- */

  function iniciarAmbiente() {
    const c = criarContexto();
    if (!c) return;
    acordar();
    if (ambienteLigado || !preferenciaLigada) return;

    if (!ambienteIniciado) {
      ambienteGain = c.createGain();
      ambienteGain.gain.value = 0.0001;
      ambienteGain.connect(master);

      // Vento / folhas
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

      // Pássaros distantes
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
      console.log('[som] nós de ambiente criados');
    }

    const now = c.currentTime;
    ambienteGain.gain.cancelScheduledValues(now);
    ambienteGain.gain.setValueAtTime(0.0001, now);
    ambienteGain.gain.exponentialRampToValueAtTime(0.22, now + 2.0);
    ambienteLigado = true;
    atualizarBotao();
    console.log('[som] ambiente LIGADO');
  }

  function pararAmbiente() {
    if (!ctx || !ambienteLigado) return;
    const now = ctx.currentTime;
    ambienteGain.gain.cancelScheduledValues(now);
    ambienteGain.gain.setValueAtTime(ambienteGain.gain.value, now);
    ambienteGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
    ambienteLigado = false;
    atualizarBotao();
    console.log('[som] ambiente DESLIGADO');
  }

  function alternarAmbiente() {
    if (ambienteLigado) {
      preferenciaLigada = false;
      pararAmbiente();
    } else {
      preferenciaLigada = true;
      iniciarAmbiente();
    }
  }

  function atualizarBotao() {
    const b = document.getElementById('sound');
    if (!b) return;
    b.textContent = ambienteLigado ? '♫' : '♪';
    b.title = ambienteLigado ? 'Desligar som' : 'Ligar som';
    b.setAttribute('aria-pressed', ambienteLigado ? 'true' : 'false');
  }

  /* ---------------------------------------------
     Desbloqueio automático do primeiro gesto
     --------------------------------------------- */

  let desbloqueou = false;

  function desbloquear() {
    if (desbloqueou) return;
    desbloqueou = true;
    criarContexto();
    acordar();
    // Depois de desbloquear, tenta ligar o ambiente se a preferência estiver ligada
    setTimeout(function () {
      if (preferenciaLigada && !ambienteLigado) iniciarAmbiente();
    }, 150);
  }

  document.addEventListener('pointerdown', desbloquear, true);
  document.addEventListener('touchstart', desbloquear, true);
  document.addEventListener('keydown', desbloquear, true);

  /* ---------------------------------------------
     Botão de som — independente do game.js
     --------------------------------------------- */

  function prepararBotao() {
    const b = document.getElementById('sound');
    if (!b) return;
    // Remove listeners anteriores do game.js se possível
    const novo = b.cloneNode(true);
    b.parentNode.replaceChild(novo, b);
    novo.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      alternarAmbiente();
    });
    atualizarBotao();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', prepararBotao);
  } else {
    prepararBotao();
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
