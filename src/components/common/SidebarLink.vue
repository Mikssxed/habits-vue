<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { globalStore } from "../../stores";
import { cn } from "../../utils/cn";

const { href } = defineProps<{
  href: string;
  title: string;
  iconSrc: string;
}>();

const { toggleSidebar } = globalStore();
const route = useRoute();
const isActive = computed(() => route.path === href);
</script>

<template>
  <RouterLink
    :to="href"
    :class="
      cn(
        'text-primary flex items-center gap-2.5 rounded-[60px] p-6 py-4 text-lg transition-colors md:hover:bg-bg-hover',
        isActive && 'bg-bg-hover',
      )
    "
    @click="() => toggleSidebar(false)"
  >
    <img width="24" height="24" :src="iconSrc" :alt="`${title}-icon`" />
    {{ title }}
  </RouterLink>
</template>
