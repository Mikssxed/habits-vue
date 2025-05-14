<script setup lang="ts">
import { cn } from "../../utils/cn";

const props = defineProps<{ class?: string; click: () => void }>();
</script>

<template>
  <button
    :class="
      cn(
        'flex cursor-pointer items-center justify-center rounded-xl border border-border px-4 py-1',
        props.class,
      )
    "
    @click="click"
  >
    <slot />
  </button>
</template>
