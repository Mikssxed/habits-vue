<script setup lang="ts">
import BaseButton from "./BaseButton.vue";

defineProps<{ click: () => void; disabled?: boolean }>();
</script>

<template>
  <BaseButton class="bg-activity-4" :click="click" :disabled="disabled">
    <slot />
  </BaseButton>
</template>
