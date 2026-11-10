/* =====================================================
   TAPE-RUPI — ÁUDIO SINTETIZADO (Web Audio API)
   Sem arquivos externos. Ambiente, acerto, erro e clique.
   ===================================================== */

(function () {

  'use strict';

  const STORAGE_KEY = 'tape-rupi-audio';

  let ctx = null;
  let master = null;
  let ambientGain = null;
  let ambientNodes = [];
  let ambientOn = false;
  let initialized = false;

  /* ---------------------------------------------
     Cria o contexto só na primeira interação
     --------------------------------------------- */

  function ensureContext() {
    if (ctx) return ctx;

    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;

    ctx = new AC();

    master = ctx.createGain();
    master.gain.value = 0.45;
    master.connect(ctx.destination);

    return ctx;
  }

  function resumeIfNeeded() {
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(function () {});
    }
  }

  /* ---------------------------------------------
     Som ambiente: ruído rosa filtrado em loop
     --------------------------------------------- */

  function buildNoiseBuffer(seconds) {
    const sampleRate = ctx.sampleRate;
    const length = Math.floor(sampleRate * seconds);
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    return buffer;
  }

  function startAmbient() {
    if (!ensureContext()) return;
    resumeIfNeeded();
    if (ambientOn) return;

    ambientGain = ctx.createGain();
    ambientGain.gain.value = 0;
    ambientGain.connect(master);

    /* Ruído base da floresta */
    const noise = ctx.createBufferSource();
    noise.buffer = buildNoiseBuffer(6);
    noise.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 900;
    noiseFilter.Q.value = 0.4;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.32;

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ambientGain);
    noise.start();

    /* Pássaros sintéticos: pings altos com LFO aleatório */
    const birdGain = ctx.createGain();
    birdGain.gain.value = 0;
    birdGain.connect(ambientGain);

    const birdOsc = ctx.createOscillator();
    birdOsc.type = 'sine';
    birdOsc.frequency.value = 2200;

    const birdLfo = ctx.createOscillator();
    birdLfo.type = 'sine';
    birdLfo.frequency.value = 0.18;

    const birdLfoGain = ctx.createGain();
    birdLfoGain.gain.value = 700;

    birdLfo.connect(birdLfoGain);
    birdLfoGain.connect(birdOsc.frequency);

    birdOsc.connect(birdGain);
    birdOsc.start();
    birdLfo.start();

    /* Fade-in suave do ambiente */
    const now = ctx.currentTime;
    ambientGain.gain.cancelScheduledValues(now);
    ambientGain.gain.setValueAtTime(0.0001, now);
    ambientGain.gain.exponentialRampToValueAtTime(0.18, now + 2.0);

    /* Modulação lenta do volume dos pássaros (canto esporádico) */
    const lfoVol = ctx.createOscillator();
    lfoVol.type = 'sine';
    lfoVol.frequency.value = 0.08;

    const lfoVolGain = ctx.createGain();
    lfoVolGain.gain.value = 0.05;
    lfoVol.connect(lfoVolGain);
    lfoVolGain.connect(birdGain.gain);
    lfoVol.start();

    ambientNodes = [noise, birdOsc, birdLfo, lfoVol];
    ambientOn = true;

    syncButton();
  }

  function stopAmbient() {
    if (!ambientOn || !ctx) return;

    const now = ctx.currentTime;
    ambientGain.gain.cancelScheduledValues(now);
    ambientGain.gain.setValueAtTime(ambientGain.gain.value, now);
    ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.6);

    const nodesToStop = ambientNodes.slice();
    setTimeout(function () {
      nodesToStop.forEach(function (n) {
        try { n.stop(); } catch (e) {}
      });
      ambientNodes = [];
    }, 700);

    ambientOn = false;
    syncButton();
  }

  /* ---------------------------------------------
     Tons curtos para acerto / erro / clique
     --------------------------------------------- */

  function playTone(freq, startAt, duration, type, gainValue) {
    const osc = ctx.createOscillator();
    const env = ctx.createGain();

    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, startAt);

    const peak = gainValue == null ? 0.18 : gainValue;

    env.gain.setValueAtTime(0.0001, startAt);
    env.gain.exponentialRampToValueAtTime(peak, startAt + 0.02);
    env.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

    osc.connect(env);
    env.connect(master);

    osc.start(startAt);
    osc.stop(startAt + duration + 0.05);
  }

  function playCorrect() {
    if (!ensureContext()) return;
    resumeIfNeeded();

    const t = ctx.currentTime + 0.02;
    playTone(523.25, t, 0.18, 'triangle', 0.20);         // C5
    playTone(659.25, t + 0.10, 0.20, 'triangle', 0.20);  // E5
    playTone(783.99, t + 0.20, 0.32, 'triangle', 0.22);  // G5
  }

  function playWrong() {
    if (!ensureContext()) return;
    resumeIfNeeded();

    const t = ctx.currentTime + 0.02;
    playTone(311.13, t, 0.20, 'sawtooth', 0.14);         // Eb4
    playTone(207.65, t + 0.14, 0.30, 'sawtooth', 0.14);  // Ab3
  }

  function playClick() {
    if (!ensureContext()) return;
    resumeIfNeeded();

    const t = ctx.currentTime + 0.01;
    playTone(880, t, 0.08, 'square', 0.08);
  }

  function playFinish() {
    if (!ensureContext()) return;
    resumeIfNeeded();

    const t = ctx.currentTime + 0.02;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach(function (freq, i) {
      playTone(freq, t + i * 0.13, 0.30, 'triangle', 0.20);
    });
  }

  /* ---------------------------------------------
     Botão de som + persistência
     --------------------------------------------- */

  function syncButton() {
    const btn = document.getElementById('sound');
    if (!btn) return;
    btn.textContent = ambientOn ? '♫' : '♪';
    btn.setAttribute('aria-pressed', ambientOn ? 'true' : 'false');
    btn.title = ambientOn ? 'Desligar som' : 'Ligar som';
  }

  function readPreference() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'on';
    } catch (e) {
      return false;
    }
  }

  function savePreference(on) {
    try {
      localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off');
    } catch (e) {}
  }

  /* ---------------------------------------------
     Inicialização + delegação de eventos
     --------------------------------------------- */

  function init() {
    if (initialized) return;
    initialized = true;

    const btn = document.getElementById('sound');

    if (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (ambientOn) {
          stopAmbient();
          savePreference(false);
        } else {
          startAmbient();
          savePreference(true);
        }
      });
    }

    /* Ativação por primeiro gesto do usuário (política de autoplay) */
    const unlock = function () {
      ensureContext();
      resumeIfNeeded();
      if (readPreference() && !ambientOn) {
        startAmbient();
      }
      document.removeEventListener('pointerdown', unlock, true);
      document.removeEventListener('keydown', unlock, true);
    };

    document.addEventListener('pointerdown', unlock, true);
    document.addEventListener('keydown', unlock, true);

    syncButton();

    /* Delegar sons para elementos do jogo */
    document.addEventListener('click', function (e) {
      const target = e.target.closest('.answer, .primary, .secondary, .textbtn');
      if (!target) return;

      if (target.classList.contains('answer')) {
        /* Se já foi respondida, o game.js desabilita; então ele marca .correct ou .wrong */
        if (target.classList.contains('correct')) {
          playCorrect();
        } else if (target.classList.contains('wrong')) {
          playWrong();
        } else {
          playClick();
        }
      } else if (target.id === 'start' || target.id === 'again') {
        playClick();
        if (!ambientOn && readPreference()) startAmbient();
      } else {
        playClick();
      }
    }, true);

    /* Feedback do game.js: observar mudanças de classe nos .answers */
    const answersContainer = document.getElementById('answers');
    if (answersContainer) {
      const mo = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          if (m.target.classList && m.target.classList.contains('answer')) {
            if (m.attributeName === 'class') {
              if (m.target.classList.contains('correct')) {
                playCorrect();
              } else if (m.target.classList.contains('wrong')) {
                playWrong();
              }
            }
          }
        });
      });

      mo.observe(answersContainer, {
        attributes: true,
        attributeFilter: ['class'],
        subtree: true
      });
    }

    /* Tela final */
    const finishSection = document.getElementById('finish');
    if (finishSection) {
      const moFinish = new MutationObserver(function () {
        if (finishSection.classList.contains('active')) {
          playFinish();
        }
      });
      moFinish.observe(finishSection, { attributes: true, attributeFilter: ['class'] });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Expor API opcional para o game.js chamar diretamente */
  window.TapeRupiAudio = {
    click: playClick,
    correct: playCorrect,
    wrong: playWrong,
    finish: playFinish,
    startAmbient: startAmbient,
    stopAmbient: stopAmbient
  };

})();
