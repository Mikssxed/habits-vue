<script setup lang="ts">
import BaseButton from "./BaseButton.vue";

defineProps<{ click: () => void }>();
</script>

<template>
  <BaseButton class="bg-activity-4" :click="click">
    <slot />
  </BaseButton>
</template>
