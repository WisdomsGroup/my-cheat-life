const assert = require("node:assert/strict");
const engine = require("../bazi-engine.js");

const defaults = {
  gender: "male",
  daySect: 2,
  yunSect: 2,
  timezone: "Asia/Taipei",
  isLeapMonth: false
};

const solarCase = engine.calculate({
  ...defaults,
  calendarType: "solar",
  year: 1986,
  month: 5,
  day: 29,
  hour: 20,
  minute: 5
});

assert.equal(solarCase.converted.lunar, "一九八六年四月廿一");
assert.deepEqual(
  solarCase.pillars.map((pillar) => pillar.ganZhi),
  ["丙寅", "癸巳", "癸酉", "壬戌"]
);
assert.equal(solarCase.pillars[2].tenGodStem, "日主");
assert.equal(solarCase.daYun.periods[1].ganZhi, "甲午");

const leapMonthCase = engine.calculate({
  ...defaults,
  calendarType: "lunar",
  gender: "female",
  year: 2020,
  month: 4,
  day: 1,
  hour: 12,
  minute: 0,
  isLeapMonth: true
});

assert.equal(leapMonthCase.converted.solar, "2020-05-23 12:00:00");
assert.equal(leapMonthCase.converted.isLeapMonth, true);
assert.deepEqual(
  leapMonthCase.pillars.map((pillar) => pillar.ganZhi),
  ["庚子", "辛巳", "丙寅", "甲午"]
);

const lateZiSect1 = engine.calculate({
  ...defaults,
  calendarType: "solar",
  year: 2024,
  month: 1,
  day: 1,
  hour: 23,
  minute: 30,
  daySect: 1
});

const lateZiSect2 = engine.calculate({
  ...defaults,
  calendarType: "solar",
  year: 2024,
  month: 1,
  day: 1,
  hour: 23,
  minute: 30,
  daySect: 2
});

assert.notEqual(lateZiSect1.pillars[2].ganZhi, lateZiSect2.pillars[2].ganZhi);

console.log("bazi-engine tests passed");
