(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory(
      require("./data/DB-008-bazi-foundation-advice.js"),
      require("./data/DB-009-ability-detail-advice.js"),
      require("./data/DB-010-ten-god-cross-advice.js"),
      require("./data/DB-011-exam-task-advice.js"),
      require("./data/DB-012-work-context-advice.js"),
      require("./data/DB-013-behavior-consistency-advice.js"),
      require("./data/DB-016-three-factor-cross-advice.js"),
      require("./data/DB-017-advanced-bazi-stage-advice.js")
    );
  } else {
    root.DetailedAdviceSelector = factory(
      root.BaziFoundationAdvice,
      root.AbilityDetailAdvice,
      root.TenGodCrossAdvice,
      root.ExamTaskAdvice,
      root.WorkContextAdvice,
      root.BehaviorConsistencyAdvice,
      root.ThreeFactorCrossAdvice,
      root.AdvancedBaziStageAdvice
    );
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (foundationDb, abilityDb, tenGodDb, examTaskDb, workContextDb, behaviorConsistencyDb, threeFactorDb, advancedBaziDb) {
  "use strict";

  const databases = [foundationDb, abilityDb, tenGodDb, examTaskDb, workContextDb, behaviorConsistencyDb, threeFactorDb, advancedBaziDb];
  const limits = {
    "DB-008": 2,
    "DB-009": 3,
    "DB-010": 2,
    "DB-011": 3,
    "DB-012": 3,
    "DB-013": 3,
    "DB-016": 3,
    "DB-017": 3
  };

  const stemElement = { 甲:"木",乙:"木",丙:"火",丁:"火",戊:"土",己:"土",庚:"金",辛:"金",壬:"水",癸:"水" };
  const branchElement = { 子:"水",丑:"土",寅:"木",卯:"木",辰:"土",巳:"火",午:"火",未:"土",申:"金",酉:"金",戌:"土",亥:"水" };
  const generates = { 木:"火",火:"土",土:"金",金:"水",水:"木" };
  const controls = { 木:"土",土:"水",水:"火",火:"金",金:"木" };
  const stemCombines = ["甲己","乙庚","丙辛","丁壬","戊癸"];
  const branchCombines = ["子丑","寅亥","卯戌","辰酉","巳申","午未"];
  const branchClashes = ["子午","丑未","寅申","卯酉","辰戌","巳亥"];
  const branchHarms = ["子未","丑午","寅巳","卯辰","申亥","酉戌"];
  const branchPunishments = ["寅巳申","丑未戌","子卯","辰辰","午午","酉酉","亥亥"];

  function addAdvancedBaziTags(tags, bazi) {
    const dayMaster = bazi.elements.dayMaster;
    const resource = bazi.elements.resource;
    const output = generates[dayMaster];
    const wealth = controls[dayMaster];
    const officer = Object.keys(controls).find((element) => controls[element] === dayMaster);
    const favorable = bazi.elements.strength === "偏強"
      ? [output, wealth, officer]
      : [resource, dayMaster];
    const favorableNames = bazi.elements.strength === "偏強"
      ? ["output", "wealth", "officer"]
      : ["resource", "self"];
    favorableNames.forEach((name) => tags.add(`favorable:${name}`));

    const stems = bazi.pillars.map((pillar) => pillar.gan);
    const branches = bazi.pillars.map((pillar) => pillar.zhi);
    if (stemCombines.some((pair) => stems.includes(pair[0]) && stems.includes(pair[1]))) tags.add("stem-combine");
    if (branchCombines.some((pair) => branches.includes(pair[0]) && branches.includes(pair[1]))) tags.add("branch-combine");
    if (branchClashes.some((pair) => branches.includes(pair[0]) && branches.includes(pair[1]))) tags.add("branch-clash");
    if (branchHarms.some((pair) => branches.includes(pair[0]) && branches.includes(pair[1]))) tags.add("branch-harm");
    if (branchPunishments.some((group) => [...new Set(group)].every((branch) => branches.includes(branch)))) tags.add("branch-punishment");

    const year = new Date().getFullYear();
    const period = bazi.daYun.periods.find((item) => year >= item.startYear && year <= item.endYear && item.ganZhi);
    if (period?.ganZhi) {
      const elements = [stemElement[period.ganZhi[0]], branchElement[period.ganZhi[1]]].filter(Boolean);
      const favorableCount = elements.filter((element) => favorable.includes(element)).length;
      if (favorableCount === elements.length) tags.add("dayun:favorable");
      else if (favorableCount > 0) tags.add("dayun:mixed");
      else tags.add("dayun:challenging");
    }
  }

  function buildTags(bazi, matching, selfReport) {
    const tags = new Set([
      "all",
      `mode:${selfReport.examMode}`,
      `environment:${selfReport.environment}`,
      `top:${matching.top3[0].id}`
    ]);

    if (bazi.elements.strength === "偏強") tags.add("daymaster:strong");
    else if (bazi.elements.strength === "偏弱") tags.add("daymaster:weak");
    else tags.add("daymaster:balanced");
    tags.add(`season:${bazi.elements.season}`);

    Object.entries(matching.profile.elements).forEach(([element, value]) => {
      if (value >= 0.28) tags.add(`element:${element}:high`);
      if (value <= 0.12) tags.add(`element:${element}:low`);
    });

    const tenGodEntries = Object.entries(bazi.tenGodGroups);
    const tenGodTotal = tenGodEntries.reduce((sum, [, value]) => sum + value, 0) || 1;
    const tenGodMax = Math.max(...tenGodEntries.map(([, value]) => value), 0);
    tenGodEntries.forEach(([group, value]) => {
      const ratio = value / tenGodTotal;
      if (ratio >= 0.25 || value === tenGodMax) tags.add(`tengod:${group}:high`);
      if (ratio <= 0.1) tags.add(`tengod:${group}:low`);
    });

    Object.entries(matching.profile.traits).forEach(([trait, value]) => {
      if (value >= 0.72) tags.add(`trait:${trait}:high`);
      if (value <= 0.42) tags.add(`trait:${trait}:low`);
    });

    Object.entries(matching.profile.modes).forEach(([mode, value]) => {
      if (value >= 0.72) tags.add(`mode:${mode}`);
    });
    (matching.profile.behavior?.tags || []).forEach((tag) => tags.add(tag));
    addAdvancedBaziTags(tags, bazi);
    return tags;
  }

  function matches(rule, tags) {
    if ((rule.all || []).some((tag) => !tags.has(tag))) return false;
    if (rule.any?.length && !rule.any.some((tag) => tags.has(tag))) return false;
    if ((rule.none || []).some((tag) => tags.has(tag))) return false;
    return true;
  }

  function rank(rule) {
    return (rule.all || []).length * 10 + (rule.any || []).length * 3;
  }

  function select(bazi, matching, selfReport) {
    const tags = buildTags(bazi, matching, selfReport);
    const groups = databases.map((database) => ({
      id: database.id,
      name: database.name,
      total: database.rules.length,
      selected: database.rules
        .filter((rule) => matches(rule, tags))
        .sort((a, b) => rank(b) - rank(a) || a.id.localeCompare(b.id))
        .slice(0, limits[database.id] || 2)
    }));

    return {
      tags: [...tags].sort(),
      groups,
      selectedCount: groups.reduce((sum, group) => sum + group.selected.length, 0),
      totalRules: groups.reduce((sum, group) => sum + group.total, 0)
    };
  }

  return { select, buildTags };
});
