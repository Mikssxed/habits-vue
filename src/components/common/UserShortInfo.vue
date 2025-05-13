<script setup lang="ts">
import { X } from "lucide-vue-next";
import { globalStore } from "../../stores";
import { cn } from "../../utils/cn";
import BaseStat from "./BaseStat.vue";
import DefaultAvatar from "./DefaultAvatar.vue";

defineProps({
  classes: {
    type: String,
    default: "",
  },
  mobile: {
    type: Boolean,
    default: false,
  },
});

const { toggleSidebar } = globalStore();
</script>

<template>
  <div v-if="mobile" :class="cn('mb-5 flex flex-col gap-4 md:hidden', classes)">
    <div class="flex w-full items-center justify-between">
      <div class="flex items-center gap-2">
        <DefaultAvatar />
        <h2 class="text-xl font-semibold text-wrap">Welcome, Grinder!</h2>
      </div>
      <X color="white" @click="() => toggleSidebar(false)" />
    </div>
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-2 gap-2">
        <BaseStat label="STR" value="20" />
        <BaseStat label="STA" value="20" />
        <BaseStat label="KNO" value="20" />
      </div>
      <p class="text-base text-gray-400">Streak: 7 days</p>
    </div>
  </div>

  <div v-if="!mobile" :class="cn('flex items-center gap-4', classes)">
    <DefaultAvatar />
    <div class="flex flex-col">
      <h2 class="text-xl font-semibold text-wrap">Welcome, Grinder!</h2>
      <div class="flex flex-col gap-4 md:flex-row md:items-center">
        <BaseStat label="STR" value="20" />
        <BaseStat label="STA" value="20" />
        <BaseStat label="KNO" value="20" />
        <p class="text-base text-gray-400">Streak: 7 days</p>
      </div>
    </div>
  </div>
</template>
