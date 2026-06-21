(function (root, factory) {
  const database = factory();
  if (typeof module === "object" && module.exports) module.exports = database;
  else root.WorkContextAdvice = database;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const rows = [
    ["WC-001", ["top:legal-audit", "behavior:justiceOrientation:high"], "原則感可支援法制與稽核工作", "對是非、責任與一致性的重視，能支援規則判斷與查核。", "發現熟人違反規定時，是否仍能依相同標準處理？", "練習把價值判斷轉成法規依據與可說明程序。"],
    ["WC-002", ["top:legal-audit", "behavior:groupCompromise:low"], "堅持原則時要保留協作方法", "法制稽核需要立場，也需要讓他人理解並完成改善。", "指出問題後，是否也能提出可執行的修正方式？", "使用事實、依據、風險、改善四段式溝通。"],
    ["WC-003", ["top:justice-enforcement", "behavior:justiceOrientation:high"], "明確是非觀可支援執法判斷", "生活自評中的原則感與執法、調查職能方向相合。", "高壓下是否仍能區分事實、推測與個人情緒？", "強化證據、程序與比例原則，避免只憑直覺定性。"],
    ["WC-004", ["top:justice-enforcement", "behavior:conflictReadiness:low"], "執法方向需審慎評估衝突負荷", "執法工作可能長期接觸對抗、拒絕與突發狀況。", "他人提高音量或拒絕配合時，是否會明顯僵住？", "先透過情境演練確認自己能否維持程序與安全判斷。"],
    ["WC-005", ["top:justice-enforcement", "behavior:groupCompromise:low"], "原則清楚不代表可以忽略團隊", "警察與司法執行多依賴交接、分工與指揮體系。", "意見不同時是否仍能先完成團隊決策？", "練習清楚表達異議後，依正式決策協同行動。"],
    ["WC-006", ["top:finance-accounting", "behavior:detailDiscipline:high"], "核對習慣與財會職務相合", "願意重複檢查與維持一致性，可支援低錯誤容忍工作。", "即使工作熟悉，是否仍會按步驟核對？", "把細心轉成可追溯的紀錄與覆核流程。"],
    ["WC-007", ["top:finance-accounting", "behavior:routineTolerance:low"], "財會例行工作可能形成長期摩擦", "財會工作包含大量週期性核對與固定截止日。", "連續處理相似資料時是否會迅速失去耐心？", "報考前了解實際例行比例，不只看考科是否擅長。"],
    ["WC-008", ["top:general-administration", "behavior:serviceBoundary:high"], "服務界線有助行政穩定", "能理解民眾需求又維持規則，有助於窗口與協調工作。", "面對急迫要求時是否能同理但不做不當承諾？", "使用可辦、不可辦、替代方案三段式回應。"],
    ["WC-009", ["top:general-administration", "behavior:ambiguityTolerance:low"], "業務差異可能比預期更大", "一般行政分發後的工作內容常不完全可預測。", "工作規則尚未明確時是否會非常不安？", "選填機關前查詢實際業務、輪調與臨時任務比例。"],
    ["WC-010", ["top:social-education", "behavior:empathyBoundary:high"], "同理與界線可支援服務工作", "能理解他人又不把情緒全部帶回自己，是長期服務的重要條件。", "協助別人後是否仍能在下班後恢復自己的情緒？", "維持紀錄、轉介與督導界線，不獨自承擔所有問題。"],
    ["WC-011", ["top:social-education", "behavior:empathyBoundary:low"], "高情緒勞動可能造成消耗", "社政教育常接觸複雜需求，若界線不穩容易過度投入或迅速抽離。", "他人的困難是否會讓你長時間內疚或煩躁？", "先評估服務負荷，並建立轉介、督導與情緒復原方式。"],
    ["WC-012", ["top:economic-planning", "behavior:ambiguityTolerance:high"], "模糊問題與政策取捨較能發揮", "政策規劃常沒有唯一答案，需要在多方條件中形成方案。", "資訊不完整時是否仍能提出暫行判斷與修正條件？", "把推論前提寫清楚，讓方案可被檢驗與調整。"],
    ["WC-013", ["top:data-information", "behavior:technicalCuriosity:high"], "追查原因的習慣與資訊工作相合", "願意拆解系統、找規律與定位異常，能支援資訊與資料工作。", "遇到錯誤時是否會想知道原因，而不只找人處理？", "持續累積故障紀錄、測試假設與解決過程。"],
    ["WC-014", ["top:data-information", "behavior:collaborationNeed:high"], "技術能力仍需跨部門翻譯", "資訊工作不只有獨立分析，也常需理解非技術需求。", "能否把技術限制說成對方聽得懂的影響？", "練習用情境、風險與選項說明技術決策。"],
    ["WC-015", ["top:engineering", "behavior:fieldReadiness:high"], "現場與技術實作方向相合", "對移動、設備、現場條件與不固定情境的接受度，可支援工程職務。", "環境不舒適或計畫臨時改變時是否仍能維持判斷？", "進一步確認安全責任、工期與現場比例。"],
    ["WC-016", ["top:engineering", "behavior:fieldReadiness:low"], "工程類需區分設計與現場職缺", "部分工程職務包含工地、設備、安全與跨區任務。", "是否希望工作幾乎都能在固定室內完成？", "選擇前查清設計、監造、維護與現場比例。"],
    ["WC-017", ["top:health-environment", "behavior:serviceBoundary:high"], "規則與溝通並用較適合稽查服務", "衛生環境工作常同時需要科學、法規與民眾溝通。", "說明風險時是否能兼顧準確與對方理解？", "練習把專業內容轉成分級風險與具體行動。"],
    ["WC-018", ["top:culture-diplomacy", "behavior:publicAccountability:high"], "公開表達與代表責任較能承接", "文化外交工作常需在外部場合清楚表達立場。", "臨時被問到敏感問題時是否能先確認範圍再回答？", "練習核心訊息、過渡句與不知道時的正式回應。"],
    ["WC-019", ["top:culture-diplomacy", "behavior:justiceOrientation:high"], "是非感過強時要增加立場轉換", "外交與新聞工作常需理解多方立場，不一定能立即做二分判斷。", "是否容易把立場不同直接理解成對錯？", "先區分事實、利益、立場與可談判空間。"],
    ["WC-020", ["top:agriculture-natural", "behavior:fieldReadiness:high"], "戶外與自然情境接受度相合", "農林自然資源職務常含調查、移動與季節性工作。", "天候與地點改變時是否仍願意完成任務？", "確認體力、交通與偏遠地區工作的實際接受度。"],
    ["WC-021", ["top:land-transport-planning", "behavior:stakeholderBalance:high"], "多方利害關係協調較能發揮", "地政交通規劃需同時考慮法規、技術與不同關係人。", "遇到互相衝突的需求時是否能整理各方底線？", "用利害關係表記錄權利、限制、風險與替代方案。"],
    ["WC-022", ["behavior:justiceOrientation:high", "behavior:groupCompromise:low"], "是非清楚也可能增加團隊摩擦", "原則感很強、妥協意願較低時，適合界線清楚的判斷工作，但團隊協商成本會提高。", "別人採用不完美方案時，是否很難先共同執行？", "區分不可退讓的底線與可以協商的方法。"],
    ["WC-023", ["behavior:persuasionComfort:high", "behavior:justiceOrientation:low"], "彈性溝通較適合協商與推動", "較能依對象調整說法、接受灰度，可支援業務協調與政策推動。", "是否能在不違背底線下調整表達方式？", "保留書面原則，避免彈性變成承諾過度。"],
    ["WC-024", ["behavior:independentFocus:high", "behavior:collaborationNeed:low"], "獨立深度工作較能維持品質", "偏好自行掌握節奏、減少頻繁互動，較適合研究、資料或技術任務。", "長時間獨立作業時是否反而更專注？", "選擇責任邊界清楚的職務，並建立必要回報節點。"]
  ];

  return {
    id: "DB-012",
    name: "職務內容與生活配性建言庫",
    version: "2026.06.15-v1",
    description: "把職群排名與生活行為自評交叉，辨認工作順手點與長期摩擦。",
    rules: rows.map(([id, all, title, basis, verify, action]) => ({
      id, all, title, basis, verify, action, category: "工作情境"
    }))
  };
});
