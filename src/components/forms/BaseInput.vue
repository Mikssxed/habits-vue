<script setup lang="ts">
import { cn } from "../../utils/cn";

const props = defineProps<{
  title: string;
  optional?: boolean;
  type?: "text" | "number";
  class?: string;
}>();
const modelValue = defineModel<string | number | null>();
</script>

<template>
  <div class="flex flex-col gap-1">
    <label class="text-primary block text-lg font-medium opacity-80"
      >{{ title }}{{ optional ? "" : "*" }}</label
    >
    <input
      :class="
        cn(
          'bg-opacity-50 placeholder-opacity-50 w-full rounded-lg border border-activity-2 bg-activity-1 px-2 py-1 text-text-primary placeholder-text-primary transition-all focus:border-transparent focus:ring-2 focus:ring-activity-4 focus:outline-none',
          props.class,
        )
      "
      :type="type || 'text'"
      v-model="modelValue"
    />
  </div>
</template>
