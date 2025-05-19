<script setup lang="ts">
import { type CalendarDate, today } from "@internationalized/date";
import { computed, ref } from "vue";
import { habitsStore, modalsStore } from "../../stores";
import BaseInput from "../forms/BaseInput.vue";
import DatePicker from "../forms/DatePicker.vue";
import RepeatSelector from "../forms/RepeatSelector.vue";
import TimePicker from "../forms/TimePicker.vue";
import WeekdaySelector from "../forms/WeekdaySelector.vue";
import Portal from "./Portal.vue";

const modals = modalsStore();

const title = ref("");
const description = ref("");
const startDate = ref<CalendarDate>(today("UTC"));
const startTime = ref<string | null>(null);
const duration = ref(30);
const repeat = ref("daily");
const weekdays = ref<string[]>(["mon", "tue", "wed", "thu", "fri"]);
const touched = ref({
  title: false,
  startTime: false,
  weekdays: false,
});
const habits = habitsStore();

const showWeekdaySelector = computed(() => repeat.value === "weekly");
const formValid = computed(() => {
  if (!title.value) return false;
  if (!startDate.value) return false;
  if (!startTime.value) return false;
  if (
    repeat.value === "weekly" &&
    (!weekdays.value || weekdays.value.length === 0)
  )
    return false;
  return true;
});

const startTimeInvalid = computed(
  () => touched.value.startTime && !startTime.value,
);
const weekdaysInvalid = computed(
  () =>
    touched.value.weekdays &&
    repeat.value === "weekly" &&
    (!weekdays.value || weekdays.value.length === 0),
);

function createHabit() {
  if (!formValid.value) {
    // You could add a notification system here for better user feedback
    console.error("Please fill in all required fields");
    return;
  }

  habits.addHabit({
    title: title.value,
    description: description.value,
    startDate: startDate.value.toDate("UTC"),
    startTime: startTime.value!,
    duration: duration.value,
    repeat: repeat.value,
    weekdays: repeat.value === "weekly" ? weekdays.value : undefined,
    totalCount: 0,
    streakCount: 0,
    createdAt: new Date(),
    completedAt: [],
  });

  // Close the modal and reset form
  modals.toggleModal("habit", false);
  resetForm();
}

function resetForm() {
  title.value = "";
  description.value = "";
  startDate.value = today("UTC");
  startTime.value = null;
  duration.value = 30;
  repeat.value = "daily";
  weekdays.value = ["mon", "tue", "wed", "thu", "fri"];
}
</script>

<template>
  <Portal
    v-if="modals.modals.habit"
    modal="habit"
    title="Create Habit"
    :handleSubmit="createHabit"
    :formValid="formValid"
    class="w-96"
  >
    <BaseInput
      title="Title"
      v-model="title"
      class="{ 'invalid-input': titleInvalid }"
      @blur="touched.title = true"
    />
    <BaseInput title="Description" v-model="description" optional />
    <DatePicker title="Start Date" v-model="startDate as CalendarDate" />
    <TimePicker
      title="Start Time"
      v-model="startTime"
      :class="startTimeInvalid ? 'invalid-input' : ''"
      @update:modelValue="touched.startTime = true"
    />
    <BaseInput
      title="Duration (min)"
      v-model="duration"
      optional
      type="number"
    />
    <RepeatSelector title="Repeat type" v-model="repeat" />
    <WeekdaySelector
      v-if="showWeekdaySelector"
      title="Select days"
      v-model="weekdays"
      :class="weekdaysInvalid ? 'invalid-input' : ''"
      @update:modelValue="touched.weekdays = true"
    />
  </Portal>
</template>
