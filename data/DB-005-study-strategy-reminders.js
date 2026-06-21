(function (root, factory) {
  const database = factory();
  if (typeof module === "object" && module.exports) module.exports = database;
  else root.StudyStrategyReminders = database;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  return {
    id: "DB-005",
    name: "讀書策略提醒庫",
    version: "2026.06.15-v1",
    description: "依題型、能力缺口及職群需求提供離線準備策略。",
    evidenceLevel: "一般學習策略與專案規則",
    reminders: [
      { id: "SS-001", triggers: ["mode:law"], severity: "info", text: "法規科先建立章節架構，再用條號、要件與例外製作三欄表。" },
      { id: "SS-002", triggers: ["mode:law", "memory:low"], severity: "watch", text: "法條不要一次背完，改用每日短回合與隔日抽問。" },
      { id: "SS-003", triggers: ["mode:law", "detail:low"], severity: "high", text: "法規題常在主體、期間與例外失分，錯題必須標記錯誤類型。" },
      { id: "SS-004", triggers: ["mode:essay"], severity: "info", text: "申論練習要固定使用題旨、爭點、論證與結論的作答骨架。" },
      { id: "SS-005", triggers: ["mode:essay", "expression:low"], severity: "high", text: "每週至少完成兩題限時申論，不能只看擬答。" },
      { id: "SS-006", triggers: ["mode:essay", "analysis:high"], severity: "watch", text: "分析多時要先列得分點，避免前段寫太長導致結論不足。" },
      { id: "SS-007", triggers: ["mode:quantitative"], severity: "info", text: "計算科應建立公式條件、典型題與常見陷阱的對照表。" },
      { id: "SS-008", triggers: ["mode:quantitative", "detail:low"], severity: "high", text: "計算後固定檢查單位、正負號、有效位數與題目所求。" },
      { id: "SS-009", triggers: ["mode:quantitative", "analysis:low"], severity: "watch", text: "先練題型辨識與已知條件整理，再追求解題速度。" },
      { id: "SS-010", triggers: ["mode:technical"], severity: "info", text: "技術科目要把原理、公式、圖解與實務案例放在同一套筆記中。" },
      { id: "SS-011", triggers: ["mode:technical", "adaptability:low"], severity: "watch", text: "技術題需加入變形題與跨章節題，避免只會熟悉題型。" },
      { id: "SS-012", triggers: ["mode:balanced"], severity: "info", text: "題型尚未確定時，先各做一回法規、申論與計算題再比較表現。" },
      { id: "SS-013", triggers: ["memory:high"], severity: "info", text: "記憶優勢應用在架構與關鍵詞，不要用來取代理解與輸出。" },
      { id: "SS-014", triggers: ["memory:low"], severity: "watch", text: "採用一日、一週、一月的間隔複習節點，並以空白回憶檢查。" },
      { id: "SS-015", triggers: ["analysis:high"], severity: "info", text: "分析型學習者要設定停止蒐集資料的時間，及早進入寫題。" },
      { id: "SS-016", triggers: ["analysis:low"], severity: "watch", text: "每題先寫出為什麼選這個答案，再對照解析補推理鏈。" },
      { id: "SS-017", triggers: ["structure:high"], severity: "info", text: "善用固定週表與章節清單，但每兩週要依成績調整一次。" },
      { id: "SS-018", triggers: ["structure:low"], severity: "high", text: "教材與課程限制在一套主線，避免多來源並行造成進度失控。" },
      { id: "SS-019", triggers: ["detail:high"], severity: "info", text: "細節能力可用於整理易混淆表格，但需定期回到大綱確認全貌。" },
      { id: "SS-020", triggers: ["detail:low"], severity: "watch", text: "建立個人粗心清單，每次模考只檢查最常犯的三類錯誤。" },
      { id: "SS-021", triggers: ["stamina:high"], severity: "info", text: "長期耐力較佳，可採穩定累積，但每月仍需一次完整模考。" },
      { id: "SS-022", triggers: ["stamina:low"], severity: "high", text: "以每週五天固定短時段開始，先守住連續性再增加時數。" },
      { id: "SS-023", triggers: ["execution:high"], severity: "info", text: "完成題數之外，同步追蹤正確率、重錯率與每題用時。" },
      { id: "SS-024", triggers: ["execution:low"], severity: "high", text: "把本週目標改寫成可計數成果，例如完成章節、題數與訂正數。" },
      { id: "SS-025", triggers: ["adaptability:high"], severity: "info", text: "可安排混合題與跨科整合，但主教材與核心筆記不要頻繁更換。" },
      { id: "SS-026", triggers: ["adaptability:low"], severity: "watch", text: "每週安排少量陌生題，逐步提高對命題變化的容忍度。" },
      { id: "SS-027", triggers: ["top:legal-audit"], severity: "info", text: "法制稽核類應以法條要件、實務見解與案例適用三線並進。" },
      { id: "SS-028", triggers: ["top:finance-accounting"], severity: "info", text: "財會類應將計算流程標準化，並保留錯帳與調整分錄專區。" },
      { id: "SS-029", triggers: ["top:data-information"], severity: "info", text: "資訊統計類應同時練計算、程式邏輯與書面解釋。" },
      { id: "SS-030", triggers: ["top:social-education"], severity: "info", text: "社會教育類申論需連結理論、法規、政策與服務情境。" }
    ]
  };
});
