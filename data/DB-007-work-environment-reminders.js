(function (root, factory) {
  const database = factory();
  if (typeof module === "object" && module.exports) module.exports = database;
  else root.WorkEnvironmentReminders = database;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  return {
    id: "DB-007",
    name: "職務環境適應提醒庫",
    version: "2026.06.15-v1",
    description: "依內勤、服務、外勤、技術與職群特性提供工作適應提醒。",
    evidenceLevel: "職群概括描述，實際工作依機關與職缺不同",
    reminders: [
      { id: "WE-001", triggers: ["environment:desk"], severity: "info", text: "內勤工作比例高，需能接受長時間文書、系統與流程作業。" },
      { id: "WE-002", triggers: ["environment:desk", "detail:low"], severity: "watch", text: "內勤流程重複時容易出現疲勞性錯誤，需建立核對機制。" },
      { id: "WE-003", triggers: ["environment:service"], severity: "info", text: "民眾服務需要清楚說明規定，同時維持情緒界線。" },
      { id: "WE-004", triggers: ["environment:service", "empathy:low"], severity: "watch", text: "服務工作不只依規定辦理，也要練習理解對方真正問題。" },
      { id: "WE-005", triggers: ["environment:field"], severity: "info", text: "外勤工作可能包含移動、天候、現場協調與不固定時程。" },
      { id: "WE-006", triggers: ["environment:field", "adaptability:low"], severity: "high", text: "對現場變動接受度較低時，報考前應先了解實際勤務比例。" },
      { id: "WE-007", triggers: ["environment:technical"], severity: "info", text: "技術職需持續更新知識，錄取後仍會有設備、規範與系統學習。" },
      { id: "WE-008", triggers: ["environment:technical", "analysis:low"], severity: "watch", text: "技術工作遇到異常時需定位原因，應刻意訓練故障分析流程。" },
      { id: "WE-009", triggers: ["environment:flexible"], severity: "info", text: "尚未確定工作偏好，建議查閱職缺工作內容，不只看考試名稱。" },
      { id: "WE-010", triggers: ["top:legal-audit"], severity: "watch", text: "法制稽核職務常需處理爭議、責任歸屬與高度文字精準度。" },
      { id: "WE-011", triggers: ["top:finance-accounting"], severity: "watch", text: "財會審計工作有結算與期限壓力，需能接受高精準例行作業。" },
      { id: "WE-012", triggers: ["top:general-administration"], severity: "info", text: "一般行政實際業務差異大，分發機關比類科名稱更能決定日常內容。" },
      { id: "WE-013", triggers: ["top:social-education"], severity: "watch", text: "社會教育職群可能接觸複雜個案、陳情與跨單位協調。" },
      { id: "WE-014", triggers: ["top:economic-planning"], severity: "info", text: "政策規劃工作需要在資料、法規、長官需求與可執行性間取捨。" },
      { id: "WE-015", triggers: ["top:data-information"], severity: "watch", text: "資訊統計工作常有系統時效、資料品質與跨部門溝通責任。" },
      { id: "WE-016", triggers: ["top:engineering"], severity: "watch", text: "工程職可能涉及現場、安全、採購、履約與工期管理。" },
      { id: "WE-017", triggers: ["top:health-environment"], severity: "watch", text: "衛生環境職群可能面對稽查、風險事件與公共溝通。" },
      { id: "WE-018", triggers: ["top:culture-diplomacy"], severity: "watch", text: "文化外交工作需要文字、語言、場合判斷與公開應對能力。" },
      { id: "WE-019", triggers: ["top:justice-enforcement"], severity: "high", text: "司法執行類可能包含輪班、衝突、高壓與安全風險。" },
      { id: "WE-020", triggers: ["top:agriculture-natural"], severity: "info", text: "農林自然資源職務可能包含戶外調查、偏遠地區與季節性任務。" },
      { id: "WE-021", triggers: ["top:land-transport-planning"], severity: "watch", text: "地政交通職常需處理法規、圖資、現場與利害關係人。" },
      { id: "WE-022", triggers: ["pressure:tense", "service:high"], severity: "high", text: "若在衝突情境容易緊張，服務職需先練習標準回應與升級處理流程。" },
      { id: "WE-023", triggers: ["pressure:impulsive", "field:high"], severity: "high", text: "外勤情境下搶快可能增加安全與判斷風險，需遵守標準程序。" },
      { id: "WE-024", triggers: ["pressure:avoidant", "public-pressure"], severity: "high", text: "若壓力下傾向逃避，公開責任較高的職務需審慎評估。" },
      { id: "WE-025", triggers: ["structure:high"], severity: "info", text: "偏好明確規則時，制度成熟、程序清楚的職務通常較容易適應。" },
      { id: "WE-026", triggers: ["structure:low"], severity: "watch", text: "對固定程序耐受度低時，應避免只因考科容易而選擇高度例行職務。" },
      { id: "WE-027", triggers: ["adaptability:high"], severity: "info", text: "調適力可支援跨業務與輪調，但仍需建立專業深度。" },
      { id: "WE-028", triggers: ["empathy:high"], severity: "info", text: "同理能力適合服務與協調工作，但需防止情緒過度投入。" },
      { id: "WE-029", triggers: ["execution:high"], severity: "info", text: "執行力適合時限明確的工作，但公部門仍需兼顧程序與紀錄。" },
      { id: "WE-030", triggers: ["all"], severity: "info", text: "同一類科分發到不同機關後，工作內容可能有明顯差異。" }
    ]
  };
});
