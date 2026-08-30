# ➕ Math Quest — Gamified Addition Missions

A colourful, high-energy web lesson built for a **Year 6 learner with ADHD**
preparing for **SATs**. Each week is its own "mission" (a mini-game lesson of
about an hour). Results are logged to a Google Sheet via Apps Script so you can
rate performance and report progress to *madam* each week.

**Live structure:** one site, one button per week. This week's mission is Week 1
(*Addition Powers*). Next week you add Week 2 on the **same site** and flip it on.

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
the first try is scored. The 3-week English plan continues with adverbs &
pronouns (Week 2) and prepositions, determiners & conjunctions (Week 3).

### Results are split by subject (tabs)

The Apps Script now files each subject on its **own tab** in your Sheet:
English results land on an **“English”** tab, Maths stays on **“Results”**. Each
tab has the same columns, so *madam’s* report per subject is one clean tab.
**Re-deploy `Code.gs`** (Manage deployments ▸ edit ▸ New version) after updating
it so the tab-routing takes effect — your existing Maths data is untouched.

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
