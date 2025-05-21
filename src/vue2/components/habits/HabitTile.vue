<template>
  <div
    class="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-border p-4"
  >
    <div class="flex flex-col gap-2">
      <h3 class="text-lg font-semibold">{{ habit.title }}</h3>
      <div class="flex gap-3">
        <div class="flex items-center gap-1">
          <Flame color="orange" />
          <span class="text-sm text-gray-200">
            {{ habit.streakCount }}
            {{ habit.streakCount === 1 ? "day" : "days" }}
          </span>
        </div>
        <div class="flex items-center gap-1">
          <Zap color="#3965d3" />
          <span class="text-sm text-gray-200">
            {{ habit.totalCount }} {{ habit.totalCount === 1 ? "day" : "days" }}
          </span>
        </div>
      </div>
    </div>
    <Completion
      :completion="isCompleted ? 1 : 0"
      :static="true"
      :click="toggleCompletion"
    />
  </div>
</template>

<script>
import { isSameDay } from "date-fns";
import { Flame, Zap } from "lucide-vue-next";
import { mapState } from "vuex";
import Completion from "./Completion.vue";

export default {
  name: "HabitTile",

  components: {
    Flame,
    Zap,
    Completion,
  },

  props: {
    habit: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState({
      selectedDay: (state) => state.selectedDay,
      habits: (state) => state.habits,
    }),

    isCompleted() {
      return (
        this.habit.completedAt &&
        this.habit.completedAt.some((date) => {
          const habitDate = new Date(date);
          const selectedDay = new Date(this.selectedDay);
          return habitDate.toDateString() === selectedDay.toDateString();
        })
      );
    },
  },

  methods: {
    toggleCompletion() {
      const selectedDay = new Date(this.selectedDay);
      const habitIndex = this.habits.findIndex(
        (h) => h.title === this.habit.title,
      );

      const alreadyCompleted =
        this.habit.completedAt &&
        this.habit.completedAt.some((date) => {
          const habitDate = new Date(date);
          return habitDate.toDateString() === selectedDay.toDateString();
        });

      let newCompletedAt;
      if (alreadyCompleted) {
        // Remove completion
        newCompletedAt = this.habit.completedAt.filter((date) => {
          const currentDate = new Date(date);
          return !isSameDay(currentDate, selectedDay);
        });
      } else {
        // Add completion
        newCompletedAt = [...(this.habit.completedAt || []), selectedDay];
      }

      // In Vue 2, we'd typically call a Vuex action
      this.$store.dispatch("updateHabit", {
        index: habitIndex,
        habit: { ...this.habit, completedAt: newCompletedAt },
      });
    },
  },
};
</script>
