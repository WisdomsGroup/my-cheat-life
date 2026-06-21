(function (root, factory) {
  const database = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = database;
  } else {
    root.ExamRoleDatabase = database;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const roles = [
    {
      id: "legal-audit",
      name: "法制、廉政與稽核",
      examples: ["法制", "法律廉政", "財經廉政", "司法行政"],
      elements: { 木: 0.05, 火: 0.08, 土: 0.17, 金: 0.48, 水: 0.22 },
      traits: { structure: 0.95, analysis: 0.9, detail: 0.95, memory: 0.82, expression: 0.65, empathy: 0.35, stamina: 0.8, pressure: 0.82, adaptability: 0.5, execution: 0.75 },
      modes: { law: 1, essay: 0.82, quantitative: 0.35, technical: 0.4 },
      environments: { desk: 0.9, service: 0.45, field: 0.35, technical: 0.45 },
      cautions: ["規則細節與文字精準度要求高", "廉政、稽核類可能承受衝突與責任壓力"]
    },
    {
      id: "finance-accounting",
      name: "財稅、會計與審計",
      examples: ["財稅行政", "會計", "審計", "金融保險"],
      elements: { 木: 0.04, 火: 0.04, 土: 0.28, 金: 0.46, 水: 0.18 },
      traits: { structure: 0.95, analysis: 0.86, detail: 1, memory: 0.72, expression: 0.45, empathy: 0.25, stamina: 0.88, pressure: 0.75, adaptability: 0.42, execution: 0.9 },
      modes: { law: 0.7, essay: 0.5, quantitative: 1, technical: 0.72 },
      environments: { desk: 1, service: 0.35, field: 0.2, technical: 0.7 },
      cautions: ["數字與程序錯誤容忍度低", "長時間例行核對容易造成疲勞性失誤"]
    },
    {
      id: "general-administration",
      name: "一般行政、人事與戶政",
      examples: ["一般行政", "一般民政", "人事行政", "戶政"],
      elements: { 木: 0.16, 火: 0.12, 土: 0.35, 金: 0.25, 水: 0.12 },
      traits: { structure: 0.83, analysis: 0.62, detail: 0.78, memory: 0.75, expression: 0.65, empathy: 0.64, stamina: 0.82, pressure: 0.67, adaptability: 0.66, execution: 0.86 },
      modes: { law: 0.88, essay: 0.72, quantitative: 0.35, technical: 0.3 },
      environments: { desk: 0.85, service: 0.72, field: 0.25, technical: 0.25 },
      cautions: ["法規與行政實務範圍廣", "民眾服務與跨單位協調需要情緒穩定"]
    },
    {
      id: "social-education",
      name: "社會、教育與勞政服務",
      examples: ["社會行政", "教育行政", "勞工行政", "原住民族行政"],
      elements: { 木: 0.36, 火: 0.13, 土: 0.2, 金: 0.08, 水: 0.23 },
      traits: { structure: 0.58, analysis: 0.68, detail: 0.58, memory: 0.72, expression: 0.8, empathy: 1, stamina: 0.75, pressure: 0.62, adaptability: 0.85, execution: 0.67 },
      modes: { law: 0.64, essay: 1, quantitative: 0.2, technical: 0.28 },
      environments: { desk: 0.58, service: 1, field: 0.55, technical: 0.18 },
      cautions: ["服務對象需求複雜，情緒勞動較高", "申論需要兼顧政策、法規與實務案例"]
    },
    {
      id: "economic-planning",
      name: "經建、商業與政策規劃",
      examples: ["經建行政", "商業行政", "企業管理", "公平交易管理"],
      elements: { 木: 0.3, 火: 0.1, 土: 0.25, 金: 0.13, 水: 0.22 },
      traits: { structure: 0.7, analysis: 0.9, detail: 0.65, memory: 0.55, expression: 0.75, empathy: 0.48, stamina: 0.7, pressure: 0.65, adaptability: 0.88, execution: 0.74 },
      modes: { law: 0.48, essay: 0.86, quantitative: 0.72, technical: 0.5 },
      environments: { desk: 0.9, service: 0.45, field: 0.2, technical: 0.5 },
      cautions: ["需要同時處理理論、數據與政策文字", "政策題沒有唯一答案，需建立論證結構"]
    },
    {
      id: "data-information",
      name: "資訊、統計與數位治理",
      examples: ["資訊處理", "統計", "資料科學相關類科"],
      elements: { 木: 0.09, 火: 0.08, 土: 0.13, 金: 0.32, 水: 0.38 },
      traits: { structure: 0.92, analysis: 1, detail: 0.9, memory: 0.48, expression: 0.48, empathy: 0.2, stamina: 0.78, pressure: 0.7, adaptability: 0.86, execution: 0.82 },
      modes: { law: 0.2, essay: 0.45, quantitative: 0.92, technical: 1 },
      environments: { desk: 0.92, service: 0.25, field: 0.2, technical: 1 },
      cautions: ["技術更新快，不能只靠背誦舊題", "除計算與程式外，也要能寫出完整說明"]
    },
    {
      id: "engineering",
      name: "工程、機電與建築技術",
      examples: ["土木工程", "機械工程", "電力工程", "電子工程", "建築工程"],
      elements: { 木: 0.08, 火: 0.25, 土: 0.27, 金: 0.3, 水: 0.1 },
      traits: { structure: 0.88, analysis: 0.88, detail: 0.85, memory: 0.42, expression: 0.38, empathy: 0.18, stamina: 0.86, pressure: 0.76, adaptability: 0.58, execution: 0.95 },
      modes: { law: 0.22, essay: 0.35, quantitative: 0.92, technical: 1 },
      environments: { desk: 0.55, service: 0.18, field: 0.78, technical: 1 },
      cautions: ["專業科目深度高，基礎斷層會快速累積", "實務職務可能包含現場、工期與安全責任"]
    },
    {
      id: "health-environment",
      name: "衛生、醫療與環境",
      examples: ["衛生行政", "衛生技術", "環境工程", "環保行政", "食品衛生行政"],
      elements: { 木: 0.28, 火: 0.13, 土: 0.24, 金: 0.12, 水: 0.23 },
      traits: { structure: 0.72, analysis: 0.82, detail: 0.82, memory: 0.72, expression: 0.55, empathy: 0.72, stamina: 0.78, pressure: 0.72, adaptability: 0.7, execution: 0.78 },
      modes: { law: 0.55, essay: 0.65, quantitative: 0.58, technical: 0.86 },
      environments: { desk: 0.55, service: 0.65, field: 0.65, technical: 0.82 },
      cautions: ["法規、科學與風險溝通需同時掌握", "公共衛生事件可能有時效與壓力"]
    },
    {
      id: "culture-diplomacy",
      name: "文化、新聞與外交溝通",
      examples: ["文化行政", "新聞", "外交領事", "國際文教行政"],
      elements: { 木: 0.22, 火: 0.32, 土: 0.08, 金: 0.08, 水: 0.3 },
      traits: { structure: 0.46, analysis: 0.72, detail: 0.55, memory: 0.65, expression: 1, empathy: 0.78, stamina: 0.68, pressure: 0.76, adaptability: 0.95, execution: 0.58 },
      modes: { law: 0.38, essay: 1, quantitative: 0.18, technical: 0.28 },
      environments: { desk: 0.52, service: 0.82, field: 0.58, technical: 0.22 },
      cautions: ["文字、語言與即時判斷要求高", "外交與新聞類可能面對高度不確定性及公開壓力"]
    },
    {
      id: "justice-enforcement",
      name: "警察、司法執行與調查",
      examples: ["行政警察", "犯罪防治", "調查工作", "監獄官", "法院書記官"],
      elements: { 木: 0.04, 火: 0.31, 土: 0.24, 金: 0.33, 水: 0.08 },
      traits: { structure: 0.88, analysis: 0.75, detail: 0.75, memory: 0.65, expression: 0.62, empathy: 0.42, stamina: 0.92, pressure: 1, adaptability: 0.68, execution: 1 },
      modes: { law: 0.88, essay: 0.64, quantitative: 0.3, technical: 0.45 },
      environments: { desk: 0.42, service: 0.62, field: 1, technical: 0.42 },
      cautions: ["衝突、輪班或現場壓力可能較高", "部分考試另有體能、口試或專業資格要求"]
    },
    {
      id: "agriculture-natural",
      name: "農林、水產與自然資源",
      examples: ["農業技術", "林業技術", "水產技術", "自然保育", "水土保持工程"],
      elements: { 木: 0.42, 火: 0.06, 土: 0.25, 金: 0.05, 水: 0.22 },
      traits: { structure: 0.55, analysis: 0.72, detail: 0.7, memory: 0.52, expression: 0.42, empathy: 0.45, stamina: 0.82, pressure: 0.58, adaptability: 0.78, execution: 0.82 },
      modes: { law: 0.2, essay: 0.5, quantitative: 0.58, technical: 0.9 },
      environments: { desk: 0.35, service: 0.35, field: 1, technical: 0.82 },
      cautions: ["專業分類細，報考資格與科系限制需先確認", "部分職務需要戶外調查與跨區工作"]
    },
    {
      id: "land-transport-planning",
      name: "地政、交通與都市規劃",
      examples: ["地政", "交通行政", "交通技術", "都市計畫技術", "測量製圖"],
      elements: { 木: 0.16, 火: 0.08, 土: 0.36, 金: 0.27, 水: 0.13 },
      traits: { structure: 0.82, analysis: 0.86, detail: 0.86, memory: 0.6, expression: 0.55, empathy: 0.38, stamina: 0.78, pressure: 0.72, adaptability: 0.64, execution: 0.88 },
      modes: { law: 0.58, essay: 0.58, quantitative: 0.75, technical: 0.78 },
      environments: { desk: 0.65, service: 0.48, field: 0.72, technical: 0.78 },
      cautions: ["法規、圖資、計算與現場條件常同時出現", "地政與都市規劃涉及利害關係協調"]
    }
  ];

  return {
    id: "DB-001",
    name: "國考職群職能矩陣",
    description: "定義國考職群的五行、能力、題型、工作環境與風險需求，供離線匹配引擎排序。",
    version: "2026.06.15-v1",
    evidenceLevel: "專案規則庫，非官方心理測驗或錄取統計",
    methodology: {
      elementWeight: 0.4,
      traitWeight: 0.35,
      modeWeight: 0.15,
      environmentWeight: 0.1,
      note: "職能群為本專案離線分類，不是考選部官方心理測驗或錄取模型。"
    },
    roles
  };
});
