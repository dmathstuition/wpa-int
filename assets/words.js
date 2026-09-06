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
    { w:"accident",   hint:"something unexpected that causes harm",       sentence:"He had an accident on his way home.", level:1 },
    { w:"actually",   hint:"in fact; really",                             sentence:"She actually knew the answer.", level:1 },
    { w:"although",   hint:"despite the fact that",                       sentence:"Although it was raining, we went outside.", level:1 },
    { w:"beginning",  hint:"the start of something",                      sentence:"We are at the beginning of the story.", level:1 },
    { w:"business",   hint:"work involving buying or selling",            sentence:"Her family owns a small business.", level:1 },
    { w:"calendar",   hint:"a chart showing days, weeks and months",      sentence:"I checked the calendar for the date.", level:1 },
    { w:"different",  hint:"not the same",                                sentence:"The two answers are different.", level:1 },
    { w:"difficult",  hint:"not easy to do or understand",                sentence:"The question was difficult.", level:1 },
    { w:"enough",     hint:"as much or as many as needed",                sentence:"We have enough food for everyone.", level:1 },
    { w:"exercise",   hint:"an activity done to improve fitness or skill", sentence:"I do exercise every morning.", level:1 },
    { w:"experience", hint:"knowledge gained by doing something",         sentence:"She has experience in teaching.", level:1 },
    { w:"favourite",  hint:"liked more than others",                      sentence:"Blue is my favourite colour.", level:1 },
    { w:"February",   hint:"the second month of the year",                sentence:"My birthday is in February.", level:1 },
    { w:"forward",    hint:"towards the front or ahead",                  sentence:"Please take one step forward.", level:1 },
    { w:"grammar",    hint:"the rules of a language",                     sentence:"We are learning English grammar.", level:1 },
    { w:"important",  hint:"having great value or significance",          sentence:"It is important to listen carefully.", level:1 },
    { w:"knowledge",  hint:"information and understanding",               sentence:"Reading can increase your knowledge.", level:1 },
    { w:"library",    hint:"a place where books can be borrowed",         sentence:"We went to the library after school.", level:1 },
    { w:"necessary",  hint:"needed or required",                          sentence:"Water is necessary for life.", level:1 },
    { w:"occasion",   hint:"a particular event or time",                  sentence:"It was a special occasion.", level:1 },
    { w:"opposite",   hint:"completely different or facing another way",  sentence:"Hot is the opposite of cold.", level:1 },
    { w:"possible",   hint:"able to happen or be done",                  sentence:"It is possible to finish today.", level:1 },
    { w:"probably",   hint:"very likely",                                sentence:"She will probably arrive soon.", level:1 },
    { w:"remember",   hint:"to keep something in your mind",              sentence:"Please remember to bring your book.", level:1 },
    { w:"separate",   hint:"apart or not together",                       sentence:"Keep the two groups separate.", level:1 },
    { w:"special",    hint:"different or important in a good way",        sentence:"Today is a special day.", level:1 },
    { w:"straight",   hint:"not curved or bent",                          sentence:"Draw a straight line.", level:1 },
    { w:"surprise",   hint:"something unexpected",                        sentence:"The party was a wonderful surprise.", level:1 },
    { w:"thought",    hint:"an idea or opinion in your mind",             sentence:"I thought about the question carefully.", level:1 },
    { w:"together",   hint:"with each other; in one group",               sentence:"We worked together on the project.", level:1 },

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
    { w:"accommodate", hint:"to provide enough space for someone or something", sentence:"The hotel can accommodate fifty guests.", level:2 },
    { w:"aggressive",  hint:"behaving in a forceful or angry way", sentence:"The dog became aggressive when it felt threatened.", level:2 },
    { w:"apparent",    hint:"easy to see or understand", sentence:"It was apparent that she was tired.", level:2 },
    { w:"available",   hint:"ready to be used or obtained", sentence:"The book is available in the library.", level:2 },
    { w:"awkward",     hint:"causing difficulty or embarrassment", sentence:"There was an awkward silence in the room.", level:2 },
    { w:"conscience",  hint:"the part of your mind that tells you right from wrong", sentence:"His conscience told him to tell the truth.", level:2 },
    { w:"convenience", hint:"something that makes life easier", sentence:"Online shopping is a great convenience.", level:2 },
    { w:"correspond",  hint:"to match or be similar to something", sentence:"The numbers correspond to the answers.", level:2 },
    { w:"curiosity",   hint:"a strong desire to know or learn something", sentence:"Her curiosity made her ask many questions.", level:2 },
    { w:"determined",  hint:"having made a firm decision to do something", sentence:"He was determined to win the competition.", level:2 },
    { w:"environment", hint:"the surroundings in which people, animals or plants live", sentence:"We should protect the environment.", level:2 },
    { w:"exaggerate",  hint:"to make something seem greater than it really is", sentence:"Don't exaggerate how difficult the task was.", level:2 },
    { w:"frequently",  hint:"often or many times", sentence:"She frequently visits her grandparents.", level:2 },
    { w:"guarantee",   hint:"a promise that something will happen or work", sentence:"The company will guarantee the quality of its products.", level:2 },
    { w:"immediately", hint:"at once; without delay", sentence:"Please come here immediately.", level:2 },
    { w:"interfere",   hint:"to get involved in something unnecessarily", sentence:"Please do not interfere with their conversation.", level:2 },
    { w:"marvellous",  hint:"extremely good or wonderful", sentence:"We had a marvellous time at the beach.", level:2 },
    { w:"mischievous", hint:"enjoying causing trouble in a playful way", sentence:"The mischievous boy hid his sister's shoes.", level:2 },
    { w:"opportunity", hint:"a good chance to do something", sentence:"She had an opportunity to travel abroad.", level:2 },
    { w:"persuade",    hint:"to convince someone to do something", sentence:"I tried to persuade him to join us.", level:2 },
    { w:"physical",    hint:"relating to the body rather than the mind", sentence:"Regular physical activity keeps you healthy.", level:2 },
    { w:"privilege",   hint:"a special advantage or benefit", sentence:"It was a privilege to meet the author.", level:2 },
    { w:"pronunciation", hint:"the way a word is spoken", sentence:"Her pronunciation of the word was excellent.", level:2 },
    { w:"restaurant",  hint:"a place where people pay to eat meals", sentence:"We had dinner at a new restaurant.", level:2 },
    { w:"sincerely",   hint:"in a genuine or honest way", sentence:"I sincerely hope you succeed.", level:2 },
    { w:"suggest",     hint:"to put forward an idea for consideration", sentence:"I suggest that we start early.", level:2 },
    { w:"temperature", hint:"a measure of how hot or cold something is", sentence:"The temperature dropped during the night.", level:2 },
    { w:"vegetable",   hint:"a plant or part of a plant eaten as food", sentence:"Carrots are my favourite vegetable.", level:2 },
    { w:"vehicle",     hint:"something used to transport people or goods", sentence:"The vehicle stopped at the traffic lights.", level:2 },
    { w:"yacht",       hint:"a large boat used for pleasure or travelling", sentence:"They sailed across the sea on a yacht.", level:2 },

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
    { w:"achievement",   hint:"something successfully completed or accomplished", sentence:"Winning the prize was a great achievement.", level:3 },
    { w:"apparent",      hint:"easy to notice or understand", sentence:"It became apparent that he was upset.", level:3 },
    { w:"appreciate",    hint:"to understand the value of something", sentence:"I really appreciate your help.", level:3 },
    { w:"awkward",       hint:"difficult or uncomfortable to deal with", sentence:"There was an awkward silence.", level:3 },
    { w:"category",      hint:"a group of things with similar features", sentence:"Which category does this animal belong to?", level:3 },
    { w:"communicate",   hint:"to share information or ideas", sentence:"We need to communicate clearly.", level:3 },
    { w:"competition",   hint:"an event where people compete against each other", sentence:"She entered the swimming competition.", level:3 },
    { w:"convenience",   hint:"something that makes life easier", sentence:"The shop is close for convenience.", level:3 },
    { w:"curiosity",     hint:"a strong desire to know or learn something", sentence:"His curiosity led him to ask many questions.", level:3 },
    { w:"desperate",     hint:"having a very strong need or desire", sentence:"They were desperate to find the missing dog.", level:3 },
    { w:"dictionary",    hint:"a book that gives meanings and spellings of words", sentence:"Look up the word in the dictionary.", level:3 },
    { w:"disappear",     hint:"to become impossible to see or find", sentence:"The clouds began to disappear.", level:3 },
    { w:"embarrassment", hint:"a feeling of shame or awkwardness", sentence:"He tried to hide his embarrassment.", level:3 },
    { w:"environment",   hint:"the surroundings where people, animals or plants live", sentence:"We must protect our environment.", level:3 },
    { w:"exaggerate",    hint:"to make something seem greater than it really is", sentence:"Try not to exaggerate the story.", level:3 },
    { w:"excellent",     hint:"extremely good", sentence:"She did an excellent job.", level:3 },
    { w:"existence",     hint:"the state of being real or alive", sentence:"Scientists searched for evidence of its existence.", level:3 },
    { w:"familiar",      hint:"well known because you have seen or experienced it before", sentence:"The song sounded familiar.", level:3 },
    { w:"foreign",       hint:"from another country", sentence:"She enjoys learning foreign languages.", level:3 },
    { w:"guarantee",     hint:"a promise that something will happen or work", sentence:"The company cannot guarantee success.", level:3 },
    { w:"immediately",   hint:"at once; without delay", sentence:"The teacher responded immediately.", level:3 },
    { w:"independent",   hint:"able to do things without help", sentence:"She is becoming more independent.", level:3 },
    { w:"interrupt",     hint:"to stop someone while they are speaking or doing something", sentence:"Please do not interrupt the speaker.", level:3 },
    { w:"knowledge",     hint:"information and understanding gained through learning", sentence:"Reading increases your knowledge.", level:3 },
    { w:"leisure",       hint:"free time when you are not working", sentence:"He enjoys reading during his leisure time.", level:3 },
    { w:"necessary",     hint:"needed; that you must have", sentence:"It is necessary to follow the instructions.", level:3 },
    { w:"opportunity",   hint:"a good chance to do something", sentence:"This is a wonderful opportunity to learn.", level:3 },
    { w:"persuade",      hint:"to convince someone to do something", sentence:"She tried to persuade him to study.", level:3 },
    { w:"restaurant",    hint:"a place where people pay to eat meals", sentence:"We visited a new restaurant yesterday.", level:3 },
    { w:"temperature",   hint:"a measure of how hot or cold something is", sentence:"The temperature fell during the night.", level:3 },
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
