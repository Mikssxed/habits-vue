<script setup lang="ts">
defineProps<{ title: string; optional?: boolean }>();
const modelValue = defineModel<string>();
</script>

<template>
  <div class="flex flex-col gap-1">
    <label class="text-primary block text-lg font-medium opacity-80"
      >{{ title }}{{ optional ? "" : "*" }}</label
    >
    <input
      class="bg-opacity-50 placeholder-opacity-50 w-full rounded-lg border border-activity-2 bg-activity-1 px-2 py-1 text-text-primary placeholder-text-primary transition-all focus:border-transparent focus:ring-2 focus:ring-activity-4 focus:outline-none"
      type="text"
      v-model="modelValue"
    />
  </div>
</template>
