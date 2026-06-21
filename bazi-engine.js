(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory(
      require("./vendor/lunar.js"),
      require("./data/DB-002-bazi-interpretation-rules.js")
    );
  } else {
    root.BaziEngine = factory(
      { Solar: root.Solar, Lunar: root.Lunar },
      root.BaziInterpretationRules
    );
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (calendar, rules) {
  "use strict";

  const { Solar, Lunar } = calendar;
  const STEM_ELEMENT = rules.stemElement;
  const ELEMENTS = rules.elements;
  const RESOURCE_OF = rules.resourceOf;
  const TEN_GOD_GROUP = rules.tenGodGroup;
  const SEASON_BY_MONTH_BRANCH = rules.seasonByMonthBranch;
  const SEASON_STATE = rules.seasonState;
  const STATE_FACTOR = rules.stateFactor;
  const HIDDEN_WEIGHTS = rules.hiddenStemWeights;

  function requireCalendar() {
    if (!Solar || !Lunar) {
      throw new Error("曆法核心尚未載入。");
    }
  }

  function createLunar(input) {
    requireCalendar();
    const hour = Number(input.hour);
    const minute = Number(input.minute);
    if (input.calendarType === "lunar") {
      const lunarMonth = input.isLeapMonth ? -Number(input.month) : Number(input.month);
      return Lunar.fromYmdHms(
        Number(input.year),
        lunarMonth,
        Number(input.day),
        hour,
        minute,
        0
      );
    }
    return Solar.fromYmdHms(
      Number(input.year),
      Number(input.month),
      Number(input.day),
      hour,
      minute,
      0
    ).getLunar();
  }

  function pillarData(eightChar, prefix) {
    return {
      name: { Year: "年柱", Month: "月柱", Day: "日柱", Time: "時柱" }[prefix],
      ganZhi: eightChar[`get${prefix}`](),
      gan: eightChar[`get${prefix}Gan`](),
      zhi: eightChar[`get${prefix}Zhi`](),
      wuXing: eightChar[`get${prefix}WuXing`](),
      naYin: eightChar[`get${prefix}NaYin`](),
      hiddenGan: eightChar[`get${prefix}HideGan`](),
      tenGodStem: eightChar[`get${prefix}ShiShenGan`](),
      tenGodBranch: eightChar[`get${prefix}ShiShenZhi`](),
      diShi: eightChar[`get${prefix}DiShi`]()
    };
  }

  function calculateElementModel(pillars) {
    const raw = Object.fromEntries(ELEMENTS.map((element) => [element, 0]));
    pillars.forEach((pillar) => {
      raw[STEM_ELEMENT[pillar.gan]] += 1;
      pillar.hiddenGan.forEach((stem, index) => {
        raw[STEM_ELEMENT[stem]] += HIDDEN_WEIGHTS[index] || 0.3;
      });
    });

    const monthBranch = pillars[1].zhi;
    const season = SEASON_BY_MONTH_BRANCH[monthBranch];
    const states = SEASON_STATE[season];
    const adjusted = {};
    ELEMENTS.forEach((element) => {
      adjusted[element] = Number((raw[element] * STATE_FACTOR[states[element]]).toFixed(2));
    });

    const dayMaster = STEM_ELEMENT[pillars[2].gan];
    const resource = RESOURCE_OF[dayMaster];
    const total = ELEMENTS.reduce((sum, element) => sum + adjusted[element], 0);
    const support = adjusted[dayMaster] + adjusted[resource];
    const ratio = total ? support / total : 0;
    const strength = ratio >= rules.strengthThresholds.strong
      ? "偏強"
      : ratio <= rules.strengthThresholds.weak
        ? "偏弱"
        : "相對中和";

    return {
      model: "旺相休囚死季節加權 v0.1",
      ruleDatabase: `${rules.id} ${rules.name} ${rules.version}`,
      monthBranch,
      season,
      states,
      raw,
      adjusted,
      dayMaster,
      resource,
      supportRatio: Number(ratio.toFixed(3)),
      strength,
      caveat: "此為透明的季節加權試算，不等同所有命理流派的格局、調候或喜用神定論。"
    };
  }

  function calculateTenGodGroups(pillars) {
    const groups = { 比劫: 0, 食傷: 0, 財星: 0, 官殺: 0, 印星: 0 };
    pillars.forEach((pillar) => {
      [pillar.tenGodStem, ...pillar.tenGodBranch].forEach((tenGod) => {
        const group = TEN_GOD_GROUP[tenGod];
        if (group && group !== "日主") groups[group] += 1;
      });
    });
    return groups;
  }

  function buildExamObservations(groups, elementModel) {
    const observations = [];
    const sorted = Object.entries(groups).sort((a, b) => b[1] - a[1]);
    const strongest = sorted[0][0];

    const groupText = {
      印星: "印星訊號較多：傳統上偏向吸收、記憶與依循教材；準備時仍要用題目驗證是否真的會。",
      官殺: "官殺訊號較多：傳統上重視規則、制度與壓力反應；適合明確進度，但要留意焦慮。",
      食傷: "食傷訊號較多：傳統上偏向輸出與表達；申論可發揮，但需防答題超出題旨。",
      財星: "財星訊號較多：傳統上重視效率與資源配置；適合排讀書預算與時程，避免過度計較短期得失。",
      比劫: "比劫訊號較多：傳統上偏向自主、競爭與持續投入；可用讀書會或模考建立節奏。"
    };
    observations.push(groupText[strongest]);

    if (elementModel.strength === "偏弱") {
      observations.push("日主在此季節模型中偏弱：讀書計畫宜留恢復空間，避免長時間硬撐造成後段失速。");
    } else if (elementModel.strength === "偏強") {
      observations.push("日主在此季節模型中偏強：執行力可能較集中，但要設檢核點，避免固守錯誤方法。");
    } else {
      observations.push("日主在此季節模型中相對中和：重點放在穩定作息、題型覆蓋與錯題回收。");
    }

    observations.push("以上只把傳統命理符號轉成讀書提醒，不是錄取機率，也不能替代成績、準備時間與模考表現。");
    return observations;
  }

  function buildDaYun(eightChar, input) {
    const gender = input.gender === "male" ? 1 : 0;
    const yunSect = Number(input.yunSect || 2);
    const yun = eightChar.getYun(gender, yunSect);
    const periods = yun.getDaYun(9).map((period) => {
      const ganZhi = period.getGanZhi();
      return {
        index: period.getIndex(),
        ganZhi,
        startYear: period.getStartYear(),
        endYear: period.getEndYear(),
        startAge: period.getStartAge(),
        endAge: period.getEndAge(),
        xun: ganZhi ? period.getXun() : "",
        xunKong: ganZhi ? period.getXunKong() : ""
      };
    });
    return {
      sect: yunSect,
      direction: yun.isForward() ? "順排" : "逆排",
      start: {
        year: yun.getStartYear(),
        month: yun.getStartMonth(),
        day: yun.getStartDay(),
        hour: yun.getStartHour(),
        solar: yun.getStartSolar().toYmdHms()
      },
      periods
    };
  }

  function calculate(input) {
    const lunar = createLunar(input);
    const solar = lunar.getSolar();
    const eightChar = lunar.getEightChar();
    eightChar.setSect(Number(input.daySect || 2));
    const pillars = ["Year", "Month", "Day", "Time"].map((prefix) => pillarData(eightChar, prefix));
    const elements = calculateElementModel(pillars);
    const tenGodGroups = calculateTenGodGroups(pillars);

    return {
      engine: {
        name: "lunar-javascript",
        version: "1.7.7",
        daySect: Number(input.daySect || 2),
        timezone: input.timezone || "Asia/Taipei",
        timeBasis: "civil-time",
        trueSolarTimeAdjusted: false
      },
      input: { ...input },
      converted: {
        solar: solar.toYmdHms(),
        lunar: lunar.toString(),
        lunarFull: lunar.toFullString(),
        isLeapMonth: lunar.getMonth() < 0
      },
      pillars,
      elements,
      tenGodGroups,
      daYun: buildDaYun(eightChar, input),
      examObservations: buildExamObservations(tenGodGroups, elements)
    };
  }

  return { calculate };
});
