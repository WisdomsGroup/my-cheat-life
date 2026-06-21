(function (root, factory) {
  const database = factory();
  if (typeof module === "object" && module.exports) module.exports = database;
  else root.ResponseQualityRules = database;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  return {
    id: "DB-018",
    name: "自評作答可信度與降權規則",
    version: "2026.06.15-v1",
    levels: [
      {
        id: "insufficient",
        label: "資料不足",
        factor: 0.45,
        any: [
          { all: [
            { metric: "answeredCount", op: ">=", value: 60 },
            { metric: "elapsedSeconds", op: "<=", value: 60 }
          ]},
          { metric: "neutralRatio", op: ">=", value: 0.7 },
          { metric: "dominantRatio", op: ">=", value: 0.85 },
          { metric: "mismatchCount", op: ">=", value: 8 }
        ]
      },
      {
        id: "caution",
        label: "需要保留",
        factor: 0.7,
        any: [
          { metric: "neutralRatio", op: ">=", value: 0.45 },
          { metric: "dominantRatio", op: ">=", value: 0.65 },
          { metric: "mismatchCount", op: ">=", value: 5 },
          { metric: "inconsistentCount", op: ">=", value: 7 },
          { metric: "extremeRatio", op: ">=", value: 0.75 }
        ]
      }
    ],
    defaultLevel: { id: "good", label: "良好", factor: 1 }
  };
});
