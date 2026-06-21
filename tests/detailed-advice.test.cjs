const assert = require("node:assert/strict");
const baziEngine = require("../bazi-engine.js");
const examMatcher = require("../exam-matcher.js");
const detailedAdvice = require("../detailed-advice-selector.js");
const selfRules = require("../data/DB-003-self-report-matching.js");

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

const neutralBehaviors = Object.fromEntries(
  selfRules.behaviorQuestions.map((question) => [question.id, 0])
);
const justiceBehaviors = {
  ...neutralBehaviors,
  justiceOrientation: 2,
  conflictReadiness: 2,
  groupCompromise: -2,
  publicAccountability: 2
};
const baseReport = {
  pressureResponse: "stable",
  examMode: "balanced",
  environment: "flexible"
};

const neutralMatch = examMatcher.match(bazi, { ...baseReport, behaviors: neutralBehaviors });
const justiceMatch = examMatcher.match(bazi, { ...baseReport, behaviors: justiceBehaviors });
const advice = detailedAdvice.select(bazi, justiceMatch, { ...baseReport, behaviors: justiceBehaviors });

assert.equal(selfRules.behaviorQuestions.length, 60);
assert.equal(advice.totalRules, 163);
assert.ok(advice.selectedCount >= 5);
assert.ok(advice.tags.includes("behavior:justiceOrientation:high"));
assert.ok(advice.tags.includes("behavior:groupCompromise:low"));
assert.notDeepEqual(
  neutralMatch.all.map((role) => role.score),
  justiceMatch.all.map((role) => role.score)
);
assert.ok(advice.groups.every((group) => group.total > 0));
assert.ok(advice.groups.flatMap((group) => group.selected).every((item) =>
  item.title && item.basis && item.verify && item.action
));

const inconsistentBehaviors = { ...neutralBehaviors, justiceOrientation: 2, justiceOrientationB: 2 };
const inconsistentReport = { ...baseReport, behaviors: inconsistentBehaviors };
const inconsistentMatch = examMatcher.match(bazi, inconsistentReport);
const inconsistentAdvice = detailedAdvice.select(bazi, inconsistentMatch, inconsistentReport);
assert.ok(inconsistentMatch.profile.behavior.tags.includes("behavior:justiceOrientation:inconsistent"));
assert.equal(inconsistentMatch.profile.behavior.roleAdjustments["legal-audit"] || 0, 0);
assert.ok(inconsistentAdvice.groups
  .find((group) => group.id === "DB-013")
  .selected.some((item) => item.id === "BC-001"));

assert.equal(neutralMatch.profile.behavior.quality.level, "資料不足");
assert.equal(neutralMatch.topSubroles.length, 5);
assert.ok(neutralMatch.topSubroles.every((subrole) => subrole.strengths.length > 0));
assert.ok(neutralMatch.topSubroles.every((subrole) =>
  subrole.gaps.every((gap) => !subrole.strengths.includes(gap))
));

const mismatchEvidence = Object.fromEntries(
  require("../data/DB-015-real-behavior-evidence.js").questions.map((question) => [question.id, 0])
);
mismatchEvidence.evidenceFairness = -2;
const mismatchMatch = examMatcher.match(bazi, {
  ...baseReport,
  behaviors: { ...neutralBehaviors, justiceOrientation: 2, justiceOrientationB: -2 },
  evidence: mismatchEvidence
});
assert.ok(mismatchMatch.profile.behavior.tags.includes("behavior:justiceOrientation:evidence-mismatch"));

console.log("detailed advice tests passed");
