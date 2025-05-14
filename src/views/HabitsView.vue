<script setup lang="ts">
import PrimaryButton from "../components/buttons/PrimaryButton.vue";
import HabitModal from "../components/modals/HabitModal.vue";
import { modalsStore } from "../stores";

const { toggleModal } = modalsStore();
</script>

<template>
  <p>Habits</p>
  <PrimaryButton :click="() => toggleModal('habit', true)"
    >Create habit</PrimaryButton
  >
  <HabitModal />
</template>
