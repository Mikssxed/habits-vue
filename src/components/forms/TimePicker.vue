<script setup lang="ts">
import { cn } from "../../utils/cn";

const props = defineProps<{
  title: string;
  optional?: boolean;
  class?: string;
}>();
const modelValue = defineModel<string | null>();
const options = new Array(49).fill(null).map((_, index) => {
  const minutes = index * 30;
  const hour = +(minutes / 60).toFixed(0);
  const hourString = hour < 10 ? `0${hour}` : hour;
  const minute = minutes % 60;
  const minutesString = minute < 10 ? `0${minute}` : minute;
  return `${hourString}:${minutesString}`;
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <label class="text-primary block text-lg font-medium opacity-80"
      >{{ title }}{{ optional ? "" : "*" }}</label
    >
    <select
      v-model="modelValue"
      :class="
        cn(
          'bg-opacity-50 placeholder-opacity-50 w-full rounded-lg border border-activity-2 bg-activity-1 px-2 py-1 text-text-primary placeholder-text-primary transition-all focus:border-transparent focus:ring-2 focus:ring-activity-4 focus:outline-none',
          props.class,
        )
      "
    >
      <option value="">Select a time</option>
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>
