(function (root, factory) {
  const database = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = database;
  } else {
    root.BaziInterpretationRules = database;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  return {
    id: "DB-002",
    name: "八字五行與十神解讀規則",
    version: "2026.06.15-v1",
    description: "提供五行、月令旺相休囚死、藏干權重與十神群組規則。",
    evidenceLevel: "傳統命理規則模型，不是科學因果模型",
    stemElement: {
      甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土",
      己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水"
    },
    elements: ["木", "火", "土", "金", "水"],
    resourceOf: { 木: "水", 火: "木", 土: "火", 金: "土", 水: "金" },
    tenGodGroup: {
      比肩: "比劫", 劫财: "比劫",
      食神: "食傷", 伤官: "食傷",
      偏财: "財星", 正财: "財星",
      七杀: "官殺", 正官: "官殺",
      偏印: "印星", 正印: "印星",
      日主: "日主"
    },
    seasonByMonthBranch: {
      寅: "春", 卯: "春",
      巳: "夏", 午: "夏",
      申: "秋", 酉: "秋",
      亥: "冬", 子: "冬",
      辰: "四季土", 未: "四季土", 戌: "四季土", 丑: "四季土"
    },
    seasonState: {
      春: { 木: "旺", 火: "相", 水: "休", 金: "囚", 土: "死" },
      夏: { 火: "旺", 土: "相", 木: "休", 水: "囚", 金: "死" },
      秋: { 金: "旺", 水: "相", 土: "休", 火: "囚", 木: "死" },
      冬: { 水: "旺", 木: "相", 金: "休", 土: "囚", 火: "死" },
      四季土: { 土: "旺", 金: "相", 火: "休", 木: "囚", 水: "死" }
    },
    stateFactor: { 旺: 1.5, 相: 1.25, 休: 1, 囚: 0.75, 死: 0.5 },
    hiddenStemWeights: [1, 0.6, 0.3],
    strengthThresholds: { strong: 0.58, weak: 0.42 }
  };
});
