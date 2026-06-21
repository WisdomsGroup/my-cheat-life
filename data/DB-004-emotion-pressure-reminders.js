(function (root, factory) {
  const database = factory();
  if (typeof module === "object" && module.exports) module.exports = database;
  else root.EmotionPressureReminders = database;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  return {
    id: "DB-004",
    name: "情緒與壓力提醒庫",
    version: "2026.06.15-v1",
    description: "依壓力反應、耐力、細節與職群情緒負荷提供離線提醒。",
    evidenceLevel: "一般學習與壓力管理建議，不是醫療診斷",
    fields: {
      id: "提醒唯一編號",
      triggers: "觸發標籤",
      severity: "提醒程度：info／watch／high",
      text: "顯示文字"
    },
    reminders: [
      { id: "EP-001", triggers: ["pressure:stable"], severity: "info", text: "你在壓力下仍能照計畫執行，但要避免把疲累誤認為意志力不足。" },
      { id: "EP-002", triggers: ["pressure:stable", "stamina:high"], severity: "watch", text: "耐力是優勢，仍應安排固定休息，避免長期累積後突然失速。" },
      { id: "EP-003", triggers: ["pressure:tense"], severity: "watch", text: "緊張時容易過度檢查，答題要設定每題停留上限。" },
      { id: "EP-004", triggers: ["pressure:tense", "detail:high"], severity: "watch", text: "細心能降低錯誤，但反覆修改可能壓縮後段作答時間。" },
      { id: "EP-005", triggers: ["pressure:impulsive"], severity: "high", text: "壓力上升時容易搶快，讀題後先圈出否定詞、條件與作答範圍。" },
      { id: "EP-006", triggers: ["pressure:impulsive", "execution:high"], severity: "watch", text: "行動快是優勢，但每次交卷前要保留固定檢查時間。" },
      { id: "EP-007", triggers: ["pressure:avoidant"], severity: "high", text: "壓力大時若容易拖延，請把任務縮成二十五分鐘內可完成的單位。" },
      { id: "EP-008", triggers: ["pressure:avoidant", "stamina:low"], severity: "high", text: "不要用一次補完的方式追進度，先恢復每日最低讀書量。" },
      { id: "EP-009", triggers: ["pressure:unknown"], severity: "info", text: "尚未建立壓力反應資料，建議完成一次全真模考後再調整推薦。" },
      { id: "EP-010", triggers: ["pressure:high-role"], severity: "watch", text: "此職群壓力負荷較高，準備期應加入限時、口試或情境題演練。" },
      { id: "EP-011", triggers: ["service:high"], severity: "watch", text: "民眾服務類工作需要情緒界線，避免把他人的急迫感全部帶回自己身上。" },
      { id: "EP-012", triggers: ["field:high"], severity: "watch", text: "外勤與現場變動較多，需評估自己對突發狀況與不固定節奏的接受度。" },
      { id: "EP-013", triggers: ["detail:low"], severity: "high", text: "細節穩定度不足時，應使用題號、單位、法條與關鍵字檢查表。" },
      { id: "EP-014", triggers: ["detail:high"], severity: "info", text: "細節能力是優勢，但要定期確認自己沒有忽略整體題旨。" },
      { id: "EP-015", triggers: ["stamina:low"], severity: "high", text: "長期耐力不足時，不宜一開始就排滿日程，先建立可持續的週節奏。" },
      { id: "EP-016", triggers: ["stamina:high"], severity: "info", text: "持續力較佳，適合長期累積型考試，但仍要用模考確認方向正確。" },
      { id: "EP-017", triggers: ["adaptability:low"], severity: "watch", text: "遇到新題型時容易卡住，平時要刻意混合章節與陌生題。" },
      { id: "EP-018", triggers: ["adaptability:high"], severity: "info", text: "調適力較佳，但頻繁更換教材與方法會稀釋累積成果。" },
      { id: "EP-019", triggers: ["expression:low"], severity: "watch", text: "表達不足不是只靠多看書改善，需要固定寫題並接受回饋。" },
      { id: "EP-020", triggers: ["expression:high"], severity: "info", text: "表達力較佳，申論仍要先回答題旨，再補充延伸觀點。" },
      { id: "EP-021", triggers: ["analysis:high", "pressure:tense"], severity: "watch", text: "分析能力強但容易想太多時，先寫出可得分的基本架構再深入。" },
      { id: "EP-022", triggers: ["execution:low"], severity: "high", text: "計畫若經常停在規劃階段，請改用每週可驗收的題數與章節數。" },
      { id: "EP-023", triggers: ["execution:high"], severity: "info", text: "執行速度較快，需用錯題率與模考成績確認不是只追求完成量。" },
      { id: "EP-024", triggers: ["memory:low"], severity: "watch", text: "記憶留存較弱時，應採間隔複習與主動回憶，不宜只重讀。" },
      { id: "EP-025", triggers: ["memory:high"], severity: "info", text: "記憶力較佳，仍要練習題目轉換，避免只會辨認熟悉文字。" },
      { id: "EP-026", triggers: ["daymaster:weak"], severity: "watch", text: "季節模型顯示日主偏弱，讀書安排宜保留恢復時間，避免連續透支。" },
      { id: "EP-027", triggers: ["daymaster:strong"], severity: "watch", text: "季節模型顯示日主偏強，要設外部檢核點，避免固守無效方法。" },
      { id: "EP-028", triggers: ["daymaster:balanced"], severity: "info", text: "季節模型相對中和，成效更取決於穩定作息、題型覆蓋與回饋品質。" },
      { id: "EP-029", triggers: ["public-pressure"], severity: "high", text: "需公開應對或承擔責任的職群，應先確認自己能否接受持續被檢視。" },
      { id: "EP-030", triggers: ["shift-work"], severity: "high", text: "輪班或不固定勤務會影響睡眠與情緒，報考前應納入生活適配評估。" }
    ]
  };
});
