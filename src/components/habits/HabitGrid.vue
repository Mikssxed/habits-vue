<script setup lang="ts">
import { habitsStore } from "../../stores";
import HabitTile from "./HabitTile.vue";

const habits = habitsStore();
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <HabitTile v-for="habit in habits.habits" :habit="habit" />
  </div>
</template>
