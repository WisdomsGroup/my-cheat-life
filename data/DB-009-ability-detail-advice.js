(function (root, factory) {
  const database = factory();
  if (typeof module === "object" && module.exports) module.exports = database;
  else root.AbilityDetailAdvice = database;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const definitions = {
    structure: ["規則結構", "能把規則、步驟與優先順序整理清楚", "面對程序不清的工作時是否容易失去方向？", "用流程圖、檢核點與固定順序處理任務"],
    analysis: ["分析推理", "能拆解問題、辨認因果並整合多項條件", "複雜問題出現時是否能先找出關鍵變數？", "固定寫出條件、推論與結論三層"],
    detail: ["細節精準", "能穩定辨認數字、文字、例外與格式差異", "是否常在理解正確的情況下仍因小地方失誤？", "建立個人高頻錯誤清單並逐項核對"],
    memory: ["記憶留存", "能把資訊轉成可長期提取的知識", "隔一段時間後是否仍能不看資料說出重點？", "採主動回憶與間隔複習，不只重讀"],
    expression: ["表達輸出", "能把理解轉成他人可讀、可聽懂的內容", "是否知道答案卻需要很久才能說清楚？", "先講結論，再用兩到三個理由展開"],
    empathy: ["需求理解", "能辨認他人立場、情緒與真正需求", "對方說法混亂時是否仍能抓到核心需求？", "先重述對方需求，再說明規則與可行方案"],
    stamina: ["持續耐力", "能在長期、重複或延遲回饋下保持投入", "沒有立即成果時是否仍能維持固定節奏？", "設定最低持續量，先守住連續性"],
    pressure: ["壓力承受", "能在責任、時限、衝突與被檢視時維持判斷", "被催促或質疑時是否仍能按程序處理？", "用限時與情境演練建立壓力下的固定動作"],
    adaptability: ["變動調適", "能在資訊不足或條件改變時修正方法", "原計畫失效時是否能快速提出替代方案？", "每個重要計畫至少準備一個備案"],
    execution: ["執行落地", "能把想法轉成有期限、可驗收的成果", "是否常停留在規劃，沒有形成完成物？", "把目標改寫成日期、數量與交付物"]
  };

  const rules = [];
  Object.entries(definitions).forEach(([trait, [label, description, verify, action]], index) => {
    rules.push({
      id: `AD-${String(index * 2 + 1).padStart(3, "0")}`,
      all: [`trait:${trait}:high`],
      category: "能力細項",
      title: `${label}可作為穩定優勢`,
      basis: description,
      verify,
      action: `${action}，並避免優勢使用過度。`
    });
    rules.push({
      id: `AD-${String(index * 2 + 2).padStart(3, "0")}`,
      all: [`trait:${trait}:low`],
      category: "能力細項",
      title: `${label}需要外部方法補強`,
      basis: `目前交叉訊號顯示：${description}這件事較不穩定。`,
      verify,
      action: `${action}，連續執行四週後再觀察。`
    });
  });

  return {
    id: "DB-009",
    name: "能力細項表現與補強建言庫",
    version: "2026.06.15-v1",
    description: "把十項核心能力拆成優勢、可能表現、自我核對與行動方法。",
    rules
  };
});
