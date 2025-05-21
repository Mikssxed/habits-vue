<template>
  <Portal
    v-if="showModal"
    modal="habit"
    :title="'Create Habit'"
    :handleSubmit="createHabit"
    :formValid="formValid"
    class="w-96"
  >
    <BaseInput
      title="Title"
      :value="title"
      @input="updateTitle"
      :class="titleInvalid ? 'invalid-input' : ''"
      @blur="touchField('title')"
    />
    <BaseInput
      title="Description"
      :value="description"
      @input="updateDescription"
      optional
    />
    <DatePicker
      title="Start Date"
      :value="startDate"
      @input="updateStartDate"
    />
    <TimePicker
      title="Start Time"
      :value="startTime"
      @input="updateStartTime"
      :class="startTimeInvalid ? 'invalid-input' : ''"
      @change="touchField('startTime')"
    />
    <BaseInput
      title="Duration (min)"
      :value="duration"
      @input="updateDuration"
      optional
      type="number"
    />
    <RepeatSelector title="Repeat type" :value="repeat" @input="updateRepeat" />
    <WeekdaySelector
      v-if="showWeekdaySelector"
      title="Select days"
      :value="weekdays"
      @input="updateWeekdays"
      :customClass="weekdaysInvalid ? 'invalid-input' : ''"
      @input="touchField('weekdays')"
    />
  </Portal>
</template>

<script>
import { today } from "@internationalized/date";
import { mapActions, mapState } from "vuex";
import BaseInput from "../forms/BaseInput.vue";
import DatePicker from "../forms/DatePicker.vue";
import RepeatSelector from "../forms/RepeatSelector.vue";
import TimePicker from "../forms/TimePicker.vue";
import WeekdaySelector from "../forms/WeekdaySelector.vue";
import Portal from "./Portal.vue";

// Vue 2 uses options API instead of Composition API
export default {
  name: "HabitModal",

  components: {
    BaseInput,
    DatePicker,
    RepeatSelector,
    TimePicker,
    WeekdaySelector,
    Portal,
  },

  data() {
    return {
      title: "",
      description: "",
      startDate: today("UTC"),
      startTime: null,
      duration: 30,
      repeat: "daily",
      weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      touched: {
        title: false,
        startTime: false,
        weekdays: false,
      },
    };
  },

  computed: {
    // In Vue 2, you can use mapState to get store state
    ...mapState({
      showModal: (state) => state.modals.habit,
    }),

    showWeekdaySelector() {
      return this.repeat === "weekly";
    },

    formValid() {
      if (!this.title) return false;
      if (!this.startDate) return false;
      if (!this.startTime) return false;
      if (
        this.repeat === "weekly" &&
        (!this.weekdays || this.weekdays.length === 0)
      )
        return false;
      return true;
    },

    titleInvalid() {
      return this.touched.title && !this.title;
    },

    startTimeInvalid() {
      return this.touched.startTime && !this.startTime;
    },

    weekdaysInvalid() {
      return (
        this.touched.weekdays &&
        this.repeat === "weekly" &&
        (!this.weekdays || this.weekdays.length === 0)
      );
    },
  },

  methods: {
    // In Vue 2, you can use mapActions to use store actions
    ...mapActions(["addHabit", "toggleModal"]),

    // In Vue 2, we need individual update methods for two-way binding
    updateTitle(value) {
      this.title = value;
    },

    updateDescription(value) {
      this.description = value;
    },

    updateStartDate(value) {
      this.startDate = value;
    },

    updateStartTime(value) {
      this.startTime = value;
    },

    updateDuration(value) {
      this.duration = value;
    },

    updateRepeat(value) {
      this.repeat = value;
    },

    updateWeekdays(value) {
      this.weekdays = value;
    },

    touchField(field) {
      this.touched[field] = true;
    },

    createHabit() {
      if (!this.formValid) {
        console.error("Please fill in all required fields");
        return;
      }

      this.addHabit({
        title: this.title,
        description: this.description,
        startDate: this.startDate.toDate("UTC"),
        startTime: this.startTime,
        duration: this.duration,
        repeat: this.repeat,
        weekdays: this.repeat === "weekly" ? this.weekdays : undefined,
        totalCount: 0,
        streakCount: 0,
        createdAt: new Date(),
        completedAt: [],
      });

      // Close the modal and reset form
      this.toggleModal({ name: "habit", value: false });
      this.resetForm();
    },

    resetForm() {
      this.title = "";
      this.description = "";
      this.startDate = today("UTC");
      this.startTime = null;
      this.duration = 30;
      this.repeat = "daily";
      this.weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
      this.touched = {
        title: false,
        startTime: false,
        weekdays: false,
      };
    },
  },
};
</script>
