/* ============================================================
   WHYTE PYRAMID ACADEMY — TIMED ASSIGNMENT RUNNER (shared)
   A self-contained, 20-minute take-home practice engine used by
   every lesson page via ?mode=assignment. It reuses the shared
   theme + MQ helpers (sound, confetti, rating, logResult) and can
   render every question kind the lessons use:
     column {nums}          colsub {M,S}
     type   {prompt}        mc {q,options,answer,why}
     tap    {instr,target,tokens}
   Call:  Assignment.start({ subject, week, weekTitle, questions, minutes, accent })
   ============================================================ */
(function () {
  var A = {};
  function el(id){ return document.getElementById(id); }
  function commas(n){ return Number(n).toLocaleString("en-GB"); }
  function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t;} return a; }
  function pick(a){ return a[Math.floor(Math.random()*a.length)]; }

  /* ---- vertical layouts (self-contained copies) ---- */
  function verticalSum(nums){
    var strs=nums.map(String), width=Math.max.apply(null,strs.map(function(s){return s.length;}));
    var rows=strs.map(function(s,idx){
      var padded=s.padStart(width," ").split("");
      var op=idx>0?'<td class="op">+</td>':'<td></td>';
      return '<tr>'+op+padded.map(function(d){return '<td>'+(d===" "?"":d)+'</td>';}).join("")+'</tr>';
    }).join("");
    var line='<td></td>'+Array(width).fill('<td></td>').join("");
    return '<div class="colsum"><table>'+rows+'<tr class="line">'+line+'</tr></table></div>';
  }
  function verticalSub(M,S){
    var Ms=String(M),Ss=String(S),width=Math.max(Ms.length,Ss.length);
    function row(str,op){ var p=str.padStart(width," ").split("");
      return '<tr>'+(op?'<td class="op">−</td>':'<td></td>')+p.map(function(d){return '<td>'+(d===" "?"":d)+'</td>';}).join("")+'</tr>'; }
    var line='<td></td>'+Array(width).fill('<td></td>').join("");
    return '<div class="colsum"><table>'+row(Ms,false)+row(Ss,true)+'<tr class="line">'+line+'</tr></table></div>';
  }

  A.start = function(cfg){
    var minutes = cfg.minutes || 20;
    var accent = cfg.accent || "var(--purple)";
    var Q = shuffle(cfg.questions || []);
    var screen = el("screen");
    var map = el("stagemap"); if(map) map.innerHTML="";
    var student = MQ.getStudent() || "";

    var i=0, correct=0, answered=0, xp=0, streak=0, best=0, firstTry=true;
    var total=Q.length, startTime=0, endAt=0, timer=null;

    /* ---- HUD sync ---- */
    function hud(){
      var lvl=el("lvl"), xpEl=el("xp"), stEl=el("streak"), fill=el("xpFill");
      if(lvl) lvl.textContent = 1+Math.floor(xp/100);
      if(xpEl) xpEl.textContent = xp;
      if(stEl) stEl.textContent = streak;
      if(fill) fill.style.width = (xp%100)+"%";
    }
    function addXP(n){ xp+=n; hud(); }

    /* ---- floating timer ---- */
    function ensureTimer(){
      var t=el("asgTimer");
      if(!t){
        t=document.createElement("div"); t.id="asgTimer"; t.className="asg-timer";
        var h=document.querySelector(".hud");
        if(h) h.insertBefore(t, h.firstChild); else document.body.appendChild(t);
      }
      return t;
    }
    function paintTimer(){
      var left=Math.max(0, Math.round((endAt-Date.now())/1000));
      var m=Math.floor(left/60), s=left%60;
      var t=ensureTimer();
      t.innerHTML="⏱ <b>"+m+":"+String(s).padStart(2,"0")+"</b>";
      t.classList.toggle("warn", left<=120);
      return left;
    }
    function startTimer(){
      startTime=Date.now(); endAt=startTime+minutes*60*1000;
      paintTimer();
      timer=setInterval(function(){ var left=paintTimer(); if(left<=0){ clearInterval(timer); finish(true); } },1000);
    }
    function stopTimer(){ if(timer) clearInterval(timer); var t=el("asgTimer"); if(t) t.remove(); }

    /* ---- intro ---- */
    function intro(){
      screen.innerHTML=
        '<div class="card center" style="border-top:10px solid '+accent+';">'+
          '<div class="mascot">📝</div>'+
          '<h1>'+cfg.weekTitle+' — Assignment</h1>'+
          '<div class="speech">This is your <b>home practice</b>, '+(student||"explorer")+'! ⏱ You have <b>'+minutes+' minutes</b> to answer <b>'+total+' questions</b> on your own. Do your best — answer as many as you can before the timer runs out!</div>'+
          '<ul style="text-align:left;max-width:460px;margin:16px auto;font-weight:700;color:#4a4470;">'+
            '<li>Work carefully — only your <b>first try</b> is scored.</li>'+
            '<li>Stuck? Tap 💡 Hint, then have another go.</li>'+
            '<li>The clock keeps going, so keep moving! 🚀</li>'+
          '</ul>'+
          '<button class="btn big green" id="asgStart">▶ Start the 20-minute assignment</button>'+
        '</div>';
      el("asgStart").onclick=function(){ MQ.sound("level"); startTimer(); show(); };
    }

    /* ---- progress + card shell ---- */
    function shell(bodyHtml){
      var pct=Math.round((i)/total*100);
      screen.innerHTML=
        '<div class="card">'+
          '<div class="row" style="justify-content:space-between;">'+
            '<span class="chip" style="background:'+accent+';color:#fff;">📝 Assignment</span>'+
            '<span class="chip" style="background:#eee;color:#333;">Q '+(i+1)+' / '+total+'</span>'+
          '</div>'+
          '<div class="xpbar" style="background:#eee;margin:12px 0 4px;"><i style="width:'+pct+'%;"></i></div>'+
          bodyHtml+
          '<div class="feedback" id="fb"></div>'+
          '<div class="center" id="controls"></div>'+
        '</div>';
    }

    /* ---- render one question ---- */
    function show(){
      firstTry=true;
      var q=Q[i];
      A.debugCurrent = q;   // read-only introspection (used by tests)
      if(q.kind==="mc"){
        shell('<div class="center" style="margin:10px 0 4px;font-size:22px;font-weight:800;">'+q.q+'</div>'+
              '<div class="options" id="opts">'+q.options.map(function(o,ix){return '<button class="opt" data-i="'+ix+'">'+o+'</button>';}).join("")+'</div>');
        Array.prototype.forEach.call(document.querySelectorAll("#opts .opt"),function(btn){
          btn.onclick=function(){ answerMC(Number(btn.getAttribute("data-i")), q, btn); };
        });
        return;
      }
      if(q.kind==="tap"){
        var toks=q.tokens.map(function(t,ix){ return t.punct? '<span class="token punct">'+t.w+'</span>' : '<span class="token" data-i="'+ix+'">'+t.w+'</span>'; }).join("");
        shell('<div class="instr" style="margin-top:10px;">'+q.instr+'</div><div class="sentence" id="sent">'+toks+'</div>');
        var sel={};
        Array.prototype.forEach.call(document.querySelectorAll("#sent .token[data-i]"),function(t){
          t.onclick=function(){ var k=t.getAttribute("data-i"); if(sel[k]){delete sel[k];t.classList.remove("sel");}else{sel[k]=true;t.classList.add("sel");} MQ.sound("click"); };
        });
        controls('<button class="btn green" id="checkBtn">Check ✅</button> <button class="btn ghost" id="hintBtn">💡 Hint</button>');
        el("checkBtn").onclick=function(){ answerTap(q, sel); };
        el("hintBtn").onclick=function(){ hintTap(q, sel); };
        return;
      }
      // input based: column / colsub / type
      var body;
      if(q.kind==="column") body='<div class="demo-wrap">'+verticalSum(q.nums)+'</div>';
      else if(q.kind==="colsub") body='<div class="demo-wrap">'+verticalSub(q.M,q.S)+'</div>';
      else body='<div class="center" style="margin:8px 0 6px;">'+q.prompt+'</div>';
      shell(body+'<div class="center" style="margin-top:14px;"><input class="answer-input" id="ans" inputmode="numeric" autocomplete="off" placeholder="= ?"></div>');
      controls('<button class="btn green" id="checkBtn">Check ✅</button> <button class="btn ghost" id="hintBtn">💡 Hint</button>');
      var inp=el("ans"); inp.focus();
      el("checkBtn").onclick=function(){ answerInput(q, Number(inp.value)); };
      el("hintBtn").onclick=function(){ var f=el("fb"); f.className="feedback"; f.textContent="💡 "+(q.hint||"Work through it step by step."); };
      inp.addEventListener("keydown",function(e){ if(e.key==="Enter") el("checkBtn").click(); });
    }
    function controls(html){ el("controls").innerHTML=html; }

    /* ---- answer handlers ---- */
    function markCorrect(){
      MQ.sound("correct");
      if(firstTry){ correct++; streak++; best=Math.max(best,streak); var g=10+(streak>=3?5:0); addXP(g);
        var f=el("fb"); f.className="feedback good"; f.innerHTML=pick(["🎉 Correct!","🌟 Well done!","💥 Yes!","🔥 Nice!"])+" +"+g+" XP"+(streak>=3?" 🔥x"+streak:"");
        MQ.confetti(streak>=5?90:50);
      } else { addXP(4); var f2=el("fb"); f2.className="feedback good"; f2.innerHTML="✅ Correct! +4 XP"; }
      answered++;
      next();
    }
    function markWrong(feedbackHtml){
      MQ.sound("wrong");
      if(firstTry){ streak=0; hud(); }
      firstTry=false;
      var f=el("fb"); f.className="feedback bad"; f.innerHTML=feedbackHtml;
    }
    function answerInput(q,val){
      if(isNaN(val)){ var f=el("fb"); f.className="feedback"; f.textContent="Type a number first ✏️"; return; }
      if(val===q.answer){ var inp=el("ans"); if(inp) inp.disabled=true; markCorrect(); }
      else { markWrong("Not quite — "+(q.hint||"try again")+" 💡"); var inp=el("ans"); if(inp){ inp.value=""; inp.focus(); } }
    }
    function answerMC(ix,q,btn){
      if(ix===q.answer){ btn.classList.add("correct"); document.querySelectorAll("#opts .opt").forEach(function(b){b.disabled=true;});
        markCorrect();
        if(q.why){ var f=el("fb"); f.innerHTML+='<div class="reveal-box" style="margin-top:10px;">'+q.why+'</div>'; }
      } else { btn.classList.add("wrong"); btn.disabled=true; markWrong("Not quite — try another. 💡"); }
    }
    function tapSets(q,sel){
      var correctIdx={}; q.tokens.forEach(function(t,ix){ if(t[q.target] && !t.punct) correctIdx[ix]=true; });
      var chosen=Object.keys(sel), wanted=Object.keys(correctIdx);
      var wrongPicks=chosen.filter(function(k){return !correctIdx[k];});
      var missed=wanted.filter(function(k){return !sel[k];});
      return {correctIdx:correctIdx, wrongPicks:wrongPicks, missed:missed};
    }
    function answerTap(q,sel){
      var r=tapSets(q,sel);
      if(r.wrongPicks.length===0 && r.missed.length===0){
        document.querySelectorAll("#sent .token[data-i]").forEach(function(t){ var k=t.getAttribute("data-i"); t.style.pointerEvents="none"; if(r.correctIdx[k]) t.classList.add("correct"); });
        markCorrect();
      } else {
        r.wrongPicks.forEach(function(k){ var t=document.querySelector('#sent .token[data-i="'+k+'"]'); if(t){ t.classList.add("wrong"); setTimeout(function(){t.classList.remove("wrong");},700);} });
        var msg = r.wrongPicks.length && r.missed.length ? "Some are wrong and some are missing." : r.wrongPicks.length ? "One of your choices isn't right — un-tap it." : "You've missed "+r.missed.length+" — keep looking!";
        markWrong("Not quite — "+msg+" 💡");
      }
    }
    function hintTap(q,sel){
      var r=tapSets(q,sel);
      var still=Object.keys(r.correctIdx).filter(function(k){return !sel[k];});
      if(still.length){ var t=document.querySelector('#sent .token[data-i="'+still[0]+'"]'); if(t) t.classList.add("miss"); }
    }

    /* ---- advance ---- */
    function next(){
      controls('<button class="btn big green" id="nextBtn" style="margin-top:14px;">'+(i+1>=total?"Finish ▶":"Next ▶")+'</button>');
      var nb=el("nextBtn"); nb.focus();
      nb.onclick=function(){ MQ.sound("click"); i++; if(i>=total) finish(false); else show(); };
    }

    /* ---- results + log ---- */
    function finish(timedOut){
      stopTimer();
      var acc = answered? Math.round(correct/answered*100) : 0;
      var rt = MQ.rating(acc);
      var used = Math.max(1, Math.round((Date.now()-startTime)/60000));
      MQ.sound("win"); MQ.confetti(200);
      if(map) map.innerHTML="";
      screen.innerHTML=
        '<div class="card center">'+
          '<div class="mascot" style="font-size:78px;">'+rt.emoji+'</div>'+
          '<h1>'+(timedOut?"⏰ Time's up!":"Assignment Complete!")+'</h1>'+
          '<div class="speech">Great effort, '+(student||"explorer")+'! Here is your assignment report.</div>'+
          '<div class="row" style="margin:18px 0;gap:22px;">'+
            '<div><div class="big-num" style="font-size:52px;">'+acc+'%</div><div class="muted">Accuracy</div></div>'+
            '<div><div class="big-num" style="font-size:52px;">'+correct+'/'+answered+'</div><div class="muted">Correct</div></div>'+
            '<div><div class="big-num" style="font-size:52px;">'+answered+'/'+total+'</div><div class="muted">Attempted</div></div>'+
          '</div>'+
          '<p style="font-size:30px;font-weight:800;">'+"⭐".repeat(rt.stars)+"▫️".repeat(5-rt.stars)+'</p>'+
          '<p style="font-size:20px;font-weight:800;color:var(--purple);">Rating: '+rt.label+' · ⏱ '+used+' min</p>'+
          '<p class="muted" id="saveState">💾 Saving your result…</p>'+
          '<div class="row" style="margin-top:8px;">'+
            '<button class="btn green" id="retryBtn">🔁 Retry</button>'+
            '<a class="btn blue" href="'+(cfg.homeHref||"index.html")+'" style="text-decoration:none;">🏠 Home</a>'+
          '</div>'+
        '</div>';
      el("retryBtn").onclick=function(){ location.reload(); };

      var payload={
        student: student||"Unknown",
        subject: cfg.subject || undefined,
        week: cfg.week,
        weekTitle: cfg.weekTitle+" — Assignment",
        assignment: true,
        accuracy: acc, correct: correct, answered: answered, totalQuestions: total,
        xp: xp, bestStreak: best, stars: rt.stars, rating: rt.label, minutes: used,
        timedOut: !!timedOut,
        school:(window.MATHQUEST_CONFIG && window.MATHQUEST_CONFIG.ACADEMY_NAME)||"Whyte Pyramid Academy",
        tutor:(window.MATHQUEST_CONFIG && window.MATHQUEST_CONFIG.TUTOR_NAME)||""
      };
      MQ.logResult(payload).then(function(res){
        var s=el("saveState"); if(!s) return;
        if(res && res.ok) s.textContent="✅ Assignment saved — your tutor can see it!";
        else if(res && res.offline) s.textContent="📴 Saved on this device (tutor: add the Apps Script link to sync).";
        else s.textContent="⚠️ Couldn't reach the server, but your result is saved on this device.";
      });
    }

    intro();
  };

  window.Assignment = A;
})();
