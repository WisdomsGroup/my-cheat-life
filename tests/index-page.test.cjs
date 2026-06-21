const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const baziEngine = require("../bazi-engine.js");
const examMatcher = require("../exam-matcher.js");
const reminderSelector = require("../reminder-selector.js");
const detailedAdvice = require("../detailed-advice-selector.js");
const selfRules = require("../data/DB-003-self-report-matching.js");
const evidenceDb = require("../data/DB-015-real-behavior-evidence.js");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map((match) => match[1]);
const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1]);

assert.equal(scripts.length, 23);
scripts.forEach((file) => assert.ok(fs.existsSync(path.join(root, file)), `missing ${file}`));
inlineScripts.forEach((code) => assert.doesNotThrow(() => new Function(code)));

assert.equal(selfRules.behaviorQuestions.length, 60);
assert.equal(evidenceDb.questions.length, 30);
assert.match(html, /生辰匹配職能參考測算/);
assert.match(html, /進入測算/);
assert.match(html, /function enterAssessment\(\)/);
assert.match(html, /開始使用評估/);
assert.match(html, /const assessmentRounds = \[/);
assert.match(html, /共 \$\{assessmentRounds\.length\} 輪/);
assert.match(html, /建議職群參考 Top 3/);
assert.match(html, /class="shared-advice"/);
assert.match(html, /重新評估/);
assert.match(html, /<label for="birthHour">出生時<\/label>/);
assert.doesNotMatch(html, /birthMinute/);
assert.doesNotMatch(html, /id="daySect"/);
assert.doesNotMatch(html, /id="yunSect"/);
assert.match(html, /daySect: 1/);
assert.match(html, /yunSect: 1/);
assert.doesNotMatch(html, /<h3>1\. 曆法轉換/);
assert.doesNotMatch(html, /<h3>2\. 四柱/);
assert.doesNotMatch(html, />回到今日</);
assert.doesNotMatch(html, /<h3>4\. 五行旺衰試算/);
assert.doesNotMatch(html, /<h3>5\. 起運與大運/);
assert.doesNotMatch(html, /<h3>3\. 藏干與十神/);
assert.doesNotMatch(html, /子職能與實際任務 Top 5/);
assert.doesNotMatch(html, /資料庫與計算來源/);

const behaviors = {};
selfRules.behaviorQuestions.forEach((question) => {
  behaviors[question.id] = question.reverse ? -1 : 1;
});
const evidence = Object.fromEntries(evidenceDb.questions.map((question) => [question.id, 1]));
const selfReport = {
  pressureResponse: "stable",
  examMode: "balanced",
  environment: "flexible",
  behaviors,
  evidence,
  elapsedSeconds: 300
};
const activeSelfReport = {
  ...selfReport,
  activeDimensions: [
    "justiceOrientation",
    "conflictReadiness",
    "groupCompromise",
    "ambiguityTolerance",
    "empathyBoundary",
    "detailDiscipline",
    "fieldReadiness",
    "publicAccountability",
    "technicalCuriosity",
    "stakeholderBalance"
  ]
};
const bazi = baziEngine.calculate({
  calendarType: "solar",
  year: 1986,
  month: 5,
  day: 29,
  hour: 20,
  minute: 5,
  gender: "male",
  isLeapMonth: false,
  daySect: 2,
  yunSect: 2,
  timezone: "Asia/Taipei"
});
const matching = examMatcher.match(bazi, selfReport);
const reminders = reminderSelector.select(bazi, matching, selfReport);
const advice = detailedAdvice.select(bazi, matching, selfReport);
const activeMatching = examMatcher.match(bazi, activeSelfReport);

assert.equal(matching.top3.length, 3);
assert.equal(matching.topSubroles.length, 5);
assert.equal(reminders.databases.length, 4);
assert.equal(advice.totalRules, 163);
assert.ok(advice.selectedCount > 0);
assert.ok(["良好", "需要保留", "資料不足"].includes(matching.profile.behavior.quality.level));
assert.equal(activeMatching.profile.behavior.answers.length, 10);

console.log("index page integration tests passed");
