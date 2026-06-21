(function (root, factory) {
  const database = factory();
  if (typeof module === "object" && module.exports) module.exports = database;
  else root.ExamDayRiskReminders = database;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  return {
    id: "DB-006",
    name: "考場風險提醒庫",
    version: "2026.06.15-v1",
    description: "針對時間、讀題、作答、身體與臨場風險提供離線提醒。",
    evidenceLevel: "一般考試管理建議，不取代當年度試場規則",
    reminders: [
      { id: "ER-001", triggers: ["all"], severity: "info", text: "考前再次核對當年度入場證件、考場、節次與可攜物品規定。" },
      { id: "ER-002", triggers: ["pressure:tense"], severity: "watch", text: "開考後先做一次緩慢吐氣，再開始讀題，避免緊張造成跳字。" },
      { id: "ER-003", triggers: ["pressure:impulsive"], severity: "high", text: "看到熟題也要讀完整題幹，特別確認否定詞與題目問法。" },
      { id: "ER-004", triggers: ["pressure:avoidant"], severity: "high", text: "遇到不會的題先留下標記並前進，不要讓單題拖垮整份試卷。" },
      { id: "ER-005", triggers: ["mode:essay"], severity: "info", text: "申論先分配每題分鐘數，時間到即收尾並轉下一題。" },
      { id: "ER-006", triggers: ["mode:essay"], severity: "watch", text: "先列小標與得分點，再展開內容，可降低寫到一半偏題的風險。" },
      { id: "ER-007", triggers: ["mode:law"], severity: "watch", text: "法規選擇題需分清原則、例外、得與應及期間數字。" },
      { id: "ER-008", triggers: ["mode:quantitative"], severity: "watch", text: "計算題寫出關鍵步驟，即使最終答案錯仍可能保留部分分數。" },
      { id: "ER-009", triggers: ["mode:quantitative"], severity: "high", text: "交卷前優先檢查單位、正負號、抄題數字與答案範圍。" },
      { id: "ER-010", triggers: ["mode:technical"], severity: "watch", text: "技術題若有圖表，先標明符號、方向、單位與假設條件。" },
      { id: "ER-011", triggers: ["detail:low"], severity: "high", text: "每完成一頁即確認題號與答案位置，避免劃錯卡或答錯欄。" },
      { id: "ER-012", triggers: ["detail:high"], severity: "watch", text: "檢查應有優先順序，不要把時間全花在已經高把握的題目。" },
      { id: "ER-013", triggers: ["expression:low"], severity: "watch", text: "答案先寫關鍵結論，再補理由，避免閱卷者找不到主張。" },
      { id: "ER-014", triggers: ["expression:high"], severity: "watch", text: "文字流暢仍要控制篇幅，與題目無關的延伸不會增加分數。" },
      { id: "ER-015", triggers: ["analysis:high"], severity: "watch", text: "複雜題先採可得分的合理解釋，不要因追求完美而空白。" },
      { id: "ER-016", triggers: ["analysis:low"], severity: "watch", text: "選項相近時回到題幹條件逐項排除，不要只憑熟悉感。" },
      { id: "ER-017", triggers: ["stamina:low"], severity: "high", text: "考前模考要練完整節次，確認注意力能維持到最後一科。" },
      { id: "ER-018", triggers: ["stamina:high"], severity: "info", text: "體力較穩仍要準備節次間的補水、飲食與恢復安排。" },
      { id: "ER-019", triggers: ["morning-risk"], severity: "watch", text: "考前一週把起床與早餐時間調到考試日節奏。" },
      { id: "ER-020", triggers: ["sleep-risk"], severity: "high", text: "考前夜不要用熬夜換取新內容，睡眠不足會直接影響讀題與回憶。" },
      { id: "ER-021", triggers: ["travel-risk"], severity: "watch", text: "預留交通延誤時間，外縣市考場應提前確認路線與住宿。" },
      { id: "ER-022", triggers: ["equipment-risk"], severity: "info", text: "依規定準備備用文具、計算工具與必要證件，不依賴單一物品。" },
      { id: "ER-023", triggers: ["panic-risk"], severity: "high", text: "腦中空白時先寫題目涉及的核心名詞，再從定義與原則恢復思路。" },
      { id: "ER-024", triggers: ["time-risk"], severity: "high", text: "每節保留最後五至十分鐘處理漏題、題號與基本檢查。" },
      { id: "ER-025", triggers: ["guessing-risk"], severity: "watch", text: "不確定題先排除明顯錯誤，再依規則作答，避免頻繁改答案。" },
      { id: "ER-026", triggers: ["multiple-subjects"], severity: "info", text: "上一科結束後不要長時間對答案，保留情緒與注意力給下一科。" },
      { id: "ER-027", triggers: ["physical-test"], severity: "high", text: "含體能測驗的考試需另依官方標準安排訓練與健康評估。" },
      { id: "ER-028", triggers: ["oral-test"], severity: "watch", text: "含口試類科應練習限時自我介紹、情境判斷與追問回應。" },
      { id: "ER-029", triggers: ["qualification-risk"], severity: "high", text: "報名前確認學歷、科系、證照與體格等應考資格，避免準備方向無效。" },
      { id: "ER-030", triggers: ["all"], severity: "info", text: "試場規定可能逐年修正，正式應試以考選部當年度簡章為準。" }
    ]
  };
});
