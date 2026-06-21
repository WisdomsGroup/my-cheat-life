(function (root, factory) {
  const database = factory();
  if (typeof module === "object" && module.exports) module.exports = database;
  else root.RealBehaviorEvidence = database;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const scale = [
    { value: -2, label: "近半年幾乎沒有" },
    { value: -1, label: "近半年偶爾發生" },
    { value: 0, label: "想不起來／不適用" },
    { value: 1, label: "近半年發生多次" },
    { value: 2, label: "近半年經常發生" }
  ];
  const rows = [
    ["evidenceFairness","justiceOrientation","近半年，我曾在熟人涉及規則或責任時，仍採用與其他人相同的處理標準。"],
    ["evidenceConflict","conflictReadiness","近半年，我曾在對方強烈反對或提高音量時，仍把重要內容清楚說完。"],
    ["evidenceTeam","groupCompromise","近半年，我曾配合執行不是自己首選、但已正式決定的團隊方案。"],
    ["evidenceAmbiguity","ambiguityTolerance","近半年，我曾在資訊不完整時提出暫行方案，並在新資料出現後主動修正。"],
    ["evidencePersuasion","persuasionComfort","近半年，我曾針對不同對象調整說明方式，讓事情順利推進。"],
    ["evidenceEmotion","empathyBoundary","近半年，我曾協助情緒強烈的人，並能在事情結束後恢復自己的狀態。"],
    ["evidenceService","serviceBoundary","近半年，我曾拒絕超出權限或能力的要求，同時提供替代做法。"],
    ["evidenceDetail","detailDiscipline","近半年，我曾靠固定核對流程發現原本可能被忽略的錯誤。"],
    ["evidenceRoutine","routineTolerance","近半年，我曾連續數週處理重複工作，品質仍維持穩定。"],
    ["evidenceField","fieldReadiness","近半年，我曾在地點、時間或計畫臨時改變後，仍完成原定任務。"],
    ["evidencePublic","publicAccountability","近半年，我曾親自說明自己的決定，並接受他人追問或檢視。"],
    ["evidenceTechnical","technicalCuriosity","近半年，我曾把反覆發生的問題追查到根本原因，而不只暫時處理。"],
    ["evidenceIndependent","independentFocus","近半年，我曾獨立專注處理複雜任務至少一小時，且有具體成果。"],
    ["evidenceCollaboration","collaborationNeed","近半年，我曾主動找適合的人交換資訊或分工，改善最後成果。"],
    ["evidenceStakeholder","stakeholderBalance","近半年，我曾整理互相衝突的多方需求，再提出折衷或排序方案。"],
    ["evidenceAuthority","authorityCompliance","近半年，我曾在保留不同意見的情況下，仍依正式決定完成工作。"],
    ["evidenceMoralNuance","moralNuance","近半年，我曾把一個爭議拆成違法、程序、效果與價值立場分別討論。"],
    ["evidenceFacts","evidenceAwareness","近半年，我曾因證據不足而修正原先很有把握的判斷。"],
    ["evidenceConfidentiality","confidentiality","近半年，我曾主動停止或改變談話，避免透露不該公開的資訊。"],
    ["evidenceRisk","riskCalibration","近半年，我曾因錯誤代價不同，而對兩件事情採取不同決策速度。"],
    ["evidenceOwnership","responsibilityOwnership","近半年，我曾在自己造成問題後先補救、通知受影響者並留下改善措施。"],
    ["evidenceFeedback","feedbackAcceptance","近半年，我曾因他人指出問題而實際修改方法或成果。"],
    ["evidencePower","powerRestraint","近半年，我曾在有權直接決定時，仍主動確認比例、程序或留下理由。"],
    ["evidenceRefusal","refusalAbility","近半年，我曾清楚拒絕不合理要求，並說明界線或替代方案。"],
    ["evidenceRecovery","emotionalRecovery","近半年，我曾在衝突或挫折後恢復狀態，完成當天後續重要工作。"],
    ["evidenceBoredom","boredomTolerance","近半年，我曾在缺乏新鮮感的重複任務中持續維持品質。"],
    ["evidenceDelay","delayedGratification","近半年，我曾為數月後的成果持續完成沒有立即回饋的步驟。"],
    ["evidenceOrganize","informationOrganization","近半年，我曾把混亂資料整理成分類、版本與優先順序。"],
    ["evidenceDecision","decisionPacing","近半年，我曾為高風險決定放慢，也曾為低風險決定快速行動。"],
    ["evidenceError","errorResponse","近半年，我曾依錯誤影響程度決定立即修正、排程修正或保留紀錄。"]
  ];
  return {
    id: "DB-015",
    name: "近半年現實行為證據題庫",
    version: "2026.06.15-v1",
    description: "用曾經發生的具體行為驗證主觀觀念；不要求考試成績或職涯背景。",
    scale,
    questions: rows.map(([id, dimension, prompt]) => ({ id, dimension, prompt }))
  };
});
