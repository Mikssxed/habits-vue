<script setup lang="ts">
import { cn } from "../../utils/cn";

const props = defineProps<{
  class?: string;
  click: () => void;
  disabled?: boolean;
}>();
</script>

<template>
  <button
    :class="
      cn(
        'flex items-center justify-center rounded-xl border border-border px-4 py-1',
        props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        props.class,
      )
    "
    :disabled="props.disabled"
    @click="click"
  >
    <slot />
  </button>
</template>
