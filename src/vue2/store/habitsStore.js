// Vue 2 Store with Vuex
import Vue from 'vue';
import Vuex from 'vuex';
import { Habit } from '../types';

Vue.use(Vuex);

function saveHabitsToLocalStorage(habits: Habit[]) {
  localStorage.setItem("habits", JSON.stringify(habits));
}

// Vue 2 uses Vuex instead of Pinia
export default new Vuex.Store({
  state: {
    habits: JSON.parse(localStorage.getItem("habits") || '[]') as Habit[],
    selectedDay: new Date(),
  },
  
  getters: {
    // In Vue 2 Vuex, getters are explicitly defined
    getDayCompletion: (state) => (day: Date) => {
      let lengthCorrection = 0;
      const completion = state.habits.reduce((acc, habit) => {
        const shouldCount =
          habit.repeat === "daily" ||
          habit.weekdays?.includes(
            day.toLocaleString("en-US", { weekday: "short" }),
          );

        if (new Date(habit.startDate) > new Date(day) || !shouldCount) {
          lengthCorrection++;
        }

        const isCompleted = habit.completedAt?.some(
          (completedDate) =>
            new Date(completedDate).toDateString() ===
            new Date(day).toDateString(),
        );

        if (isCompleted) {
          return acc + 1;
        }

        return acc;
      }, 0);
      
      const correctedLength = state.habits.length - lengthCorrection;
      if (correctedLength === 0) {
        return 0;
      }

      return completion / correctedLength;
    },
  },
  
  mutations: {
    // Vue 2 uses mutations to change state
    ADD_HABIT(state, habit: Habit) {
      const alreadyExists = state.habits.filter(
        (habitItem) => habitItem.title === habit.title,
      );
      state.habits.push({
        ...habit,
        title:
          alreadyExists.length > 0
            ? `${habit.title} (${alreadyExists.length + 1})`
            : habit.title,
      });
      saveHabitsToLocalStorage(state.habits);
    },
    
    REMOVE_HABIT(state, index: number) {
      state.habits.splice(index, 1);
      saveHabitsToLocalStorage(state.habits);
    },
    
    UPDATE_HABIT(state, { index, habit }: { index: number; habit: Habit }) {
      state.habits[index] = {
        ...habit,
        totalCount: habit.completedAt?.length || 0,
      };
      saveHabitsToLocalStorage(state.habits);
    },
    
    SET_SELECTED_DAY(state, date: Date) {
      state.selectedDay = date;
    },
  },
  
  actions: {
    // Vue 2 uses actions to commit mutations, often with async operations
    addHabit({ commit }, habit: Habit) {
      commit('ADD_HABIT', habit);
    },
    
    removeHabit({ commit }, index: number) {
      commit('REMOVE_HABIT', index);
    },
    
    updateHabit({ commit }, { index, habit }: { index: number; habit: Habit }) {
      commit('UPDATE_HABIT', { index, habit });
    },
    
    setSelectedDay({ commit }, date: Date) {
      commit('SET_SELECTED_DAY', date);
    },
  },
});
