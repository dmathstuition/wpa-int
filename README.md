# ➕ Math Quest — Gamified Addition Missions

A colourful, high-energy web lesson built for a **Year 6 learner with ADHD**
preparing for **SATs**. Each week is its own "mission" (a mini-game lesson of
about an hour). Results are logged to a Google Sheet via Apps Script so you can
rate performance and report progress to *madam* each week.

**Live structure:** one site, one button per week. This week's mission is Week 1
(*Addition Powers*). Next week you add Week 2 on the **same site** and flip it on.

---

## 🏠 Start here: `index.html`

`index.html` (the site root) is the **master front door**. It has one big card
per area, so a learner (or you) can pick where to go:

| Card | Goes to |
|------|---------|
| 🔢 **Number Foundations** | `foundations/index.html` — counting 1–10 |
| ➕ **Maths Missions** | `maths.html` — weekly maths, plus Factors & Multiples and Times Tables |
| 🎯 **SATs Maths** | `sats.html` — SAT questions + 30-minute CBT test |
| 🕵️ **Data Detectives** | `data.html` — Year 4 quantitative vs qualitative data |
| 📚 **English — Grammar Quest** | `english/index.html` |
| 🔬 **Science Lab** | `science/index.html` — practicals (Electricity) |
| 🐝 **Spelling Games** | `games/index.html` |

Send the learner the **site root** as the starting link. Every hub has a 🏠 Home
chip back to it.

## ✒️ 11+ Punctuation Test (`english/punctuation-test.html`)

A 50-question, 50-minute computer-based test, linked from the English hub. It
covers apostrophes, commas, direct and reported speech, capitals and end marks,
colons and semicolons, and parenthesis, dashes, hyphens and ellipsis. There are
five sections in GL-style formats: **A** spot the mistake (A–D or N), **B**
which sentence is correct, **C** fill the gap, **D** purpose and meaning,
**E** punctuation detective.

- Question grid with flags, Back/Next, confirm on submit, warnings at 10 and 5 minutes, and auto-submit at 0
- Answers save as the learner goes; an unfinished test can be **resumed** after a reload (the clock keeps running)
- Questions are shuffled within each section and options are shuffled on every attempt
- The report shows the score and grade band, a skills breakdown with a suggested focus, and a review of every question with explanations
- Logs to the **English** tab, including per-skill scores and the numbers of the questions missed

## 🕵️ Data Detectives (Year 4 — quantitative vs qualitative data)

`data.html` teaches the difference between the two kinds of data through two
characters the learner meets first: 🤖 **Quanti** (QUANTity → numbers we count
or measure) and 🦜 **Quali** (QUALity → describing words). Seven steps, each
earning a badge:

1. **Discover**: sort clues about Max the dog *before* the rule is given, then count vs measure, then "numbers that are really names" (shirt 10, bus 42)
2. **Class Survey Lab** (practical): predict the data type, interview 12 children, tally their answers, watch the bar chart grow, then answer questions, including "can we add up apple + banana?"
3. **Sort Rush**: 60-second speed-sorting game with streak bonuses, best score saved, and a list of missed cards to review
4. **Odd One Out**
5. **Question Factory**: choose the question that collects number data or word data
6. **My Own Survey** (real-life practical): the learner writes a question, asks real people, and the app tallies and charts the answers. It only accepts numbers for a quantitative question.
7. **Mastery Check**: 10 questions, one try each

A 45-minute tutor session plan is built into the page (under the missions).
Every activity logs to the **Maths** tab ("Data Detectives — …").

## 🔬 Science Lab (practicals)

`science/index.html` lists the practicals; **Electricity** (`science/electricity.html`)
is live, matched to the Year 6 "Electricity" curriculum. Learners build real
series circuits on screen by tapping parts (cell, bulb, buzzer, motor, switch,
wire) into gaps, then follow the scientific method — **aim → predict → test →
record → conclude**:

1. **Light It Up!** — complete circuits and switches
2. **More Cells, More Power?** — fair test: cells vs brightness (results table + bar graph; too many cells blows the bulb)
3. **Share the Energy** — more bulbs → each one dimmer
4. **Conductor or Insulator?** — predict, then test 10 materials
5. **Circuit Symbols** — recognised KS2 symbols
6. **Fault Finder** — explain why circuits don't work
7. **Free Lab** and a **Lab Quiz**

Results log to a **Science** tab in the tutor's sheet, including the learner's
predictions and recorded readings (in the last column). Add more practicals by
adding a row to `PRACTICALS` in `science/index.html`.

