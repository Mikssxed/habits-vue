<script setup lang="ts">
import { ref } from "vue";
import { modalsStore } from "../../stores";
import BaseInput from "../forms/BaseInput.vue";
import DatePicker from "../forms/DatePicker.vue";
import Portal from "./Portal.vue";

const modals = modalsStore();

const title = ref("");
const description = ref("");

function createHabit() {}
</script>

<template>
  <Portal
    v-if="modals.modals.habit"
    modal="habit"
    title="Create Habit"
    :handleSubmit="createHabit"
    class="w-96"
  >
    <BaseInput title="Title" v-model="title" />
    <BaseInput title="Description" v-model="description" optional />
    <DatePicker />
  </Portal>
</template>
