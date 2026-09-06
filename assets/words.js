/* ============================================================
   WHYTE PYRAMID ACADEMY — SPELLING WORD BANK + SPEECH HELPERS
   Shared by every game in /games. Add new words any week by
   editing the WORDS list below (keep w / hint / sentence / level).
   level: 1 = warm-up, 2 = medium (Y5/6), 3 = challenge (Y5/6).
   British spellings (UK SATs).
   ============================================================ */
(function () {

  var WORDS = [
    /* ---- Level 1: warm-up ---- */
    { w:"address",   hint:"where someone lives",                 sentence:"Please write your address on the form.", level:1 },
    { w:"answer",    hint:"a reply to a question",               sentence:"She knew the answer straight away.", level:1 },
    { w:"believe",   hint:"to think something is true",          sentence:"I believe you can win.", level:1 },
    { w:"beautiful", hint:"very pretty",                         sentence:"The sunset was beautiful.", level:1 },
    { w:"calendar",  hint:"a chart of the days and months",      sentence:"He marked his birthday on the calendar.", level:1 },
    { w:"caught",    hint:"past tense of 'catch'",               sentence:"She caught the ball.", level:1 },
    { w:"centre",    hint:"the middle",                          sentence:"Stand in the centre of the room.", level:1 },
    { w:"decide",    hint:"to make up your mind",                sentence:"You must decide which book to read.", level:1 },
    { w:"famous",    hint:"known by many people",                sentence:"The actor is very famous.", level:1 },
    { w:"favourite", hint:"the one you like best",               sentence:"Blue is my favourite colour.", level:1 },
    { w:"height",    hint:"how tall something is",               sentence:"Measure the height of the wall.", level:1 },
    { w:"history",   hint:"the study of the past",               sentence:"We learned about Roman history.", level:1 },
    { w:"important", hint:"mattering a lot",                     sentence:"Sleep is important for your health.", level:1 },
    { w:"weird",     hint:"strange or unusual",                  sentence:"That was a weird dream.", level:1 },

    /* ---- Level 2: medium (Year 5/6) ---- */
    { w:"necessary", hint:"needed; that you must have",          sentence:"It is necessary to wear a seatbelt.", level:2 },
    { w:"separate",  hint:"to keep apart",                       sentence:"Please separate the rubbish for recycling.", level:2 },
    { w:"definitely",hint:"for certain, without doubt",          sentence:"I will definitely come to your party.", level:2 },
    { w:"embarrass", hint:"to make someone feel shy or awkward", sentence:"Don't embarrass me in front of my friends.", level:2 },
    { w:"occasion",  hint:"a special event or time",             sentence:"We wore smart clothes for the occasion.", level:2 },
    { w:"recommend", hint:"to suggest that something is good",   sentence:"I recommend this book to everyone.", level:2 },
    { w:"rhythm",    hint:"a regular beat in music",             sentence:"Clap along to the rhythm of the song.", level:2 },
    { w:"government",hint:"the group that runs a country",       sentence:"The government made a new law.", level:2 },
    { w:"experience",hint:"something you have done or felt",     sentence:"Riding a camel was a new experience.", level:2 },
    { w:"neighbour", hint:"someone who lives near you",          sentence:"Our neighbour has a friendly dog.", level:2 },
    { w:"ancient",   hint:"very old",                            sentence:"They discovered ancient ruins.", level:2 },
    { w:"average",   hint:"the middle or usual amount",          sentence:"The average score was seven.", level:2 },
    { w:"bargain",   hint:"something bought cheaply",            sentence:"The coat was a real bargain.", level:2 },
    { w:"community", hint:"a group of people living together",   sentence:"Our community held a summer fair.", level:2 },
    { w:"dictionary",hint:"a book of word meanings",             sentence:"Look the word up in the dictionary.", level:2 },
    { w:"environment",hint:"the natural world around us",        sentence:"We must protect the environment.", level:2 },
    { w:"February",  hint:"the second month of the year",        sentence:"Her birthday is in February.", level:2 },
    { w:"guarantee", hint:"a promise that something will work",  sentence:"The toy has a one-year guarantee.", level:2 },

    /* ---- Level 3: challenge (Year 5/6 toughest) ---- */
    { w:"accommodate",  hint:"to have room for; to fit in",        sentence:"The hall can accommodate two hundred people.", level:3 },
    { w:"conscience",   hint:"the sense of right and wrong inside you", sentence:"His conscience told him to be honest.", level:3 },
    { w:"conscious",    hint:"awake and aware",                    sentence:"She was conscious after the fall.", level:3 },
    { w:"mischievous",  hint:"playfully naughty",                  sentence:"The mischievous puppy hid my shoe.", level:3 },
    { w:"pronunciation",hint:"the way a word is said",             sentence:"Practise the pronunciation of new words.", level:3 },
    { w:"parliament",   hint:"the group that makes a country's laws", sentence:"The new law was passed in parliament.", level:3 },
    { w:"questionnaire",hint:"a set of written questions",         sentence:"Please fill in the questionnaire.", level:3 },
    { w:"bruise",       hint:"a dark mark on the skin from a bump", sentence:"He got a bruise on his knee.", level:3 },
    { w:"yacht",        hint:"a large sailing boat",               sentence:"The yacht sailed across the bay.", level:3 },
    { w:"queue",        hint:"a line of people waiting",           sentence:"We joined the queue for tickets.", level:3 },
    { w:"vehicle",      hint:"a machine for carrying people, like a car", sentence:"An ambulance is an emergency vehicle.", level:3 },
    { w:"rhyme",        hint:"words that end with the same sound",  sentence:"'Cat' and 'hat' rhyme.", level:3 },
    { w:"vegetable",    hint:"a plant grown for food, like a carrot", sentence:"Eat at least one vegetable at dinner.", level:3 },
    { w:"disastrous",   hint:"very bad; causing great harm",       sentence:"The flood was disastrous for the town.", level:3 },
    { w:"exaggerate",   hint:"to make something sound bigger than it is", sentence:"Don't exaggerate how tall you are.", level:3 },
    { w:"twelfth",      hint:"coming after eleventh",              sentence:"December is the twelfth month.", level:3 }
  ];

  function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }

  var Spell = {
    words: WORDS,
    levelName: function(l){ return l===1?"Warm-up":l===2?"Medium":l===3?"Challenge":"Mixed"; },

    /* pick n words for a round; level 1/2/3 or "mix" */
    pickRound: function(level, n){
      var pool = WORDS.filter(function(w){ return level==="mix" ? true : w.level===level; });
      if(!pool.length) pool = WORDS;
      return shuffle(pool).slice(0, Math.min(n||10, pool.length));
    },

    supported: function(){ try { return typeof window!=="undefined" && "speechSynthesis" in window; } catch(e){ return false; } },

    getVoice: function(){
      try {
        var vs = window.speechSynthesis.getVoices() || [];
        return vs.find(function(v){ return /en[-_]GB/i.test(v.lang); })
            || vs.find(function(v){ return /^en/i.test(v.lang); })
            || vs[0] || null;
      } catch(e){ return null; }
    },

    /* speak text (word or sentence). rate<1 = slower. Safe if TTS missing. */
    speak: function(text, rate){
      try {
        if(!this.supported()) return false;
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(String(text));
        u.rate = rate || 0.9; u.pitch = 1; u.volume = 1; u.lang = "en-GB";
        var v = this.getVoice(); if(v) u.voice = v;
        window.speechSynthesis.speak(u);
        return true;
      } catch(e){ return false; }
    },

    stop: function(){ try { if(this.supported()) window.speechSynthesis.cancel(); } catch(e){} },

    norm: function(s){ return String(s||"").trim().toLowerCase().replace(/\s+/g," "); },

    /* scramble a word so it never equals the original */
    scramble: function(word){
      var letters = word.toLowerCase().split(""), out, tries=0;
      do { out = shuffle(letters).join(""); tries++; } while(tries<40 && out===word.toLowerCase());
      return out;
    },

    /* hide ~40% of letters (favouring vowels & doubles) -> array of {ch, hidden} */
    maskLetters: function(word){
      var w = word.toLowerCase(), n = w.length, want = Math.max(1, Math.round(n*0.4));
      var idx = [];
      for(var i=1;i<n-1;i++){ idx.push(i); }             // never hide first/last letter
      idx = shuffle(idx).slice(0, Math.min(want, idx.length));
      var hide = {}; idx.forEach(function(i){ hide[i]=true; });
      return w.split("").map(function(ch,i){ return { ch:ch, hidden: !!hide[i] }; });
    }
  };

  // Try to warm up voices (they load asynchronously in some browsers)
  try { if (Spell.supported()) { window.speechSynthesis.getVoices(); window.speechSynthesis.onvoiceschanged = function(){ window.speechSynthesis.getVoices(); }; } } catch(e){}

  window.WORDS = WORDS;
  window.Spell = Spell;
})();