## 🔢 Number Foundations (counting 1–10, with a finger whiteboard)

`foundations/index.html` is a foundation module for a **special learner
(speech delay + ADHD)** — audio-first, very visual, big buttons, cartoon guide
(**Bobo the Bear** 🐻), and heavy repetition. It dwells on **one number at a
time**, each with its own colour and themed cartoons (1 = ☀️ sun, 2 = 🦆 ducks,
3 = 🍎 apples …). Every number runs four short repetition steps:

1. **Meet** — a huge animated digit + word; the game *says* the number and pops
   the objects in one at a time, counting aloud.
2. **Count** — tap each cartoon; it counts out loud (one-to-one correspondence).
3. **Find it** — “Tap the number 3!” — repeated **number identification** (the
   core skill), with a gentle hint after a wrong tap.
4. **Write it** — an **interactive whiteboard**: trace the number with a finger
   (touch/stylus/mouse) over a dashed guide, then ✨ Done. *Hear it* and *Clear*
   buttons; always encouraging, never blocking.

A **Number Map** lets him jump to any number; finished numbers earn a ⭐ that
persists on the device. Sized for a ~40-minute session. Results log to their own
**“Numbers”** Sheet tab (subject `Numbers`, e.g. *Number 3 — Counting 1 to 10*),
so *madam* can see which numbers were practised and whether he identified each
first try. Text-to-speech uses the device's built-in voice (no files); if a
device has no voice, the visuals and whiteboard still work.

---

## 🗂️ What's in here

```
index.html            ← the hub: name gate, week buttons, progress chart
config.js             ← paste your Apps Script URL here (ONE place)
assets/style.css      ← shared colourful theme + animations
assets/tracker.js     ← XP, sounds, confetti, and result logging
weeks/week1.html      ← Week 1 lesson (the template for every future week)
apps-script/Code.gs   ← Google Apps Script backend (logs to a Sheet)
```

**Simple architecture on purpose:** plain HTML + CSS + vanilla JavaScript.
No build step, no npm, no framework to install — just open the files or host
them anywhere (GitHub Pages works great).

---

## ▶️ Try it locally

Just open `index.html` in a browser. Everything runs client-side. (Sounds and
confetti work offline; results save to the device until you connect Apps Script.)

To serve it like the real site:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## 🌐 Host it (free) with GitHub Pages

1. Push this repo to GitHub (this branch, or merge to `main`).
2. Repo **Settings ▸ Pages ▸ Build and deployment**.
3. Source: **Deploy from a branch**, pick your branch, folder **/(root)**, Save.
4. Your site appears at `https://<user>.github.io/<repo>/`.

Send that one link to the learner every week — the buttons update in place.

---

## 🔗 Connect Google Apps Script (measure results & progress)

This is what lets you rate the learner and report to *madam*.

1. Create a new **Google Sheet** (any name).
2. **Extensions ▸ Apps Script**. Delete the sample code.
3. Paste the contents of **`apps-script/Code.gs`** and click **Save**.
4. **Deploy ▸ New deployment ▸** select type **Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Click **Deploy**, authorise when asked, then **copy the Web app URL**
     (ends in `/exec`).
5. Open **`config.js`** and paste it in:

   ```js
   APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfy...../exec",
   TUTOR_NAME: "Your Name",
   ```
6. Re-host / refresh. From now on every completed mission adds a row to your
   Sheet, and the hub shows the learner's progress chart across weeks.

> Changed `Code.gs` later? In Apps Script do **Manage deployments ▸ edit ✏️ ▸
> Version: New version ▸ Deploy** so the URL keeps working.

### What lands in the Sheet (per attempt)

`Timestamp · School · Student · Week · Week Title · Accuracy % · Correct ·
Total · Stars · Rating · XP · Best Streak · Minutes · Tutor · Stage Breakdown`

The **Rating** column (Legendary / Excellent / Good / Getting there / Keep
practising) and **Stars** are your ready-made performance rating for the weekly
report to *madam*. Sort or filter by `Student` and `Week` to summarise.

---

## 📚 Grammar Quest (English) — same site, second subject

There are now **two subjects** on the one site, sharing the same theme, XP,
Apps Script and login:

- **Maths** — `index.html` (Addition Missions). Link to English is in the header.
- **English** — `english/index.html` (Grammar Quest). Link back to Maths in its header.

