/* ============================================================
   MATH QUEST — TRACKER + GAME HELPERS  (shared by every page)
   - MQ.logResult(...)      -> sends a week's result to Apps Script
   - MQ.fetchHistory(...)   -> reads a student's past results (JSONP)
   - MQ.confetti(), MQ.sound(...), MQ.saveLocal(...)  helpers
   Depends on: config.js  (window.MATHQUEST_CONFIG)
   ============================================================ */
(function () {
  const CFG = window.MATHQUEST_CONFIG || {};
  const URL = (CFG.APPS_SCRIPT_URL || "").trim();

  const MQ = {};

  /* ---------- Local storage (offline backup + who is playing) ---------- */
  MQ.getStudent = function () {
    try { return localStorage.getItem("mq_student") || ""; } catch (e) { return ""; }
  };
  MQ.setStudent = function (name) {
    try { localStorage.setItem("mq_student", name); } catch (e) {}
  };
  MQ.saveLocal = function (key, obj) {
    try { localStorage.setItem("mq_" + key, JSON.stringify(obj)); } catch (e) {}
  };
  MQ.readLocal = function (key) {
    try { return JSON.parse(localStorage.getItem("mq_" + key) || "null"); } catch (e) { return null; }
  };
  MQ.readAllResults = function () {
    try { return JSON.parse(localStorage.getItem("mq_results") || "[]"); } catch (e) { return []; }
  };
  MQ.pushLocalResult = function (row) {
    const all = MQ.readAllResults();
    all.push(row);
    try { localStorage.setItem("mq_results", JSON.stringify(all)); } catch (e) {}
  };

  /* ---------- 5-star performance rating from accuracy ---------- */
  MQ.rating = function (accuracyPct) {
    const a = Number(accuracyPct) || 0;
    if (a >= 95) return { stars: 5, label: "Legendary", emoji: "🏆" };
    if (a >= 85) return { stars: 4, label: "Excellent", emoji: "🌟" };
    if (a >= 70) return { stars: 3, label: "Good", emoji: "👍" };
    if (a >= 50) return { stars: 2, label: "Getting there", emoji: "💪" };
    return { stars: 1, label: "Keep practising", emoji: "🌱" };
  };

  /* ---------- Send a result to Apps Script (fire-and-forget) ---------- */
  MQ.logResult = function (payload) {
    // Always keep a local copy so nothing is ever lost.
    const row = Object.assign({ ts: new Date().toISOString() }, payload);
    MQ.pushLocalResult(row);

    if (!URL) {
      console.info("[MathQuest] No APPS_SCRIPT_URL set — result saved locally only.");
      return Promise.resolve({ ok: false, offline: true });
    }
    // text/plain avoids a CORS pre-flight; no-cors = fire and forget.
    return fetch(URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(row)
    }).then(function () {
      return { ok: true };
    }).catch(function (err) {
      console.warn("[MathQuest] log failed, kept local copy:", err);
      return { ok: false, error: String(err) };
    });
  };

  /* ---------- Read a student's history via JSONP (for progress view) ----------
     subject (optional) picks the matching Sheet tab, e.g. "English".
     Omit it for the default (Maths) results tab. */
  MQ.fetchHistory = function (student, subject) {
    return new Promise(function (resolve) {
      if (!URL || !student) { resolve(MQ.readAllResults()); return; }
      const cb = "mqcb_" + Math.random().toString(36).slice(2);
      const timer = setTimeout(function () { cleanup(); resolve(MQ.readAllResults()); }, 8000);
      window[cb] = function (data) {
        clearTimeout(timer); cleanup();
        resolve(Array.isArray(data) ? data : MQ.readAllResults());
      };
      function cleanup() { try { delete window[cb]; } catch (e) {} if (s.parentNode) s.parentNode.removeChild(s); }
      const s = document.createElement("script");
      s.src = URL + "?action=history&student=" + encodeURIComponent(student) +
              (subject ? "&subject=" + encodeURIComponent(subject) : "") +
              "&callback=" + cb;
      s.onerror = function () { clearTimeout(timer); cleanup(); resolve(MQ.readAllResults()); };
      document.body.appendChild(s);
    });
  };

  /* ---------- Confetti (tiny self-contained canvas burst) ---------- */
  MQ.confetti = function (count) {
    let canvas = document.getElementById("confetti");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "confetti";
      document.body.appendChild(canvas);
    }
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const colors = ["#ff2d95","#ffd23f","#26de81","#4b7bec","#a55eea","#fd9644"];
    const N = count || 120;
    const parts = [];
    for (let i = 0; i < N; i++) {
      parts.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height * 0.3,
        r: 5 + Math.random() * 7,
        c: colors[(Math.random() * colors.length) | 0],
        vx: -2 + Math.random() * 4,
        vy: 2 + Math.random() * 4,
        rot: Math.random() * 6.28,
        vr: -0.2 + Math.random() * 0.4
      });
    }
    let frames = 0;
    (function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      parts.forEach(function (p) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.rot += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.c; ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
        ctx.restore();
      });
      frames++;
      if (frames < 160) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    })();
  };

  /* ---------- Simple WebAudio blips (no files needed) ---------- */
  let AC = null, soundOn = CFG.SOUND_DEFAULT_ON !== false;
  try { soundOn = JSON.parse(localStorage.getItem("mq_sound") ?? String(soundOn)); } catch (e) {}
  MQ.soundEnabled = function () { return soundOn; };
  MQ.toggleSound = function () {
    soundOn = !soundOn;
    try { localStorage.setItem("mq_sound", JSON.stringify(soundOn)); } catch (e) {}
    return soundOn;
  };
  function tone(freq, dur, type, when, gain) {
    if (!soundOn) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      const o = AC.createOscillator(), g = AC.createGain();
      o.type = type || "sine"; o.frequency.value = freq;
      const t = AC.currentTime + (when || 0);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(gain || 0.18, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(AC.destination);
      o.start(t); o.stop(t + dur + 0.02);
    } catch (e) {}
  }
  MQ.sound = function (kind) {
    if (kind === "correct") { tone(660, 0.12, "triangle", 0); tone(880, 0.16, "triangle", 0.1); }
    else if (kind === "wrong") { tone(200, 0.2, "sawtooth", 0, 0.12); }
    else if (kind === "level") { tone(523, 0.12, "square", 0); tone(659, 0.12, "square", 0.12); tone(784, 0.2, "square", 0.24); }
    else if (kind === "click") { tone(440, 0.05, "sine", 0, 0.1); }
    else if (kind === "win") { [523,587,659,784,1046].forEach((f,i)=>tone(f,0.18,"triangle",i*0.12)); }
  };

  window.MQ = MQ;
})();
