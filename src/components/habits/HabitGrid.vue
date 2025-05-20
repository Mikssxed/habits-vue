<script setup lang="ts">
import { computed } from "vue";
import { habitsStore } from "../../stores";
import HabitTile from "./HabitTile.vue";

const habits = habitsStore();

const visibleHabits = computed(() => {
  return habits.habits.filter((habit) => {
    const habitStartDate = new Date(habit.startDate);
    const selectedDay = new Date(habits.selectedDay);
    const shouldBeVisible =
      habit.repeat === "daily" ||
      habit.weekdays?.includes(
        selectedDay.toLocaleString("en-US", { weekday: "short" }),
      );
    return habitStartDate <= selectedDay && shouldBeVisible;
  });
});
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <HabitTile
      v-for="(habit, index) in visibleHabits"
      :key="index"
      :habit="habit"
    />
  </div>
</template>
