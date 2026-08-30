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
 */

var SHEET_NAME = "Results";

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
