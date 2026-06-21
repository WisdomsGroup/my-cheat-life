(function (root, factory) {
  const database = factory();
  if (typeof module === "object" && module.exports) module.exports = database;
  else root.ThreeFactorCrossAdvice = database;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  const rows = [
    ["TF-001",["behavior:justiceOrientation:high","behavior:conflictReadiness:high","behavior:evidenceFairness:high"],"原則感已有行為證據支持","你不只主觀重視公平，近期也曾在關係壓力下採用一致標準。","適合法規、稽核與執法判斷，但仍要以證據與程序約束直覺。"],
    ["TF-002",["behavior:justiceOrientation:high","behavior:groupCompromise:low","behavior:stakeholderBalance:low"],"原則明確但容易形成二分判斷","堅持底線是優勢；若妥協與多方權衡同時偏低，團隊與政策工作可能增加摩擦。","先區分違法、違反程序、效果不佳與單純不認同。"],
    ["TF-003",["behavior:conflictReadiness:high","behavior:publicAccountability:high","trait:pressure:high"],"高壓公開責任具有交叉支持","主觀反應、公開責任與壓力能力同時支持承擔高曝光任務。","仍需確認長期輪班、衝突密度與恢復速度。"],
    ["TF-004",["behavior:empathyBoundary:high","behavior:serviceBoundary:high","behavior:evidenceEmotion:high"],"服務同理具有現實行為支持","能理解情緒、維持界線，且近期有實際經驗，是服務職的重要保護因子。","適合服務與協調，但不要把能承受變成無限制承擔。"],
    ["TF-005",["behavior:detailDiscipline:high","behavior:routineTolerance:high","behavior:evidenceDetail:high"],"精準例行工作具有穩定支持","核對紀律、重複耐受與實際抓錯經驗一致。","可優先考慮財會、稽核、法制與資料品質任務。"],
    ["TF-006",["behavior:detailDiscipline:high","behavior:routineTolerance:low","behavior:evidenceRoutine:low"],"細心不等於能長期忍受例行","你可能在短期內很精準，但長期重複容易讓品質下降。","評估職務的例行比例與輪調空間。"],
    ["TF-007",["behavior:technicalCuriosity:high","behavior:independentFocus:high","behavior:evidenceTechnical:high"],"技術追因已有實際成果支持","追查根因、獨立專注與近期行為一致，較支持資訊、工程與分析任務。","同步練習紀錄與跨部門說明，避免只在個人腦中完成。"],
    ["TF-008",["behavior:ambiguityTolerance:high","behavior:stakeholderBalance:high","behavior:collaborationNeed:high"],"複雜政策協調具有組合優勢","能承受不完整資訊、整理多方需求並主動協作，較適合政策與規劃型工作。","每次判斷仍需寫明假設、證據與修正條件。"],
    ["TF-009",["behavior:fieldReadiness:high","behavior:conflictReadiness:high","trait:stamina:high"],"外勤高壓任務具有交叉支持","現場變動、衝突處理與持續耐力同時偏高。","報考前仍應確認安全風險、輪班及家庭生活適配。"],
    ["TF-010",["behavior:publicAccountability:low","behavior:conflictReadiness:low","behavior:fieldReadiness:low"],"高曝光現場職務可能長期消耗","公開追問、正面衝突與現場變動都較不自然。","優先考慮研究、資料、內勤或責任邊界較清楚的職務。"],
    ["TF-011",["behavior:persuasionComfort:high","behavior:groupCompromise:high","behavior:evidencePersuasion:high"],"溝通推動能力已有行為支持","能調整說法、接受團隊決策，近期也有推動事情的經驗。","適合行政協調、政策推動、文化外交與服務職務。"],
    ["TF-012",["behavior:independentFocus:high","behavior:collaborationNeed:low","behavior:publicAccountability:low"],"較適合低干擾的深度責任","偏好獨立掌握、較少協作與公開追問。","可發展資料、研究、技術後台，但仍需設定必要回報。"],
    ["TF-013",["tengod:印星:high","trait:memory:high","behavior:detailDiscipline:high"],"吸收與精準能形成法規優勢","命理符號、能力輪廓與生活核對習慣共同支持規則型學習。","避免只做整理，仍需用輸出與案例驗證。"],
    ["TF-014",["tengod:食傷:high","trait:expression:high","behavior:publicAccountability:high"],"表達訊號能承接公開輸出","食傷、表達能力與公開責任一致，較支持申論、口試與說明工作。","控制篇幅並確認內容有依據。"],
    ["TF-015",["tengod:官殺:high","behavior:justiceOrientation:high","behavior:detailDiscipline:high"],"制度責任與規則感相互支持","制度訊號、原則感與核對紀律同時出現。","適合制度職，但需避免過度僵化或把責任全攬在自己身上。"],
    ["TF-016",["behavior:evidenceAwareness:high","behavior:moralNuance:high","behavior:justiceOrientation:high"],"原則判斷具備證據與灰度支持","重視公平，同時能區分證據層次與不同規範問題。","較支持法制、調查與政策判斷，仍需記錄推論過程。"],
    ["TF-017",["behavior:authorityCompliance:high","behavior:feedbackAcceptance:high","behavior:groupCompromise:high"],"制度內協作適應較完整","能保留意見、接受修正並完成共同決定。","適合行政、工程及指揮體系，但不要隱藏必要異議。"],
    ["TF-018",["behavior:confidentiality:high","behavior:evidenceAwareness:high","behavior:detailDiscipline:high"],"敏感資訊與精準工作較有支持","保密、查證與核對三項同時偏高。","較支持廉政、司法、財會與資料治理。"],
    ["TF-019",["behavior:powerRestraint:high","behavior:justiceOrientation:high","behavior:empathyBoundary:high"],"權限使用兼具原則與節制","重視規則、比例與他人處境，較能降低權力使用過度。","適合執法與行政裁量，但仍需正式監督與紀錄。"],
    ["TF-020",["behavior:riskCalibration:high","behavior:decisionPacing:high","behavior:evidenceAwareness:high"],"決策速度能配合風險與證據","不只追求快或完整，而是依後果與證據調整。","較支持緊急應變、工程風險與政策決策。"],
    ["TF-021",["behavior:responsibilityOwnership:high","behavior:feedbackAcceptance:high","behavior:errorResponse:high"],"錯誤後的修正能力較完整","能承擔、吸收回饋並依影響程度處理錯誤。","適合高責任工作，也是長期成長的重要支持。"],
    ["TF-022",["behavior:refusalAbility:high","behavior:serviceBoundary:high","behavior:empathyBoundary:high"],"服務界線具有三重支持","能理解需求、清楚拒絕並維持情緒界線。","較支持窗口、社政與衛生服務，降低過度承諾風險。"],
    ["TF-023",["behavior:emotionalRecovery:high","behavior:conflictReadiness:high","behavior:publicAccountability:high"],"衝突後仍能承接公開責任","不只敢面對衝突，也較能恢復並繼續工作。","較支持執法、外交、稽查與高壓窗口。"],
    ["TF-024",["behavior:boredomTolerance:high","behavior:delayedGratification:high","behavior:routineTolerance:high"],"長期低刺激任務具有穩定支持","重複、延遲成果與例行流程都較能承受。","較支持財會、行政、研究累積及長期備考。"],
    ["TF-025",["behavior:informationOrganization:high","behavior:independentFocus:high","behavior:technicalCuriosity:high"],"資料與技術深度工作組合突出","能整理混亂資訊、獨立專注並追查根因。","較支持資料治理、資訊、統計與技術研究。"]
  ];
  return {
    id:"DB-016", name:"三條件以上優勢與風險交叉建言庫", version:"2026.06.15-v1",
    rules: rows.map(([id,all,title,basis,action])=>({id,all,title,basis,verify:"請用最近半年的具體事件確認這個組合是否穩定出現。",action,category:"三條件交叉"}))
  };
});
