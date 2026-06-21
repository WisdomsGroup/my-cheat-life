(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory(
      require("./data/DB-001-exam-role-competency.js"),
      require("./data/DB-003-self-report-matching.js"),
      require("./data/DB-014-subrole-task-matrix.js"),
      require("./data/DB-015-real-behavior-evidence.js"),
      require("./data/DB-018-response-quality-rules.js")
    );
  } else {
    root.ExamMatcher = factory(
      root.ExamRoleDatabase,
      root.SelfReportMatchingRules,
      root.SubroleTaskMatrix,
      root.RealBehaviorEvidence,
      root.ResponseQualityRules
    );
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (database, selfRules, subroleDb, evidenceDb, qualityDb) {
  "use strict";

  const ELEMENT_TRAITS = {
    木: { adaptability: 1, empathy: 0.8, expression: 0.45, analysis: 0.52, stamina: 0.6 },
    火: { expression: 1, execution: 0.85, pressure: 0.6, adaptability: 0.5, stamina: 0.5 },
    土: { stamina: 1, structure: 0.82, execution: 0.78, pressure: 0.75, detail: 0.58 },
    金: { structure: 1, detail: 1, analysis: 0.78, execution: 0.78, pressure: 0.7 },
    水: { analysis: 1, adaptability: 0.95, memory: 0.82, empathy: 0.48, expression: 0.52 }
  };
  const TEN_GOD_TRAITS = {
    印星: { memory: 1, analysis: 0.65, structure: 0.45 },
    官殺: { structure: 0.9, pressure: 1, execution: 0.72 },
    食傷: { expression: 1, adaptability: 0.72, analysis: 0.5 },
    財星: { execution: 0.9, detail: 0.65, pressure: 0.55 },
    比劫: { stamina: 0.9, pressure: 0.68, execution: 0.72 }
  };
  const MODE_BY_TEN_GOD = {
    印星: { law: 0.7, essay: 0.55, quantitative: 0.42, technical: 0.5 },
    官殺: { law: 1, essay: 0.62, quantitative: 0.45, technical: 0.52 },
    食傷: { law: 0.25, essay: 1, quantitative: 0.42, technical: 0.45 },
    財星: { law: 0.48, essay: 0.42, quantitative: 0.82, technical: 0.62 },
    比劫: { law: 0.45, essay: 0.5, quantitative: 0.55, technical: 0.55 }
  };
  function addWeighted(target, source, weight) {
    Object.entries(source).forEach(([key, value]) => {
      target[key] = (target[key] || 0) + value * weight;
    });
  }

  function normalize(values) {
    const max = Math.max(...Object.values(values), 1);
    return Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value / max]));
  }

  function clamp(value, min = 0, max = 1) {
    return Math.max(min, Math.min(max, value));
  }

  function compareMetric(actual, condition) {
    if (condition.op === ">=") return actual >= condition.value;
    if (condition.op === "<=") return actual <= condition.value;
    if (condition.op === ">") return actual > condition.value;
    if (condition.op === "<") return actual < condition.value;
    return actual === condition.value;
  }

  function matchesQualityEntry(metrics, entry) {
    if (entry.all) return entry.all.every((condition) => compareMetric(metrics[condition.metric], condition));
    return compareMetric(metrics[entry.metric], entry);
  }

  function buildBehaviorProfile(selfReport) {
    const responses = selfReport.behaviors || {};
    const evidenceResponses = selfReport.evidence || {};
    const activeDimensions = Array.isArray(selfReport.activeDimensions) && selfReport.activeDimensions.length
      ? new Set(selfReport.activeDimensions)
      : null;
    const traitAdjustments = {};
    const roleAdjustments = {};
    const tags = [];
    const answers = [];
    const dimensions = {};

    selfRules.behaviorQuestions.forEach((question) => {
      const raw = Number(responses[question.id] || 0);
      const value = clamp(raw, -2, 2);
      const dimension = question.dimension || question.id;
      const adjustedValue = question.reverse ? -value : value;
      if (!dimensions[dimension]) {
        dimensions[dimension] = {
          definition: question,
          values: [],
          items: []
        };
      }
      if (question.traitEffects || question.roleEffects) {
        dimensions[dimension].definition = question;
      }
      dimensions[dimension].values.push(adjustedValue);
      dimensions[dimension].items.push({ id: question.id, value, adjustedValue });
    });

    const evidenceByDimension = Object.fromEntries(
      evidenceDb.questions.map((question) => [
        question.dimension,
        { ...question, value: clamp(Number(evidenceResponses[question.id] || 0), -2, 2) }
      ])
    );
    const subjectiveValues = [];
    const evidenceValues = [];
    let mismatchCount = 0;

    Object.entries(dimensions).forEach(([dimension, result]) => {
      if (activeDimensions && !activeDimensions.has(dimension)) return;
      const spread = Math.max(...result.values) - Math.min(...result.values);
      const inconsistent = result.values.length > 1 && spread >= 3;
      const average = result.values.reduce((sum, value) => sum + value, 0) / result.values.length;
      const evidence = evidenceByDimension[dimension];
      const evidenceValue = evidence?.value || 0;
      const aligned = !evidenceValue || !average || Math.sign(evidenceValue) === Math.sign(average);
      if (evidenceValue && average && !aligned) {
        mismatchCount += 1;
        tags.push(`behavior:${dimension}:evidence-mismatch`);
      }
      if (evidenceValue >= 1) tags.push(`behavior:${evidence.id}:high`);
      if (evidenceValue <= -1) tags.push(`behavior:${evidence.id}:low`);
      const evidenceFactor = !evidenceValue ? 0.65 : aligned ? 1 : 0.25;
      const direction = inconsistent ? 0 : (average / 2) * evidenceFactor;
      const definition = result.definition;
      subjectiveValues.push(...result.items.map((item) => item.value));
      evidenceValues.push(evidenceValue);

      if (inconsistent) tags.push(`behavior:${dimension}:inconsistent`);
      else if (average >= 0.75) tags.push(`behavior:${dimension}:high`);
      else if (average <= -0.75) tags.push(`behavior:${dimension}:low`);
      else tags.push(`behavior:${dimension}:neutral`);

      Object.entries(definition.traitEffects || {}).forEach(([trait, effect]) => {
        traitAdjustments[trait] = (traitAdjustments[trait] || 0) + effect * direction;
      });
      Object.entries(definition.roleEffects || {}).forEach(([role, effect]) => {
        roleAdjustments[role] = (roleAdjustments[role] || 0) + effect * direction;
      });
      answers.push({
        id: dimension,
        value: average,
        inconsistent,
        items: result.items,
        evidence: evidence ? { id: evidence.id, value: evidenceValue, aligned } : null,
        meaning: inconsistent
          ? "兩題反應差異較大，此觀念暫不校正"
          : average >= 0.75
            ? definition.positiveMeaning
            : average <= -0.75
              ? definition.negativeMeaning
              : "此觀念目前偏中性或視情境而定"
      });
    });

    const allValues = [...subjectiveValues, ...evidenceValues];
    const neutralRatio = allValues.filter((value) => value === 0).length / (allValues.length || 1);
    const extremeRatio = allValues.filter((value) => Math.abs(value) === 2).length / (allValues.length || 1);
    const counts = allValues.reduce((map, value) => {
      map[value] = (map[value] || 0) + 1;
      return map;
    }, {});
    const dominantRatio = Math.max(...Object.values(counts), 0) / (allValues.length || 1);
    const inconsistentCount = answers.filter((answer) => answer.inconsistent).length;
    const answeredCount = allValues.filter((value) => value !== 0).length;
    const elapsedSeconds = Number(selfReport.elapsedSeconds || 0);
    const metrics = { neutralRatio, dominantRatio, extremeRatio, mismatchCount, inconsistentCount, answeredCount, elapsedSeconds };
    const matchedQuality = qualityDb.levels.find((level) =>
      level.any.some((entry) => matchesQualityEntry(metrics, entry))
    ) || qualityDb.defaultLevel;
    const qualityLevel = matchedQuality.label;
    const qualityFactor = matchedQuality.factor;
    if (qualityLevel === "資料不足") tags.push("response-quality:low");
    else if (qualityLevel === "需要保留") tags.push("response-quality:medium");
    else tags.push("response-quality:good");

    Object.keys(roleAdjustments).forEach((role) => {
      roleAdjustments[role] = clamp(roleAdjustments[role] * qualityFactor, -0.12, 0.12);
    });
    Object.keys(traitAdjustments).forEach((trait) => {
      traitAdjustments[trait] *= qualityFactor;
    });
    return {
      traitAdjustments,
      roleAdjustments,
      tags,
      answers,
      quality: { level: qualityLevel, factor: qualityFactor, neutralRatio, dominantRatio, extremeRatio, mismatchCount, inconsistentCount, answeredCount, elapsedSeconds }
    };
  }

  function buildTaskProfile(profile) {
    const t = profile.traits;
    const e = profile.environments;
    const average = (...values) => values.reduce((sum, value) => sum + value, 0) / values.length;
    return {
      legalJudgment: average(t.structure, t.analysis, t.detail, t.memory),
      documentation: average(t.structure, t.detail, t.expression),
      numericalCheck: average(t.detail, t.analysis),
      publicService: average(t.empathy, t.expression, t.pressure),
      conflictHandling: average(t.pressure, t.expression, t.structure),
      fieldOperation: average(e.field || 0, t.stamina, t.adaptability),
      collaboration: average(t.empathy, t.adaptability, t.expression),
      independentResearch: average(t.analysis, t.memory, t.stamina),
      publicBriefing: average(t.expression, t.pressure, t.adaptability),
      emergencyDecision: average(t.pressure, t.execution, t.adaptability),
      shiftTolerance: average(t.stamina, t.pressure),
      technicalUpdate: average(t.analysis, t.adaptability, t.detail)
    };
  }

  function buildProfile(bazi, selfReport) {
    const elementTotal = Object.values(bazi.elements.adjusted).reduce((sum, value) => sum + value, 0) || 1;
    const elements = Object.fromEntries(
      Object.entries(bazi.elements.adjusted).map(([key, value]) => [key, value / elementTotal])
    );
    const traits = {};
    Object.entries(elements).forEach(([element, weight]) => addWeighted(traits, ELEMENT_TRAITS[element], weight));

    const tenGodTotal = Object.values(bazi.tenGodGroups).reduce((sum, value) => sum + value, 0) || 1;
    const modes = {};
    Object.entries(bazi.tenGodGroups).forEach(([group, count]) => {
      const weight = count / tenGodTotal;
      addWeighted(traits, TEN_GOD_TRAITS[group], weight);
      addWeighted(modes, MODE_BY_TEN_GOD[group], weight);
    });

    addWeighted(traits, selfRules.pressureTraitAdjustments[selfReport.pressureResponse] || {}, 0.35);
    addWeighted(modes, selfRules.examModeProfiles[selfReport.examMode] || selfRules.examModeProfiles.balanced, 0.6);
    const behavior = buildBehaviorProfile(selfReport);
    const normalizedTraits = normalize(traits);
    Object.entries(behavior.traitAdjustments).forEach(([trait, adjustment]) => {
      normalizedTraits[trait] = clamp((normalizedTraits[trait] || 0) + adjustment);
    });

    return {
      elements,
      traits: normalizedTraits,
      modes: normalize(modes),
      environments: selfRules.environmentProfiles[selfReport.environment] || selfRules.environmentProfiles.flexible,
      behavior
    };
  }

  function similarity(profile, requirement) {
    const keys = Object.keys(requirement);
    if (!keys.length) return 0;
    const error = keys.reduce((sum, key) => sum + Math.abs((profile[key] || 0) - requirement[key]), 0);
    return Math.max(0, 1 - error / keys.length);
  }

  function abilityLevel(value) {
    const score = Math.max(0, Math.min(100, Math.round(value)));
    if (score <= 20) return "優勢不足";
    if (score <= 40) return "略有優勢";
    if (score <= 60) return "優勢普通";
    if (score <= 80) return "頗具優勢";
    return "明顯優勢";
  }

  function topEvidence(profile, role) {
    const labels = {
      structure: "規則與結構",
      analysis: "分析推理",
      detail: "細節精準",
      memory: "記憶吸收",
      expression: "文字表達",
      empathy: "服務同理",
      stamina: "長期耐力",
      pressure: "壓力承受",
      adaptability: "彈性調適",
      execution: "執行落地"
    };
    return Object.keys(role.traits)
      .map((key) => ({ key, value: Math.min(profile.traits[key] || 0, role.traits[key]) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 3)
      .map((item) => labels[item.key]);
  }

  function gaps(profile, role) {
    const labels = {
      structure: "需要更固定的規則與讀書架構",
      analysis: "需補強分析與跨章節推理",
      detail: "需用檢查表降低粗心",
      memory: "需增加複習間隔與主動回憶",
      expression: "需加強申論輸出與口頭表達",
      empathy: "服務與協調情境需刻意練習",
      stamina: "長期準備要先建立可持續作息",
      pressure: "考場與職務壓力需做模擬訓練",
      adaptability: "遇到變化時要預留備案",
      execution: "計畫需拆成可驗收的週任務"
    };
    return Object.keys(role.traits)
      .map((key) => ({ key, gap: role.traits[key] - (profile.traits[key] || 0) }))
      .filter((item) => item.gap > 0.22)
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 2)
      .map((item) => labels[item.key]);
  }

  function match(bazi, selfReport) {
    const profile = buildProfile(bazi, selfReport);
    const weights = database.methodology;
    const matches = database.roles.map((role) => {
      const elementFit = similarity(profile.elements, role.elements);
      const traitFit = similarity(profile.traits, role.traits);
      const modeFit = similarity(profile.modes, role.modes);
      const environmentFit = similarity(profile.environments, role.environments);
      const score = (
        elementFit * weights.elementWeight +
        traitFit * weights.traitWeight +
        modeFit * weights.modeWeight +
        environmentFit * weights.environmentWeight
      ) * 100 + (profile.behavior.roleAdjustments[role.id] || 0) * 100;
      const finalScore = clamp(score, 0, 100);
      return {
        ...role,
        score: Math.round(finalScore),
        fitLevel: abilityLevel(finalScore),
        breakdown: {
          elements: Math.round(elementFit * 100),
          traits: Math.round(traitFit * 100),
          examMode: Math.round(modeFit * 100),
          environment: Math.round(environmentFit * 100)
        },
        breakdownLevels: {
          elements: abilityLevel(elementFit * 100),
          traits: abilityLevel(traitFit * 100),
          examMode: abilityLevel(modeFit * 100),
          environment: abilityLevel(environmentFit * 100)
        },
        strengths: topEvidence(profile, role),
        gaps: gaps(profile, role)
      };
    }).sort((a, b) => b.score - a.score);
    const taskProfile = buildTaskProfile(profile);
    const topParentIds = new Set(matches.slice(0, 3).map((role) => role.id));
    const subroles = subroleDb.subroles
      .filter((subrole) => topParentIds.has(subrole.parentRole))
      .map((subrole) => {
        const taskFit = similarity(taskProfile, subrole.tasks);
        const parent = matches.find((role) => role.id === subrole.parentRole);
        const score = taskFit * 0.7 + (parent.score / 100) * 0.3;
        const taskComparisons = Object.entries(subrole.tasks)
          .map(([task, need]) => ({ task, fit: Math.min(taskProfile[task] || 0, need), gap: need - (taskProfile[task] || 0) }))
          .sort((a, b) => b.fit - a.fit);
        const strengthTasks = taskComparisons.slice(0, 3).map((item) => item.task);
        return {
          ...subrole,
          score: Math.round(score * 100),
          fitLevel: abilityLevel(score * 100),
          strengths: strengthTasks.map((task) => subroleDb.taskLabels[task]),
          gaps: [...taskComparisons]
            .sort((a, b) => b.gap - a.gap)
            .filter((item) => item.gap > 0.2 && !strengthTasks.includes(item.task))
            .slice(0, 2)
            .map((item) => subroleDb.taskLabels[item.task])
        };
      })
      .sort((a, b) => b.score - a.score);

    return {
      databaseVersion: database.version,
      databases: [
        `${database.id} ${database.name}`,
        `${selfRules.id} ${selfRules.name}`
      ],
      methodology: database.methodology,
      profile,
      taskProfile,
      top3: matches.slice(0, 3),
      all: matches,
      topSubroles: subroles.slice(0, 5),
      subroles
    };
  }

  return { match, abilityLevel };
});
