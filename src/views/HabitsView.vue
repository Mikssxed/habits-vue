<script setup lang="ts">
import PrimaryButton from "../components/buttons/PrimaryButton.vue";
import CurrentWeek from "../components/habits/CurrentWeek.vue";
import HabitGrid from "../components/habits/HabitGrid.vue";
import HabitModal from "../components/modals/HabitModal.vue";
import { modalsStore } from "../stores";

const { toggleModal } = modalsStore();
</script>

<template>
  <div class="flex flex-col gap-5 p-5">
    <div class="mr-0 ml-auto">
      <PrimaryButton :click="() => toggleModal('habit', true)"
        >Create habit</PrimaryButton
      >
    </div>
    <CurrentWeek />
    <HabitGrid />
  </div>
  <HabitModal />
</template>
