(function (root, factory) {
  const database = factory();
  if (typeof module === "object" && module.exports) module.exports = database;
  else root.SubroleTaskMatrix = database;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const taskLabels = {
    legalJudgment: "法規判斷",
    documentation: "文書紀錄",
    numericalCheck: "數字核對",
    publicService: "民眾服務",
    conflictHandling: "衝突處理",
    fieldOperation: "現場勤務",
    collaboration: "團隊協作",
    independentResearch: "獨立研究",
    publicBriefing: "公開說明",
    emergencyDecision: "緊急決策",
    shiftTolerance: "輪班適應",
    technicalUpdate: "技術更新"
  };

  const rows = [
    ["legal-policy", "legal-audit", "法制與法規研議", ["法制", "法規研議"], { legalJudgment:1,documentation:.95,independentResearch:.9,publicBriefing:.55,collaboration:.55 }],
    ["integrity-audit", "legal-audit", "廉政、稽核與調查", ["法律廉政", "財經廉政", "稽核"], { legalJudgment:.95,documentation:.9,numericalCheck:.7,conflictHandling:.8,fieldOperation:.45,emergencyDecision:.55 }],
    ["tax-finance", "finance-accounting", "財稅與金融管理", ["財稅行政", "金融保險"], { legalJudgment:.75,documentation:.8,numericalCheck:1,publicService:.55,independentResearch:.65 }],
    ["accounting-audit", "finance-accounting", "會計與審計", ["會計", "審計"], { legalJudgment:.65,documentation:.95,numericalCheck:1,collaboration:.5,independentResearch:.65 }],
    ["general-affairs", "general-administration", "綜合行政與人事", ["一般行政", "人事行政"], { legalJudgment:.75,documentation:.95,publicService:.65,collaboration:.85,publicBriefing:.55 }],
    ["civil-household", "general-administration", "民政、戶政與窗口服務", ["一般民政", "戶政"], { legalJudgment:.75,documentation:.85,publicService:1,conflictHandling:.65,collaboration:.75 }],
    ["social-service", "social-education", "社會與勞政服務", ["社會行政", "勞工行政"], { legalJudgment:.65,documentation:.75,publicService:1,conflictHandling:.7,collaboration:.9,fieldOperation:.5 }],
    ["education-policy", "social-education", "教育與文化服務行政", ["教育行政", "原住民族行政"], { legalJudgment:.55,documentation:.8,publicService:.8,collaboration:.9,publicBriefing:.7,independentResearch:.65 }],
    ["economic-analysis", "economic-planning", "經濟分析與政策研究", ["經建行政", "公平交易管理"], { legalJudgment:.55,documentation:.8,numericalCheck:.7,independentResearch:1,publicBriefing:.65,collaboration:.7 }],
    ["business-promotion", "economic-planning", "商業管理與政策推動", ["商業行政", "企業管理"], { legalJudgment:.55,documentation:.75,publicService:.65,collaboration:.9,publicBriefing:.8,emergencyDecision:.45 }],
    ["software-systems", "data-information", "資訊系統與資安維運", ["資訊處理", "資通安全"], { documentation:.65,emergencyDecision:.75,independentResearch:.9,technicalUpdate:1,collaboration:.7,shiftTolerance:.45 }],
    ["statistics-data", "data-information", "統計分析與資料治理", ["統計", "資料治理"], { documentation:.8,numericalCheck:1,independentResearch:1,publicBriefing:.55,technicalUpdate:.85 }],
    ["construction-management", "engineering", "工程設計與履約管理", ["土木工程", "建築工程"], { documentation:.8,numericalCheck:.8,fieldOperation:.85,conflictHandling:.55,collaboration:.8,technicalUpdate:.75 }],
    ["electromechanical", "engineering", "機電設備與技術維護", ["機械工程", "電力工程", "電子工程"], { documentation:.65,numericalCheck:.8,fieldOperation:.8,emergencyDecision:.75,shiftTolerance:.55,technicalUpdate:1 }],
    ["health-administration", "health-environment", "衛生行政與風險溝通", ["衛生行政", "食品衛生行政"], { legalJudgment:.65,documentation:.8,publicService:.8,publicBriefing:.8,emergencyDecision:.65,collaboration:.85 }],
    ["environment-inspection", "health-environment", "環境技術與稽查", ["環境工程", "環保行政", "衛生技術"], { legalJudgment:.65,documentation:.75,fieldOperation:.8,conflictHandling:.6,technicalUpdate:.85,emergencyDecision:.65 }],
    ["cultural-communication", "culture-diplomacy", "文化新聞與公共溝通", ["文化行政", "新聞"], { documentation:.7,publicService:.75,collaboration:.85,publicBriefing:1,emergencyDecision:.55,independentResearch:.55 }],
    ["foreign-affairs", "culture-diplomacy", "外交與國際事務", ["外交領事", "國際文教行政"], { legalJudgment:.45,documentation:.75,conflictHandling:.75,collaboration:.9,publicBriefing:1,emergencyDecision:.75,fieldOperation:.55 }],
    ["police-investigation", "justice-enforcement", "警察、犯罪防治與調查", ["行政警察", "犯罪防治", "調查工作"], { legalJudgment:.8,documentation:.7,conflictHandling:1,fieldOperation:1,emergencyDecision:1,shiftTolerance:.9,collaboration:.85 }],
    ["court-corrections", "justice-enforcement", "法院與矯正執行", ["法院書記官", "監獄官"], { legalJudgment:.9,documentation:1,conflictHandling:.75,publicService:.55,shiftTolerance:.55,collaboration:.75 }],
    ["agriculture-forestry", "agriculture-natural", "農林與自然保育", ["農業技術", "林業技術", "自然保育"], { documentation:.65,fieldOperation:1,independentResearch:.75,technicalUpdate:.75,collaboration:.6 }],
    ["water-conservation", "agriculture-natural", "水產與水土保持", ["水產技術", "水土保持工程"], { documentation:.65,numericalCheck:.65,fieldOperation:1,emergencyDecision:.6,technicalUpdate:.85 }],
    ["land-administration", "land-transport-planning", "地政與測量管理", ["地政", "測量製圖"], { legalJudgment:.8,documentation:.85,numericalCheck:.8,fieldOperation:.65,conflictHandling:.6,technicalUpdate:.7 }],
    ["transport-urban", "land-transport-planning", "交通與都市規劃", ["交通行政", "交通技術", "都市計畫技術"], { legalJudgment:.6,documentation:.8,numericalCheck:.75,collaboration:.9,publicBriefing:.7,fieldOperation:.55,independentResearch:.8 }]
  ];

  return {
    id: "DB-014",
    name: "國考子職能與實際工作任務矩陣",
    version: "2026.06.15-v1",
    evidenceLevel: "官方類科名稱加上本專案任務拆解；非官方職務適性測驗",
    officialReference: "https://wwwc.moex.gov.tw/main/content/wfrmContentLink3.aspx?menu_id=1675",
    taskLabels,
    subroles: rows.map(([id, parentRole, name, examples, tasks]) => ({
      id, parentRole, name, examples, tasks
    }))
  };
});
