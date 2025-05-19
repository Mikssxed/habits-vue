<script setup lang="ts">
import Weekday from "./Weekday.vue";

const currentDate = new Date();
const weekDays: Date[] = [];

for (let i = 6; i >= 0; i--) {
  const date = new Date(currentDate);
  date.setDate(currentDate.getDate() - i);
  weekDays.push(date);
}
</script>

<template>
  <div class="flex w-full justify-between">
    <Weekday v-for="(day, index) in weekDays" :key="index" :day="day" />
  </div>
</template>