**English Week 1 — Nouns, Verbs & Adjectives** (`english/week1.html`) is a
story-led adventure through the *Land of Words* with Professor Hoot 🦉. It is
built around **self-discovery** (the learner taps and guesses *before* the rule
is revealed), a **teacher-guided** voice, and **an exercise straight after every
concept**:

| Gem | Concepts taught (each followed by exercises) |
|-----|----------------------------------------------|
| 🏷️ Naming Gem | Nouns → common, proper, abstract, collective |
| ⚡ Action Gem | Verbs → action verbs, being verbs |
| 🎨 Colour Gem | Adjectives → describing size/colour/number/feeling |
| 👑 Word Wizard | Boss: label each word's part of speech |

Exercises are **tap-the-word** (tap all the nouns/verbs/adjectives in a
sentence) and **multiple choice**. Wrong answers give a hint and a retry; only
the first try is scored.

**English Week 2 — Adverbs & Pronouns** (`english/week2.html`) follows the same
story-led, self-discovery pattern (now with the clickable stage map + saved
progress too):

| Gem | Concepts taught (each followed by exercises) |
|-----|----------------------------------------------|
| 🏃 Motion Gem | Adverbs → manner (how), time (when), place (where) |
| 👥 Stand-In Gem | Personal pronouns (I, you, he, she, it, we, they…) |
| 🔑 Ownership Gem | Possessive pronouns (mine, yours, his, hers, ours, theirs) |
| 🔗 Linking Gem | Relative pronouns (who, which, that, whose) |
| 👑 Word Wizard | Boss: label each word (adverb / which kind of pronoun) |

Week 3 completes the plan with prepositions, determiners & conjunctions.

### Results are split by subject (tabs)

The Apps Script now files each subject on its **own tab** in your Sheet:
English results land on an **“English”** tab, Maths stays on **“Results”**. Each
tab has the same columns, so *madam’s* report per subject is one clean tab.
**Re-deploy `Code.gs`** (Manage deployments ▸ edit ▸ New version) after updating
it so the tab-routing takes effect — your existing Maths data is untouched.

## 🐝 Spelling Zone (word games)

A third area — `games/index.html` — is **not tied to any week**; it's an
always-available set of word games to build exam spelling. Reach it from the
**🐝 Games** link in either subject hub. Every game **says the word out loud**
(browser text-to-speech) and shows its **meaning as a hint**, so the learner
practises real spelling-bee skills:

- **🐝 Spelling Bee** — hears the word + meaning (with *Hear again / Slower /
  In a sentence* buttons), then types the spelling; animated letter feedback,
  and the correct spelling is revealed after two misses for learning.
- **🔀 Unscramble** — the letters are jumbled; tap them into the right order.
- **🧩 Missing Letters** — some letters are hidden; type them into the gaps.

Each game plays a **fresh round** (10 words, pickable level: Warm-up / Medium /
Challenge / Mixed) so it's replayable every week. The typing box has
autocorrect/spellcheck **off** so it can't give the answer away.

**Word bank:** `assets/words.js` holds ~48 Year 5/6 SATs statutory spellings
with a meaning and an example sentence each. **Add words any week** by appending
`{ w, hint, sentence, level }` entries — all three games use the same bank.

**Reporting:** results log to their own **“Spelling”** Sheet tab (subject
`Spelling`), with the game + level in the title (e.g. *Spelling Bee (Medium)*),
so *madam* sees spelling practice separately. (Re-deploy `Code.gs` once, as with
the other subject tabs.)

> Text-to-speech uses the device's built-in voices (no files, works offline).
> If a device has no voice available, the game briefly flashes the word instead
> so it still works.

## 📝 Timed take-home assignments (per topic)

Every live topic has a **20-minute timed assignment** the learner can do on
their own at home to practise what was taught. On each hub, the week card has a
**📝 20-min Assignment** button (it opens the lesson with `?mode=assignment`).

- **No teaching/story phase** — straight into practice questions that cover all
  of that topic's skills (mixed and shuffled fresh each time).
- A **countdown timer** sits in the top bar (turns red and pulses in the last
  2 minutes); when it hits `0:00` the assignment auto-finishes.
- Only the **first try** is scored; a 💡 Hint and a retry are available so it
  stays practice, not a trap.
- The report card shows **accuracy, correct/attempted, questions completed,
  stars and time used**, and the result is logged just like a lesson but with
  the title marked **“… — Assignment”** and an `assignment` flag — so *madam*
  can tell home practice apart from tutored sessions (same subject tab).

The whole thing is one shared engine (`assets/assignment.js`); each lesson just
supplies its question pool, so new weeks get assignments automatically.

