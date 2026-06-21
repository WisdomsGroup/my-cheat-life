(function (root, factory) {
  const database = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = database;
  } else {
    root.SelfReportMatchingRules = database;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  return {
    id: "DB-003",
    name: "個人偏好與情緒校正規則",
    version: "2026.06.15-v3",
    description: "用本人回報的壓力反應、工作偏好與一般生活行為，校正命理規則產生的職能輪廓。",
    evidenceLevel: "使用者自我回報與專案權重",
    pressureOptions: [
      { value: "unknown", label: "不確定／先不校正" },
      { value: "stable", label: "壓力下仍能照計畫執行" },
      { value: "tense", label: "容易緊張，但會更仔細" },
      { value: "impulsive", label: "容易急躁或搶快" },
      { value: "avoidant", label: "壓力大時容易拖延或逃避" }
    ],
    examModeOptions: [
      { value: "balanced", label: "尚未確定／題型均可" },
      { value: "law", label: "法規與記憶題" },
      { value: "essay", label: "申論與文字表達" },
      { value: "quantitative", label: "數字、計算與統計" },
      { value: "technical", label: "專業技術與實作" }
    ],
    environmentOptions: [
      { value: "flexible", label: "尚未確定／皆可" },
      { value: "desk", label: "內勤、文書與制度作業" },
      { value: "service", label: "民眾服務與溝通協調" },
      { value: "field", label: "外勤、現場與機動任務" },
      { value: "technical", label: "技術、設備與系統工作" }
    ],
    pressureTraitAdjustments: {
      stable: { pressure: 0.95, stamina: 0.8 },
      tense: { pressure: 0.35, detail: 0.72 },
      impulsive: { pressure: 0.48, execution: 0.75, detail: 0.35 },
      avoidant: { pressure: 0.25, stamina: 0.42 },
      unknown: {}
    },
    examModeProfiles: {
      law: { law: 1 },
      essay: { essay: 1 },
      quantitative: { quantitative: 1 },
      technical: { technical: 1 },
      balanced: { law: 0.55, essay: 0.55, quantitative: 0.55, technical: 0.55 }
    },
    environmentProfiles: {
      desk: { desk: 1 },
      service: { service: 1 },
      field: { field: 1 },
      technical: { technical: 1 },
      flexible: { desk: 0.55, service: 0.55, field: 0.55, technical: 0.55 }
    },
    behaviorScale: [
      { value: -2, label: "非常不像我" },
      { value: -1, label: "比較不像我" },
      { value: 0, label: "看情況／不確定" },
      { value: 1, label: "比較像我" },
      { value: 2, label: "非常像我" }
    ],
    behaviorQuestions: [
      {
        id: "justiceOrientation",
        prompt: "即使對方和我關係很好，只要涉及明確規則，我仍傾向用相同標準處理。",
        positiveMeaning: "原則與公平一致性較強",
        negativeMeaning: "較重情境與關係彈性",
        traitEffects: { structure: 0.08, detail: 0.04, pressure: 0.03 },
        roleEffects: { "legal-audit": 0.08, "justice-enforcement": 0.08, "finance-accounting": 0.03, "culture-diplomacy": -0.03, "social-education": -0.02 }
      },
      {
        id: "conflictReadiness",
        prompt: "面對態度強硬或公開反對我的人，我仍能把事情講完並維持原本的判斷。",
        positiveMeaning: "衝突承受與立場維持較強",
        negativeMeaning: "較容易避開正面衝突",
        traitEffects: { pressure: 0.1, expression: 0.04, execution: 0.04 },
        roleEffects: { "justice-enforcement": 0.08, "legal-audit": 0.05, "culture-diplomacy": 0.04, "general-administration": 0.02 }
      },
      {
        id: "groupCompromise",
        prompt: "團體最後採用的方案不是我的首選時，只要沒有碰到底線，我仍能配合完成。",
        positiveMeaning: "團隊妥協與共同執行較順",
        negativeMeaning: "較堅持自己的最佳方案",
        traitEffects: { adaptability: 0.07, empathy: 0.06, execution: 0.03 },
        roleEffects: { "general-administration": 0.06, "social-education": 0.07, "economic-planning": 0.05, "culture-diplomacy": 0.06, "justice-enforcement": 0.02 }
      },
      {
        id: "ambiguityTolerance",
        prompt: "規則或資訊還不完整時，我可以先做暫時判斷，之後再依新資料修正。",
        positiveMeaning: "對模糊與變動的容忍較高",
        negativeMeaning: "需要較明確的規則才安心",
        traitEffects: { adaptability: 0.1, analysis: 0.04, pressure: 0.03 },
        roleEffects: { "economic-planning": 0.08, "culture-diplomacy": 0.06, "data-information": 0.04, "general-administration": 0.02, "finance-accounting": -0.02 }
      },
      {
        id: "persuasionComfort",
        prompt: "為了讓事情推進，我能依不同對象調整說法，但不會改變重要事實。",
        positiveMeaning: "說服與情境溝通較自然",
        negativeMeaning: "偏好直接說明，不喜歡調整表達",
        traitEffects: { expression: 0.09, empathy: 0.05, adaptability: 0.05 },
        roleEffects: { "culture-diplomacy": 0.08, "social-education": 0.06, "economic-planning": 0.06, "general-administration": 0.05 }
      },
      {
        id: "empathyBoundary",
        prompt: "別人情緒很重時，我能理解對方，但不會把他的情緒整天帶在自己身上。",
        positiveMeaning: "同理與情緒界線較平衡",
        negativeMeaning: "容易過度投入或抽離",
        traitEffects: { empathy: 0.08, pressure: 0.06, stamina: 0.03 },
        roleEffects: { "social-education": 0.09, "health-environment": 0.05, "general-administration": 0.04, "culture-diplomacy": 0.04 }
      },
      {
        id: "serviceBoundary",
        prompt: "面對急迫要求，我能耐心說明，但不會為了讓對方滿意而做出不適當承諾。",
        positiveMeaning: "服務溝通與規則界線較穩",
        negativeMeaning: "容易過度承諾或直接拒絕",
        traitEffects: { empathy: 0.06, structure: 0.05, pressure: 0.05 },
        roleEffects: { "general-administration": 0.07, "social-education": 0.07, "health-environment": 0.05, "legal-audit": 0.03 }
      },
      {
        id: "detailDiscipline",
        prompt: "即使事情已經做過很多次，我仍願意照固定步驟核對，不因熟悉而省略。",
        positiveMeaning: "重複核對與程序紀律較穩",
        negativeMeaning: "熟悉後容易依直覺省略步驟",
        traitEffects: { detail: 0.11, structure: 0.06, stamina: 0.03 },
        roleEffects: { "finance-accounting": 0.09, "legal-audit": 0.07, "land-transport-planning": 0.05, "health-environment": 0.04, "engineering": 0.04 }
      },
      {
        id: "routineTolerance",
        prompt: "工作內容有固定流程、需要長期重複時，我仍能維持品質，不會很快厭煩。",
        positiveMeaning: "例行耐受與穩定性較高",
        negativeMeaning: "需要較多變化才維持投入",
        traitEffects: { stamina: 0.09, structure: 0.05, detail: 0.04 },
        roleEffects: { "finance-accounting": 0.08, "general-administration": 0.05, "legal-audit": 0.04, "data-information": 0.02, "culture-diplomacy": -0.02 }
      },
      {
        id: "fieldReadiness",
        prompt: "工作地點、天候或行程臨時改變時，我通常仍能調整並完成任務。",
        positiveMeaning: "外勤與現場變動接受度較高",
        negativeMeaning: "偏好固定、可預期的工作場所",
        traitEffects: { adaptability: 0.08, stamina: 0.06, pressure: 0.04 },
        roleEffects: { "engineering": 0.07, "agriculture-natural": 0.09, "justice-enforcement": 0.07, "land-transport-planning": 0.06, "finance-accounting": -0.03 }
      },
      {
        id: "publicAccountability",
        prompt: "需要公開說明決定、接受追問或承擔結果時，我不會本能地想躲開。",
        positiveMeaning: "公開責任與被檢視耐受較高",
        negativeMeaning: "偏好低曝光、低追問的責任形式",
        traitEffects: { pressure: 0.09, expression: 0.06, execution: 0.03 },
        roleEffects: { "justice-enforcement": 0.07, "culture-diplomacy": 0.08, "legal-audit": 0.05, "economic-planning": 0.04 }
      },
      {
        id: "technicalCuriosity",
        prompt: "設備、系統或流程出錯時，我會想追查原因，而不只想趕快找人處理。",
        positiveMeaning: "技術追因與問題拆解動機較高",
        negativeMeaning: "偏好直接取得可行處理方式",
        traitEffects: { analysis: 0.09, detail: 0.05, adaptability: 0.04 },
        roleEffects: { "data-information": 0.09, "engineering": 0.08, "health-environment": 0.04, "land-transport-planning": 0.04 }
      },
      {
        id: "independentFocus",
        prompt: "長時間獨立處理資料或複雜問題時，我通常比頻繁開會更容易專注。",
        positiveMeaning: "獨立深度工作偏好較高",
        negativeMeaning: "需要互動與共同討論維持投入",
        traitEffects: { analysis: 0.06, stamina: 0.05 },
        roleEffects: { "data-information": 0.06, "finance-accounting": 0.05, "legal-audit": 0.04, "culture-diplomacy": -0.03, "social-education": -0.03 }
      },
      {
        id: "collaborationNeed",
        prompt: "遇到複雜問題時，我願意主動交換資訊、整合別人的專長，而不是全部自己完成。",
        positiveMeaning: "協作與資訊交換較自然",
        negativeMeaning: "偏好自己掌握完整工作",
        traitEffects: { empathy: 0.05, adaptability: 0.05, expression: 0.04 },
        roleEffects: { "general-administration": 0.06, "social-education": 0.06, "economic-planning": 0.06, "health-environment": 0.05, "culture-diplomacy": 0.05 }
      },
      {
        id: "stakeholderBalance",
        prompt: "不同人都有合理但互相衝突的需求時，我能先整理各方底線，而不是立即選邊。",
        positiveMeaning: "多方需求整理與權衡較強",
        negativeMeaning: "偏好先確立主要立場再處理",
        traitEffects: { analysis: 0.06, empathy: 0.07, adaptability: 0.06 },
        roleEffects: { "land-transport-planning": 0.09, "economic-planning": 0.08, "general-administration": 0.05, "culture-diplomacy": 0.06, "social-education": 0.05 }
      }
    ].concat([
      {
        id: "justiceOrientationB",
        dimension: "justiceOrientation",
        reverse: true,
        prompt: "如果違反規定的是熟人，而且事情看起來不嚴重，我通常會先通融，不急著用相同標準處理。"
      },
      {
        id: "conflictReadinessB",
        dimension: "conflictReadiness",
        reverse: true,
        prompt: "對方語氣強硬或當眾質疑我時，我常會先退讓或不再表達，以免衝突擴大。"
      },
      {
        id: "groupCompromiseB",
        dimension: "groupCompromise",
        prompt: "團隊已經正式做出決定後，即使我仍有保留，也能先配合執行並觀察結果。"
      },
      {
        id: "ambiguityToleranceB",
        dimension: "ambiguityTolerance",
        reverse: true,
        prompt: "只要資訊還有缺漏，我通常寧可暫停，也不願先提出可能需要修正的判斷。"
      },
      {
        id: "persuasionComfortB",
        dimension: "persuasionComfort",
        prompt: "同一件事面對不同對象時，我能換一種對方容易理解的方式說明。"
      },
      {
        id: "empathyBoundaryB",
        dimension: "empathyBoundary",
        reverse: true,
        prompt: "聽完別人的困難後，即使事情與我無關，我仍常在很久之後反覆受到影響。"
      },
      {
        id: "serviceBoundaryB",
        dimension: "serviceBoundary",
        reverse: true,
        prompt: "對方很著急或很失望時，我有時會先答應超出規定或能力範圍的事情。"
      },
      {
        id: "detailDisciplineB",
        dimension: "detailDiscipline",
        reverse: true,
        prompt: "事情做熟之後，我傾向相信經驗，會省略部分核對步驟來加快速度。"
      },
      {
        id: "routineToleranceB",
        dimension: "routineTolerance",
        reverse: true,
        prompt: "連續幾天處理相似內容時，即使工作不難，我也很容易失去耐心或品質下降。"
      },
      {
        id: "fieldReadinessB",
        dimension: "fieldReadiness",
        reverse: true,
        prompt: "只要工作地點、天候或時間臨時改變，我的情緒和效率通常會受到明顯影響。"
      },
      {
        id: "publicAccountabilityB",
        dimension: "publicAccountability",
        reverse: true,
        prompt: "需要在眾人面前解釋決定或接受連續追問時，我會希望由別人代為說明。"
      },
      {
        id: "technicalCuriosityB",
        dimension: "technicalCuriosity",
        prompt: "同一個問題反覆出現時，我會想找出根本原因，而不滿足於每次暫時排除。"
      },
      {
        id: "independentFocusB",
        dimension: "independentFocus",
        reverse: true,
        prompt: "如果長時間沒有同事討論或互動，即使任務清楚，我也很難維持專注。"
      },
      {
        id: "collaborationNeedB",
        dimension: "collaborationNeed",
        reverse: true,
        prompt: "即使別人可能有更適合的專長，我通常仍偏好自己把整件事情做完。"
      },
      {
        id: "stakeholderBalanceB",
        dimension: "stakeholderBalance",
        reverse: true,
        prompt: "各方需求互相衝突時，我通常會先判斷誰比較有道理，再決定是否了解其他立場。"
      }
    ]).concat([
      { id:"authorityCompliance", prompt:"即使我不同意正式決定，只要沒有違法或碰到底線，我仍能先依指揮完成工作。", positiveMeaning:"能在保留意見下遵守正式指揮", negativeMeaning:"需要高度認同才容易配合", traitEffects:{structure:.07,execution:.05,adaptability:.03}, roleEffects:{"justice-enforcement":.06,"general-administration":.05,"engineering":.03} },
      { id:"moralNuance", prompt:"我能區分違法、違反程序、效果不好，以及單純不符合我的價值觀。", positiveMeaning:"能處理規範與價值的灰度", negativeMeaning:"較傾向用明確對錯理解爭議", traitEffects:{analysis:.07,adaptability:.05,empathy:.03}, roleEffects:{"legal-audit":.05,"economic-planning":.06,"culture-diplomacy":.06,"social-education":.04} },
      { id:"evidenceAwareness", prompt:"做重要判斷時，我會刻意區分已知事實、合理推測和個人感受。", positiveMeaning:"證據層次分辨較清楚", negativeMeaning:"較容易把直覺與事實混在一起", traitEffects:{analysis:.09,detail:.05,structure:.03}, roleEffects:{"legal-audit":.07,"justice-enforcement":.07,"data-information":.06,"economic-planning":.05} },
      { id:"confidentiality", prompt:"即使分享資訊能讓談話更有趣，我也能控制不透露不該公開的內容。", positiveMeaning:"保密與資訊界線較穩", negativeMeaning:"資訊分享界線需要提醒", traitEffects:{structure:.06,pressure:.04,detail:.04}, roleEffects:{"legal-audit":.06,"justice-enforcement":.06,"finance-accounting":.05,"data-information":.05,"culture-diplomacy":.04} },
      { id:"riskCalibration", prompt:"資訊不足時，我會先評估錯誤代價，再決定立即行動或繼續等待。", positiveMeaning:"風險與行動速度較能平衡", negativeMeaning:"較容易一律搶快或一律等待", traitEffects:{analysis:.07,pressure:.05,adaptability:.05}, roleEffects:{"engineering":.05,"health-environment":.06,"economic-planning":.05,"justice-enforcement":.05} },
      { id:"responsibilityOwnership", prompt:"發現自己造成問題時，我會先處理影響並提出補救，再解釋原因。", positiveMeaning:"責任承擔與補救傾向較強", negativeMeaning:"較容易先解釋或切分責任", traitEffects:{execution:.08,pressure:.06,structure:.03}, roleEffects:{"general-administration":.05,"engineering":.05,"health-environment":.05,"justice-enforcement":.05} },
      { id:"feedbackAcceptance", prompt:"別人指出我可能做錯時，我能先確認內容，而不是立刻為自己辯護。", positiveMeaning:"回饋接受與修正能力較強", negativeMeaning:"被糾正時防衛反應較快", traitEffects:{adaptability:.08,analysis:.04,empathy:.04}, roleEffects:{"economic-planning":.05,"data-information":.04,"engineering":.04,"general-administration":.04} },
      { id:"powerRestraint", prompt:"即使我有權決定，也會確認措施是否必要、合比例並留下理由。", positiveMeaning:"權力使用與程序節制較穩", negativeMeaning:"較依權限或效率直接決定", traitEffects:{structure:.07,empathy:.04,analysis:.04}, roleEffects:{"justice-enforcement":.08,"legal-audit":.07,"general-administration":.04} },
      { id:"refusalAbility", prompt:"面對不合理要求，我能清楚拒絕，不靠拖延、消失或勉強答應。", positiveMeaning:"拒絕與界線表達較穩", negativeMeaning:"拒絕時容易逃避或過度承諾", traitEffects:{expression:.06,pressure:.06,structure:.04}, roleEffects:{"general-administration":.05,"social-education":.05,"health-environment":.04,"legal-audit":.04} },
      { id:"emotionalRecovery", prompt:"衝突或挫折結束後，我通常能在合理時間內恢復並回到下一項工作。", positiveMeaning:"情緒恢復速度較穩", negativeMeaning:"事件結束後仍容易長時間受影響", traitEffects:{pressure:.08,stamina:.06,adaptability:.04}, roleEffects:{"justice-enforcement":.06,"social-education":.05,"culture-diplomacy":.04,"health-environment":.05} },
      { id:"boredomTolerance", prompt:"工作缺乏新鮮感時，我仍能靠標準和責任維持基本品質。", positiveMeaning:"低刺激工作品質較穩", negativeMeaning:"需要新鮮感才能維持品質", traitEffects:{stamina:.07,detail:.05,structure:.04}, roleEffects:{"finance-accounting":.07,"general-administration":.05,"legal-audit":.04,"data-information":.03} },
      { id:"delayedGratification", prompt:"成果需要幾個月才看得見時，我仍能持續完成當下該做的步驟。", positiveMeaning:"延遲回饋下仍能持續", negativeMeaning:"需要較快回饋維持投入", traitEffects:{stamina:.09,execution:.05,pressure:.03}, roleEffects:{"legal-audit":.04,"finance-accounting":.04,"engineering":.05,"agriculture-natural":.05} },
      { id:"informationOrganization", prompt:"資料來源混亂時，我會先建立分類、版本和優先順序，再開始處理。", positiveMeaning:"資訊整理與版本控制較強", negativeMeaning:"資訊一多時較容易直接投入而失去主線", traitEffects:{structure:.08,analysis:.06,detail:.04}, roleEffects:{"data-information":.07,"economic-planning":.06,"legal-audit":.05,"land-transport-planning":.05} },
      { id:"decisionPacing", prompt:"我能分辨哪些決定需要快速處理，哪些值得多花時間蒐集資料。", positiveMeaning:"決策速度能依風險調整", negativeMeaning:"容易固定偏快或偏慢", traitEffects:{analysis:.06,pressure:.06,adaptability:.05}, roleEffects:{"justice-enforcement":.06,"economic-planning":.05,"health-environment":.05,"engineering":.04} },
      { id:"errorResponse", prompt:"發現小錯時，我會依影響程度修正，不會忽略，也不會為低風險細節停住整體進度。", positiveMeaning:"錯誤敏感與整體進度較平衡", negativeMeaning:"較容易忽略小錯或過度糾結", traitEffects:{detail:.07,analysis:.05,execution:.04}, roleEffects:{"finance-accounting":.06,"legal-audit":.06,"data-information":.05,"engineering":.05} },
      { id:"authorityComplianceB",dimension:"authorityCompliance",reverse:true,prompt:"只要正式決定與我的判斷不同，我通常很難先配合執行。"},
      { id:"moralNuanceB",dimension:"moralNuance",reverse:true,prompt:"遇到爭議時，我通常能很快分出誰對誰錯，不太需要理解其他層次。"},
      { id:"evidenceAwarenessB",dimension:"evidenceAwareness",reverse:true,prompt:"只要直覺很強烈，我有時會把推測當成已經確認的事實。"},
      { id:"confidentialityB",dimension:"confidentiality",reverse:true,prompt:"只要對方值得信任，我覺得分享一點工作內部資訊通常沒有關係。"},
      { id:"riskCalibrationB",dimension:"riskCalibration",prompt:"我會依錯誤後果調整蒐集資料的時間，不會所有事情都用同一種速度決定。"},
      { id:"responsibilityOwnershipB",dimension:"responsibilityOwnership",reverse:true,prompt:"事情出錯時，我通常會先說明不是只有我造成的，再考慮如何補救。"},
      { id:"feedbackAcceptanceB",dimension:"feedbackAcceptance",reverse:true,prompt:"被指出錯誤時，我第一個反應通常是解釋對方為什麼沒有理解我。"},
      { id:"powerRestraintB",dimension:"powerRestraint",reverse:true,prompt:"只要在我的權限範圍內，為了效率可以不必逐一說明決定理由。"},
      { id:"refusalAbilityB",dimension:"refusalAbility",reverse:true,prompt:"不想答應別人時，我常先拖著不回覆，希望對方自己放棄。"},
      { id:"emotionalRecoveryB",dimension:"emotionalRecovery",reverse:true,prompt:"一次衝突或挫折常會影響我後面很長一段時間的工作狀態。"},
      { id:"boredomToleranceB",dimension:"boredomTolerance",reverse:true,prompt:"只要內容重複又沒有新鮮感，我很難維持原本的細心程度。"},
      { id:"delayedGratificationB",dimension:"delayedGratification",reverse:true,prompt:"長時間看不到成果時，我常會改做比較快能得到回饋的事情。"},
      { id:"informationOrganizationB",dimension:"informationOrganization",reverse:true,prompt:"資料很多時，我通常先開始處理眼前內容，之後再整理分類與版本。"},
      { id:"decisionPacingB",dimension:"decisionPacing",reverse:true,prompt:"不論事情大小，我通常都用差不多的速度與方式做決定。"},
      { id:"errorResponseB",dimension:"errorResponse",reverse:true,prompt:"發現錯誤時，我不是覺得沒關係，就是容易一直卡在那個細節上。"}
    ])
  };
});
