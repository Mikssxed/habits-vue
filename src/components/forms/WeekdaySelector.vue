<script setup lang="ts">
const props = defineProps<{
  title: string;
  optional?: boolean;
  class?: string;
}>();
const modelValue = defineModel<string[]>();

const weekdays = [
  { value: "Mon", label: "Mon" },
  { value: "Tue", label: "Tue" },
  { value: "Wed", label: "Wed" },
  { value: "Thu", label: "Thu" },
  { value: "Fri", label: "Fri" },
  { value: "Sat", label: "Sat" },
  { value: "Sun", label: "Sun" },
];

function toggleDay(day: string) {
  if (!modelValue.value) {
    modelValue.value = [day];
    return;
  }

  if (modelValue.value.includes(day)) {
    modelValue.value = modelValue.value.filter((d) => d !== day);
  } else {
    modelValue.value = [...modelValue.value, day];
  }
}
</script>

<template>
  <div class="flex flex-col gap-1" :class="props.class">
    <label class="text-primary block text-lg font-medium opacity-80"
      >{{ title }}{{ optional ? "" : "*" }}</label
    >
    <div class="flex flex-wrap gap-2">
      <button
        v-for="day in weekdays"
        :key="day.value"
        type="button"
        @click="toggleDay(day.value)"
        :class="[
          'cursor-pointer rounded-md border px-2 py-1 transition-all',
          modelValue?.includes(day.value)
            ? 'border-activity-4 bg-activity-4 text-white'
            : 'border-activity-2 bg-activity-1 text-text-primary',
        ]"
      >
        {{ day.label }}
      </button>
    </div>
  </div>
</template>
