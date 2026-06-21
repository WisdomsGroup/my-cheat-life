const assert = require("node:assert/strict");
const baziEngine = require("../bazi-engine.js");
const examMatcher = require("../exam-matcher.js");
const roleDatabase = require("../data/DB-001-exam-role-competency.js");
const baziRules = require("../data/DB-002-bazi-interpretation-rules.js");
const selfRules = require("../data/DB-003-self-report-matching.js");

assert.equal(roleDatabase.id, "DB-001");
assert.equal(baziRules.id, "DB-002");
assert.equal(selfRules.id, "DB-003");
assert.ok(roleDatabase.roles.length >= 10);

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

const result = examMatcher.match(bazi, {
  pressureResponse: "stable",
  examMode: "technical",
  environment: "technical"
});

assert.equal(result.top3.length, 3);
assert.ok(result.top3[0].score >= result.top3[1].score);
assert.ok(["優勢不足", "略有優勢", "優勢普通", "頗具優勢", "明顯優勢"].includes(result.top3[0].fitLevel));
assert.ok(Object.values(result.top3[0].breakdownLevels).every((level) =>
  ["優勢不足", "略有優勢", "優勢普通", "頗具優勢", "明顯優勢"].includes(level)
));
assert.equal(examMatcher.abilityLevel(20), "優勢不足");
assert.equal(examMatcher.abilityLevel(21), "略有優勢");
assert.equal(examMatcher.abilityLevel(40), "略有優勢");
assert.equal(examMatcher.abilityLevel(41), "優勢普通");
assert.equal(examMatcher.abilityLevel(60), "優勢普通");
assert.equal(examMatcher.abilityLevel(61), "頗具優勢");
assert.equal(examMatcher.abilityLevel(80), "頗具優勢");
assert.equal(examMatcher.abilityLevel(81), "明顯優勢");
assert.ok(result.top3.every((role) => role.strengths.length > 0));
assert.deepEqual(result.databases, [
  "DB-001 國考職群職能矩陣",
  "DB-003 個人偏好與情緒校正規則"
]);

console.log("exam-matcher tests passed");
