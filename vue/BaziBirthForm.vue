<template>
  <form class="bazi-birth-form" @submit.prevent="submit">
    <label>
      曆法
      <select v-model="form.calendarType">
        <option value="solar">國曆</option>
        <option value="lunar">農曆</option>
      </select>
    </label>

    <label>
      性別
      <select v-model="form.gender">
        <option value="male">男</option>
        <option value="female">女</option>
      </select>
    </label>

    <label>
      出生年
      <select v-model.number="form.year">
        <option v-for="year in years" :key="year" :value="year">{{ year }} 年</option>
      </select>
    </label>

    <label>
      出生月
      <select v-model.number="form.month">
        <option v-for="month in 12" :key="month" :value="month">
          {{ form.calendarType === "lunar" ? `${lunarMonths[month - 1]}月` : `${month} 月` }}
        </option>
      </select>
    </label>

    <label>
      出生日
      <select v-model.number="form.day">
        <option v-for="day in dayCount" :key="day" :value="day">{{ day }} 日</option>
      </select>
    </label>

    <label>
      出生時辰
      <select v-model="form.hourBranch">
        <option v-for="hour in hourBranches" :key="hour.branch" :value="hour.branch">
          {{ hour.branch }}時（{{ hour.start }}-{{ hour.end }}）
        </option>
      </select>
    </label>

    <label v-if="form.calendarType === 'lunar'">
      農曆閏月
      <select v-model="form.isLeapMonth">
        <option :value="false">非閏月</option>
        <option :value="true">閏月</option>
      </select>
    </label>

    <button type="submit">建立排盤資料</button>
    <pre>{{ JSON.stringify(payload, null, 2) }}</pre>
  </form>
</template>

<script setup>
import { computed, reactive, watch } from "vue";

const emit = defineEmits(["submit"]);

const calendarLabels = { solar: "國曆", lunar: "農曆" };
const genderLabels = { male: "男", female: "女" };
const lunarMonths = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
const hourBranches = [
  { branch: "子", start: "23:00", end: "00:59" },
  { branch: "丑", start: "01:00", end: "02:59" },
  { branch: "寅", start: "03:00", end: "04:59" },
  { branch: "卯", start: "05:00", end: "06:59" },
  { branch: "辰", start: "07:00", end: "08:59" },
  { branch: "巳", start: "09:00", end: "10:59" },
  { branch: "午", start: "11:00", end: "12:59" },
  { branch: "未", start: "13:00", end: "14:59" },
  { branch: "申", start: "15:00", end: "16:59" },
  { branch: "酉", start: "17:00", end: "18:59" },
  { branch: "戌", start: "19:00", end: "20:59" },
  { branch: "亥", start: "21:00", end: "22:59" }
];

const today = new Date();
const form = reactive({
  calendarType: "solar",
  gender: "male",
  year: today.getFullYear(),
  month: today.getMonth() + 1,
  day: today.getDate(),
  hourBranch: "子",
  isLeapMonth: false
});

const years = computed(() => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 201 }, (_, index) => currentYear + 100 - index);
});

const dayCount = computed(() => {
  if (form.calendarType === "lunar") return 30;
  return new Date(form.year, form.month, 0).getDate();
});

const payload = computed(() => {
  const hour = hourBranches.find((item) => item.branch === form.hourBranch) || hourBranches[0];
  const isLunar = form.calendarType === "lunar";

  return {
    version: "bazi-birth-input/v0.4",
    calendar: {
      type: form.calendarType,
      label: calendarLabels[form.calendarType],
      isLeapMonth: isLunar && form.isLeapMonth
    },
    person: {
      gender: form.gender,
      genderLabel: genderLabels[form.gender]
    },
    birth: {
      year: form.year,
      month: form.month,
      day: form.day,
      hourBranch: form.hourBranch,
      hourRange: {
        start: hour.start,
        end: hour.end
      },
      isoLikeDate: isLunar ? null : `${form.year}-${String(form.month).padStart(2, "0")}-${String(form.day).padStart(2, "0")}`
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
});

watch(dayCount, (maxDay) => {
  form.day = Math.min(form.day, maxDay);
});

watch(() => form.calendarType, (calendarType) => {
  if (calendarType === "solar") form.isLeapMonth = false;
});

function submit() {
  emit("submit", payload.value);
}
</script>
