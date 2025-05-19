import { defineStore } from "pinia";
import { ref } from "vue";
import type { Habit } from "../types";

export const habitsStore = defineStore("habits", () => {
  const habits = ref<Habit[]>([]);
  const selectedDay = ref<Date>(new Date());

  function addHabit(habit: Habit) {
    habits.value.push(habit);
  }

  function removeHabit(index: number) {
    habits.value.splice(index, 1);
  }

  function updateHabit(index: number, habit: Habit) {
    habits.value[index] = habit;
  }

  function setSelectedDay(date: Date) {
    selectedDay.value = date;
  }

  function getDayCompletion(day: Date) {
    let lengthCorrection = 0;
    const completion = habits.value.reduce((acc, habit) => {
      const shouldCount =
        habit.repeat === "daily" ||
        habit.weekdays?.includes(
          day.toLocaleString("en-US", { weekday: "short" }),
        );

      if (habit.startDate > day || !shouldCount) {
        lengthCorrection++;
      }
      const isCompleted = habit.completedAt?.some(
        (completedDate) => completedDate.toDateString() === day.toDateString(),
      );

      if (isCompleted) {
        console.log("skipping 2");
        return acc + 1;
      }

      return acc;
    }, 0);
    const correctedLength = habits.value.length - lengthCorrection;
    if (correctedLength === 0) {
      return 0;
    }

    return completion / correctedLength;
  }

  return {
    habits,
    addHabit,
    removeHabit,
    updateHabit,
    selectedDay,
    setSelectedDay,
    getDayCompletion,
  };
});
