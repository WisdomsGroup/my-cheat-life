const assert = require("node:assert/strict");
const baziEngine = require("../bazi-engine.js");
const examMatcher = require("../exam-matcher.js");
const reminderSelector = require("../reminder-selector.js");

const databases = [
  require("../data/DB-004-emotion-pressure-reminders.js"),
  require("../data/DB-005-study-strategy-reminders.js"),
  require("../data/DB-006-exam-day-risk-reminders.js"),
  require("../data/DB-007-work-environment-reminders.js")
];

const expected = [
  ["DB-004", "情緒與壓力提醒庫", "EP-"],
  ["DB-005", "讀書策略提醒庫", "SS-"],
  ["DB-006", "考場風險提醒庫", "ER-"],
  ["DB-007", "職務環境適應提醒庫", "WE-"]
];

databases.forEach((database, index) => {
  const [id, name, prefix] = expected[index];
  assert.equal(database.id, id);
  assert.equal(database.name, name);
  assert.equal(database.reminders.length, 30);
  assert.equal(new Set(database.reminders.map((item) => item.id)).size, 30);
  assert.ok(database.reminders.every((item) => item.id.startsWith(prefix)));
  assert.ok(database.reminders.every((item) => item.triggers.length > 0));
  assert.ok(database.reminders.every((item) => item.text.length > 10));
});

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
const selfReport = {
  pressureResponse: "impulsive",
  examMode: "technical",
  environment: "technical"
};
const matching = examMatcher.match(bazi, selfReport);
const result = reminderSelector.select(bazi, matching, selfReport);

assert.equal(result.databases.length, 4);
assert.ok(result.databases.every((database) => database.selected.length > 0));
assert.ok(result.databases.every((database) => database.selected.length <= 3));

console.log("reminder database tests passed");
