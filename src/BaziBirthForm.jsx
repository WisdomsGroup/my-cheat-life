import { useMemo, useState } from "react";

const HOUR_BRANCHES = [
  ["子", "23:00", "00:59"],
  ["丑", "01:00", "02:59"],
  ["寅", "03:00", "04:59"],
  ["卯", "05:00", "06:59"],
  ["辰", "07:00", "08:59"],
  ["巳", "09:00", "10:59"],
  ["午", "11:00", "12:59"],
  ["未", "13:00", "14:59"],
  ["申", "15:00", "16:59"],
  ["酉", "17:00", "18:59"],
  ["戌", "19:00", "20:59"],
  ["亥", "21:00", "22:59"]
];

const CALENDAR_LABELS = { solar: "國曆", lunar: "農曆" };
const GENDER_LABELS = { male: "男", female: "女" };
const LUNAR_MONTHS = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];

function pad(value) {
  return String(value).padStart(2, "0");
}

function getSolarDays(year, month) {
  return new Date(year, month, 0).getDate();
}

function createPayload(form) {
  const hour = HOUR_BRANCHES.find(([branch]) => branch === form.hourBranch) || HOUR_BRANCHES[0];
  const isLunar = form.calendarType === "lunar";

  return {
    version: "bazi-birth-input/v0.4",
    calendar: {
      type: form.calendarType,
      label: CALENDAR_LABELS[form.calendarType],
      isLeapMonth: isLunar && form.isLeapMonth
    },
    person: {
      gender: form.gender,
      genderLabel: GENDER_LABELS[form.gender]
    },
    birth: {
      year: form.year,
      month: form.month,
      day: form.day,
      hourBranch: form.hourBranch,
      hourRange: {
        start: hour[1],
        end: hour[2]
      },
      isoLikeDate: isLunar ? null : `${form.year}-${pad(form.month)}-${pad(form.day)}`
    },
    baziInput: {
      sourceCalendar: form.calendarType,
      needsLunarConversion: isLunar,
      normalizedSolarDate: isLunar ? null : {
        year: form.year,
        month: form.month,
        day: form.day
      },
      hourBranch: form.hourBranch,
      gender: form.gender
    }
  };
}

export default function BaziBirthForm({ onSubmit }) {
  const today = new Date();
  const [form, setForm] = useState({
    calendarType: "solar",
    gender: "male",
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    hourBranch: "子",
    isLeapMonth: false
  });

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 201 }, (_, index) => currentYear + 100 - index);
  }, []);

  const dayCount = form.calendarType === "lunar" ? 30 : getSolarDays(form.year, form.month);
  const payload = createPayload(form);

  function update(next) {
    setForm((current) => {
      const merged = { ...current, ...next };
      const maxDay = merged.calendarType === "lunar" ? 30 : getSolarDays(merged.year, merged.month);
      return {
        ...merged,
        day: Math.min(merged.day, maxDay),
        isLeapMonth: merged.calendarType === "lunar" ? merged.isLeapMonth : false
      };
    });
  }

  function submit(event) {
    event.preventDefault();
    onSubmit?.(createPayload(form));
  }

  return (
    <form className="bazi-birth-form" onSubmit={submit}>
      <label>
        曆法
        <select value={form.calendarType} onChange={(event) => update({ calendarType: event.target.value })}>
          <option value="solar">國曆</option>
          <option value="lunar">農曆</option>
        </select>
      </label>

      <label>
        性別
        <select value={form.gender} onChange={(event) => update({ gender: event.target.value })}>
          <option value="male">男</option>
          <option value="female">女</option>
        </select>
      </label>

      <label>
        出生年
        <select value={form.year} onChange={(event) => update({ year: Number(event.target.value) })}>
          {years.map((year) => <option key={year} value={year}>{year} 年</option>)}
        </select>
      </label>

      <label>
        出生月
        <select value={form.month} onChange={(event) => update({ month: Number(event.target.value) })}>
          {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
            <option key={month} value={month}>
              {form.calendarType === "lunar" ? `${LUNAR_MONTHS[month - 1]}月` : `${month} 月`}
            </option>
          ))}
        </select>
      </label>

      <label>
        出生日
        <select value={form.day} onChange={(event) => update({ day: Number(event.target.value) })}>
          {Array.from({ length: dayCount }, (_, index) => index + 1).map((day) => (
            <option key={day} value={day}>{day} 日</option>
          ))}
        </select>
      </label>

      <label>
        出生時辰
        <select value={form.hourBranch} onChange={(event) => update({ hourBranch: event.target.value })}>
          {HOUR_BRANCHES.map(([branch, start, end]) => (
            <option key={branch} value={branch}>{branch}時（{start}-{end}）</option>
          ))}
        </select>
      </label>

      {form.calendarType === "lunar" && (
        <label>
          農曆閏月
          <select value={String(form.isLeapMonth)} onChange={(event) => update({ isLeapMonth: event.target.value === "true" })}>
            <option value="false">非閏月</option>
            <option value="true">閏月</option>
          </select>
        </label>
      )}

      <button type="submit">建立排盤資料</button>
      <pre>{JSON.stringify(payload, null, 2)}</pre>
    </form>
  );
}
