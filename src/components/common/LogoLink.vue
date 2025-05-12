<script setup lang="ts">
import logo from "../../assets/logo.svg";
import { globalStore } from "../../stores";
import { cn } from "../../utils/cn";

defineProps({
  classes: {
    type: String,
    default: "",
  },
});

const { toggleSidebar } = globalStore();
</script>

<template>
  <RouterLink
    :class="cn('mb-8 flex items-center gap-2.5 p-2', classes)"
    to="/dashboard"
    @onClick="() => toggleSidebar(false)"
  >
    <img :src="logo" alt="logo" width="{36}" height="{36}" />
    <h1 class="text-2xl text-primary font-bold">SelfGrind</h1>
  </RouterLink>
</template>
