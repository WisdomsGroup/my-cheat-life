(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory(
      require("./data/DB-004-emotion-pressure-reminders.js"),
      require("./data/DB-005-study-strategy-reminders.js"),
      require("./data/DB-006-exam-day-risk-reminders.js"),
      require("./data/DB-007-work-environment-reminders.js")
    );
  } else {
    root.ReminderSelector = factory(
      root.EmotionPressureReminders,
      root.StudyStrategyReminders,
      root.ExamDayRiskReminders,
      root.WorkEnvironmentReminders
    );
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (emotionDb, studyDb, examDb, workDb) {
  "use strict";

  const databases = [emotionDb, studyDb, examDb, workDb];
  const severityWeight = { high: 3, watch: 2, info: 1 };

  function profileTags(matching, selfReport, bazi) {
    const tags = new Set([
      "all",
      `pressure:${selfReport.pressureResponse}`,
      `mode:${selfReport.examMode}`,
      `environment:${selfReport.environment}`,
      `top:${matching.top3[0].id}`
    ]);
    const traits = matching.profile.traits;
    (matching.profile.behavior?.tags || []).forEach((tag) => tags.add(tag));
    Object.entries(traits).forEach(([trait, value]) => {
      if (value >= 0.72) tags.add(`${trait}:high`);
      if (value <= 0.38) tags.add(`${trait}:low`);
    });
    if (bazi.elements.strength === "偏強") tags.add("daymaster:strong");
    else if (bazi.elements.strength === "偏弱") tags.add("daymaster:weak");
    else tags.add("daymaster:balanced");

    const top = matching.top3[0];
    if (top.traits.pressure >= 0.85) tags.add("pressure:high-role");
    if (top.environments.service >= 0.75) tags.add("service:high");
    if (top.environments.field >= 0.75) tags.add("field:high");
    if (top.id === "culture-diplomacy") tags.add("public-pressure");
    if (top.id === "justice-enforcement") {
      tags.add("public-pressure");
      tags.add("shift-work");
      tags.add("physical-test");
    }
    if (["culture-diplomacy", "justice-enforcement"].includes(top.id)) tags.add("oral-test");
    tags.add("time-risk");
    tags.add("multiple-subjects");
    tags.add("qualification-risk");
    return tags;
  }

  function rankReminder(reminder, tags) {
    const matches = reminder.triggers.filter((trigger) => tags.has(trigger)).length;
    if (!matches) return null;
    const specificity = reminder.triggers.includes("all") ? 0 : reminder.triggers.length;
    return matches * 10 + specificity * 2 + severityWeight[reminder.severity];
  }

  function selectFrom(database, tags, limit) {
    return database.reminders
      .map((reminder) => ({ reminder, score: rankReminder(reminder, tags) }))
      .filter((item) => item.score !== null)
      .sort((a, b) => b.score - a.score || a.reminder.id.localeCompare(b.reminder.id))
      .slice(0, limit)
      .map((item) => item.reminder);
  }

  function select(bazi, matching, selfReport, limitPerDatabase = 3) {
    const tags = profileTags(matching, selfReport, bazi);
    return {
      tags: [...tags].sort(),
      databases: databases.map((database) => ({
        id: database.id,
        name: database.name,
        version: database.version,
        total: database.reminders.length,
        selected: selectFrom(database, tags, limitPerDatabase)
      }))
    };
  }

  return { select };
});
