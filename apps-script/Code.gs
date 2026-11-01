/**
 * MATH QUEST — Google Apps Script backend
 * ---------------------------------------------------------------
 * Receives each week's result from the game and stores it in a
 * Google Sheet, one row per attempt. Also serves a student's
 * history back to the site (JSONP) so the hub can show progress.
 *
 * SETUP (see README.md for screenshots-style steps):
 *   1. Create a Google Sheet. Note its name of the first tab (default "Sheet1").
 *   2. Extensions ▸ Apps Script. Delete any code, paste THIS file.
 *   3. (Optional) set SHEET_NAME below if your tab isn't "Results".
 *   4. Deploy ▸ New deployment ▸ type "Web app".
 *        - Execute as:  Me
 *        - Who has access:  Anyone
 *   5. Copy the Web app URL (…/exec) into config.js -> APPS_SCRIPT_URL.
 *
 * Re-deploy (Manage deployments ▸ edit ▸ new version) whenever you
 * change this file.
 *
 * TEST REPORTS BY EMAIL (e.g. the Year 6 English Test)
 *   Finished tests send their full analysis here; it is emailed (with a
 *   PDF copy attached) to REPORT_EMAIL, or, if that is blank, to the
 *   Google account that owns this script. No address lives in the website.
 *   After pasting this file:
 *     a) Choose "testReportEmail" in the toolbar and press Run once.
 *        Google asks for permission to send email as you: allow it.
 *        You should receive a test email.
 *     b) Deploy ▸ Manage deployments ▸ ✏️ Edit ▸ Version: New version ▸ Deploy.
 *        (The web-app URL stays the same, so config.js needs no change.)
 */

var SHEET_NAME = "Results";

// Who receives test reports. Leave blank to use the Google account that
// owns this script (your own Gmail).
var REPORT_EMAIL = "";
// Safety limit: the most report emails sent per day.
var REPORT_DAILY_CAP = 60;

var HEADERS = [
  "Timestamp", "School", "Student", "Week", "Week Title", "Accuracy %",
  "Correct", "Total Questions", "Stars", "Rating", "XP",
  "Best Streak", "Minutes", "Tutor", "Stage Breakdown (JSON)"
];

/** Turn a subject into a safe tab name; blank -> the default Results tab. */
function tabFor_(subject) {
  var s = String(subject || "").trim();
  if (!s) return SHEET_NAME;
  return s.replace(/[\[\]\*\/\\\?:]/g, " ").substring(0, 90);  // sheet-name-safe
}

/** Return (creating if needed) a results sheet/tab with headers. */
function getSheet_(name) {
  name = name || SHEET_NAME;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
  }
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#6a11cb").setFontColor("#ffffff");
    sh.setFrozenRows(1);
  }
  return sh;
}

