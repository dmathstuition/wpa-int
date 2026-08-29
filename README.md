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

| Stage | Focus |
|------|-------|
| 🔥 Warm-Up Blast | Number bonds to 100 & 1000, fast mental addition |
| 🏗️ Column Crushers | Column addition (3–4 digits) with carrying |
| 🚀 Big Number Boost | 5-digit addition + "round and adjust" mental strategy |
| 🕵️ Missing Digit Detective | SATs-style missing-digit problems |
| 🧠 Reasoning Rangers | Word problems (money, measures, totals) |
| 👑 Boss Level | Mixed challenge of everything above |

Questions are **generated fresh each play**, so it's re-playable for revision.
