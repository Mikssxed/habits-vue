<script setup lang="ts">
import type { Habit } from "../../types";

defineProps<{ habit: Habit }>();
</script>

<template>
  <div class="flex flex-col gap-2 rounded-2xl border border-border p-4">
    <h3 class="text-lg font-semibold">{{ habit.title }}</h3>
  </div>
</template>