/** POST: the game sends a JSON result here. */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (data && data.type === "report") return json_(sendReport_(data));   // test report -> email
    var sh = getSheet_(tabFor_(data.subject));   // each subject -> its own tab
    sh.appendRow([
      data.ts || new Date().toISOString(),
      data.school || "",
      data.student || "",
      data.week || "",
      data.weekTitle || "",
      data.accuracy != null ? data.accuracy : "",
      data.correct != null ? data.correct : "",
      data.totalQuestions != null ? data.totalQuestions : "",
      data.stars != null ? data.stars : "",
      data.rating || "",
      data.xp != null ? data.xp : "",
      data.bestStreak != null ? data.bestStreak : "",
      data.minutes != null ? data.minutes : "",
      data.tutor || "",
      JSON.stringify(data.stages || {})
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/**
 * GET: serve a student's history back as JSONP (used by the hub's
 * progress chart). Example:
 *   ...exec?action=history&student=Sam&callback=cb
 */
function doGet(e) {
  var params = (e && e.parameter) || {};
  if (params.action === "history") {
    var rows = readHistory_(params.student || "", tabFor_(params.subject));
    return jsonp_(params.callback, rows);
  }
  // Friendly landing so you can confirm the URL works in a browser.
  return HtmlService.createHtmlOutput(
    "<h2>Math Quest backend is running ✅</h2><p>Results are being recorded.</p>"
  );
}

/** Read rows for one student (case-insensitive) into plain objects. */
function readHistory_(student, name) {
  var sh = getSheet_(name);
  var last = sh.getLastRow();
  if (last < 2) return [];
  var values = sh.getRange(2, 1, last - 1, HEADERS.length).getValues();
  var want = String(student || "").trim().toLowerCase();
  var out = [];
  for (var i = 0; i < values.length; i++) {
    var r = values[i];
    var name = String(r[2] || "");
    if (want && name.toLowerCase() !== want) continue;
    out.push({
      ts: r[0], school: r[1], student: name, week: r[3], weekTitle: r[4],
      accuracy: r[5], correct: r[6], totalQuestions: r[7],
      stars: r[8], rating: r[9], xp: r[10], bestStreak: r[11], minutes: r[12]
    });
  }
  return out;
}

/* =============================================================
   TEST REPORTS BY EMAIL
   ============================================================= */

/** Email a finished test's analysis (with a PDF copy) to the tutor. */
function sendReport_(d) {
  var props = PropertiesService.getScriptProperties();
  var day = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd");
  var key = "reportCount_" + day;
  var count = Number(props.getProperty(key) || 0);
  if (count >= REPORT_DAILY_CAP) return { ok: false, error: "Daily report limit reached" };
  props.setProperty(key, String(count + 1));

  var to = REPORT_EMAIL || Session.getEffectiveUser().getEmail();
  if (!to) return { ok: false, error: "No recipient email available" };

  var student = clip_(d.student, 60) || "Learner";
  var test = clip_(d.test, 80) || "Test";
  var html = reportHtml_(d);
  var subject = "📘 " + student + " — " + test + ": " + num_(d.score) + "/" + num_(d.total) + " (" + num_(d.pct) + "%)";
  var opts = { htmlBody: html, name: clip_(d.school, 60) || "Learning Portal" };
  try {
    var fileName = (student + " - " + test + ".pdf").replace(/[\\\/:*?"<>|]/g, "-");
    opts.attachments = [Utilities.newBlob(html, "text/html", "report.html").getAs("application/pdf").setName(fileName)];
  } catch (err) { /* the email still goes without the PDF */ }
  MailApp.sendEmail(to, subject, "Open this email in a mail app that shows HTML to see the full report.", opts);
  return { ok: true };
}

/** Build the report email. Every value from the website is escaped. */
function reportHtml_(d) {
  var C = { ink: "#1f2937", line: "#e5e7eb", soft: "#f3f4f6", navy: "#0f2a4a" };
  function col(p) { p = num_(p); return p >= 80 ? "#16a34a" : p >= 60 ? "#2563eb" : p >= 40 ? "#d97706" : "#dc2626"; }
  function bar(p) {
    p = Math.max(0, Math.min(100, num_(p)));
    return '<div style="background:#eef0f4;border-radius:6px;height:12px;width:160px;"><div style="background:' + col(p) +
      ';height:12px;border-radius:6px;width:' + p + '%;"></div></div>';
  }
  var th = 'style="border:1px solid ' + C.line + ';padding:7px 8px;background:' + C.soft + ';text-align:left;"';
  var td = 'style="border:1px solid ' + C.line + ';padding:7px 8px;vertical-align:top;"';
  var h = '<div style="font-family:Arial,Helvetica,sans-serif;color:' + C.ink + ';max-width:760px;">';
  h += '<div style="background:' + C.navy + ';color:#fff;border-radius:12px;padding:16px 18px;">' +
       '<div style="font-size:20px;font-weight:bold;">📘 ' + esc_(clip_(d.test, 80)) + ' — Performance Report</div>' +
       '<div style="margin-top:6px;">Learner: <b>' + esc_(clip_(d.student, 60)) + '</b></div>' +
       '<div>School: ' + esc_(clip_(d.school, 60)) + (d.tutor ? ' · Tutor: ' + esc_(clip_(d.tutor, 60)) : '') + '</div>' +
       '<div>Date: ' + esc_(clip_(d.dateText || d.date, 60)) + '</div></div>';
  h += '<table style="border-collapse:collapse;margin:14px 0;width:100%;"><tr>' +
       '<td ' + td + '>Score<br><b style="font-size:22px;">' + num_(d.score) + ' / ' + num_(d.total) + '</b></td>' +
       '<td ' + td + '>Percentage<br><b style="font-size:22px;">' + num_(d.pct) + '%</b></td>' +
       '<td ' + td + '>Time used<br><b style="font-size:22px;">' + num_(d.minutes) + ' min</b>' + (d.timedOut ? '<br><small>(time ran out)</small>' : '') + '</td>' +
       '<td ' + td + '>Answered<br><b style="font-size:22px;">' + num_(d.answered) + ' / ' + num_(d.total) + '</b></td></tr></table>';
  h += '<div style="background:' + col(d.pct) + ';color:#fff;border-radius:10px;padding:10px 14px;font-weight:bold;">' +
       esc_(clip_(d.band, 40)) + ': ' + esc_(clip_(d.bandNote, 200)) + '</div>';
  h += '<h3 style="margin:18px 0 6px;">Summary</h3><p>' + esc_(clip_(d.summary, 600)) + '</p>';

  h += '<h3 style="margin:18px 0 6px;">Section results</h3><table style="border-collapse:collapse;width:100%;font-size:14px;"><tr><th ' + th + '>Section</th><th ' + th + '>Score</th><th ' + th + '>Performance</th></tr>';
  arr_(d.sections, 10).forEach(function (s) {
    h += '<tr><td ' + td + '>' + esc_(clip_(s.name, 60)) + '</td><td ' + td + '>' + num_(s.c) + ' / ' + num_(s.n) + ' (' + num_(s.pct) + '%)</td><td ' + td + '>' + bar(s.pct) + '</td></tr>';
  });
  h += '</table>';

  h += '<h3 style="margin:18px 0 6px;">Skills analysis</h3><table style="border-collapse:collapse;width:100%;font-size:14px;"><tr><th ' + th + '>Skill</th><th ' + th + '>Section</th><th ' + th + '>Score</th><th ' + th + '>Performance</th></tr>';
  arr_(d.skills, 30).forEach(function (s) {
    h += '<tr><td ' + td + '>' + esc_(clip_(s.name, 60)) + '</td><td ' + td + '>' + esc_(clip_(s.section, 40)) + '</td><td ' + td + '>' + num_(s.c) + ' / ' + num_(s.n) + '</td><td ' + td + '>' + bar(s.pct) + '</td></tr>';
  });
  h += '</table>';

  var strengths = arr_(d.strengths, 30);
  h += '<h3 style="margin:18px 0 6px;">Strengths</h3>' + (strengths.length ? strengths.map(function (s) {
    return '<div style="border-left:5px solid #16a34a;background:#effaf3;padding:8px 12px;margin:6px 0;border-radius:6px;">✅ ' + esc_(clip_(s, 120)) + '</div>';
  }).join('') : '<p>None yet. Strengths appear when a skill reaches 80%.</p>');

  var targets = arr_(d.targets, 30);
  h += '<h3 style="margin:18px 0 6px;">Targets and next steps</h3>' + (targets.length ? targets.map(function (t) {
    return '<div style="border-left:5px solid #d97706;background:#fff8e8;padding:8px 12px;margin:6px 0;border-radius:6px;"><b>🎯 ' +
      esc_(clip_(t.skill, 60)) + ' (' + esc_(clip_(t.score, 12)) + ')</b><br>' + esc_(clip_(t.advice, 500)) + '</div>';
  }).join('') : '<p>No skill scored below 60%. Well done!</p>');

  var corr = arr_(d.corrections, 80);
  h += '<h3 style="margin:18px 0 6px;">Corrections (' + corr.length + ')</h3>';
  if (corr.length) {
    h += '<table style="border-collapse:collapse;width:100%;font-size:13px;"><tr><th ' + th + '>Q</th><th ' + th + '>Question</th><th ' + th + '>Learner\'s answer</th><th ' + th + '>Correct answer</th><th ' + th + '>Explanation</th></tr>';
    corr.forEach(function (c) {
      h += '<tr><td ' + td + '>' + num_(c.no) + '</td><td ' + td + '><small>' + esc_(clip_(c.section, 40)) + ' · ' + esc_(clip_(c.skill, 40)) + '</small><br>' + esc_(clip_(c.q, 400)) +
        '</td><td ' + td + '><b style="color:#b91c1c;">' + esc_(clip_(c.your, 120)) + '</b></td><td ' + td + '><b style="color:#15803d;">' + esc_(clip_(c.correct, 120)) +
        '</b></td><td ' + td + '>' + esc_(clip_(c.why, 400)) + '</td></tr>';
    });
    h += '</table>';
  } else {
    h += '<p>🎉 No corrections. Every question was answered correctly!</p>';
  }
  h += '<p style="font-size:12px;color:#6b7280;margin-top:20px;">Sent automatically by the learning portal when the test was submitted. A PDF copy is attached.</p></div>';
  return h;
}

/** Run this once from the editor to grant email permission and send yourself a sample report. */
function testReportEmail() {
  var r = sendReport_({
    test: "Report email test", student: "Sample Learner", school: "Learning Portal", dateText: new Date().toString(),
    score: 9, total: 10, pct: 90, minutes: 12, answered: 10, band: "Greater depth",
    bandNote: "If you can read this, test reports will reach your inbox.",
    summary: "This is a sample report sent from testReportEmail().",
    sections: [{ name: "Grammar", c: 9, n: 10, pct: 90 }], skills: [{ name: "Verb tenses", section: "Grammar", c: 9, n: 10, pct: 90 }],
    strengths: ["Verb tenses (9/10)"], targets: [],
    corrections: [{ no: 3, section: "Grammar", skill: "Verb tenses", q: "Write the past tense of swim.", your: "swimmed", correct: "swam", why: "swim is irregular: swim → swam." }]
  });
  Logger.log(r);
}

function esc_(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function clip_(s, n) { s = String(s == null ? "" : s); return s.length > n ? s.slice(0, n) + "…" : s; }
function num_(v) { var n = Number(v); return isFinite(n) ? Math.round(n * 10) / 10 : 0; }
function arr_(a, n) { return Array.isArray(a) ? a.slice(0, n) : []; }

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonp_(callback, obj) {
  var cb = (callback && /^[a-zA-Z0-9_]+$/.test(callback)) ? callback : "callback";
  return ContentService
    .createTextOutput(cb + "(" + JSON.stringify(obj) + ")")
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