## 🆕 Add next week's mission (do this each week)

1. **Copy** `weeks/week1.html` to `weeks/week2.html`.
2. Near the top of the `<script>` in the new file, change:

   ```js
   var WEEK_NUMBER = 2;
   var WEEK_TITLE  = "Subtraction Strikes"; // whatever this week teaches
   ```
3. Edit the **`buildStages()`** function to change the questions. Each stage is
   just a list — reuse the question builders (`qColumn`, `qWord`, `qMissing`,
   `qMental`, …) or write new ones. Stages, brain breaks, and the boss level all
   work automatically.
4. In **`index.html`**, find the `WEEKS` array and flip the week on:

   ```js
   { n: 2, title: "Subtraction Strikes", emoji: "➖",
     file: "weeks/week2.html", live: true,
     desc: "This week's mission — column subtraction & more." },
   ```
5. Re-host. The new button appears; older weeks stay playable for revision.

Nothing else changes — same site, same link, same Sheet.

---

## 👀 Learn-first: every stage teaches before it tests

Each teaching stage opens with a **"Watch how"** phase — **2 animated worked
examples** that step through the method one move at a time (columns light up,
carries drop in, hops and partitions build up on screen), with a friendly
narration line for each step. The learner can **⏭ Skip to answer** or **🔁 Watch
again**, then hits **"Now YOU try!"** to start practising. Seeing the method
demonstrated first — twice — before doing it is the core of how this helps the
learner make progress.

## 🧠 Why it's built for an ADHD learner

- **Model, then do:** animated examples show the method before every exercise.
- **Short bursts:** 7 quick stages, 4–6 questions each, never a wall of sums.
- **Instant feedback:** colour, sound and confetti the moment they answer.
- **Momentum, not punishment:** wrong answers give a hint and a retry; only the
  **first try** counts toward the score, so effort always moves forward.
- **Visible progress:** XP bar, levels, a 🔥 streak, and a stage map they watch
  fill up.
- **Movement breaks** built into the flow (star jumps, breathing, water).
- **One clear action per screen** — no clutter, big buttons, dyslexia-friendly
  rounded font.
- **Reduced-motion aware** for anyone who needs calmer visuals.

---

## 🎓 Week 1 content (Year 6 SATs — Addition)

**Every question is strictly a 3-to-6 digit column addition** — a deliberate
mix of *ordinary* (no carrying) and *carry-over* problems, building up by size.

| Stage | Focus |
|------|-------|
| 🔥 3-Digit Warm-Up | 3-digit addition, **no carrying** |
| 🏗️ 3-Digit Carry Masters | 3-digit addition **with carrying** |
| 🚀 4-Digit Mission | 4-digit, mix of ordinary + carry |
| 🏔️ 5-Digit Challenge | 5-digit, mix of ordinary + carry |
| 🌟 6-Digit Master | 6-digit, mix of ordinary + carry |
| 🧠 Word Problems | SATs stories that are 3–6 digit additions |
| 👑 Boss Level | Mixed 3–6 digit (incl. a 3-number sum), carry-heavy |

Numbers are **generated fresh each play** (no-carry sums are built so every
column stays ≤ 9; carry sums are guaranteed to carry), so it's re-playable for
revision. Each stage still opens with **2 animated worked examples** first.

## 🎓 Week 2 content (Year 6 SATs — Subtraction)

Same pattern as Week 1 — animated worked examples first, clickable stage map,
saved progress — built **simple → complex**, with **SATs-style reasoning at the
complex end**. The worked examples animate the **exchange/borrow** method (the
top digit is struck through and reduced, the current column receives a ten).

| Stage | Focus |
|------|-------|
| 🔥 3-Digit Warm-Up | 3-digit subtraction, **no exchanging** |
| 🏗️ 3-Digit Exchange | 3-digit subtraction **with exchanging (borrowing)** |
| 🚀 4-Digit Mission | 4-digit, mix of ordinary + exchange |
| 🏔️ 5-Digit Challenge | 5-digit, mix (incl. exchanging across zeros) |
| 🌟 6-Digit Master | 6-digit, mix of ordinary + exchange |
| 🧠 SATs Reasoning | Word problems (difference / how many left) + **missing number** (inverse operations) |
| 👑 Boss Level | Mixed 3–6 digit + missing number + a **multi-step** SATs question |

All calculations are strictly 3–6 digit subtractions; no-exchange pairs are
built so every top digit is big enough, exchange pairs are guaranteed to borrow.
