<template>
  <div class="flex flex-col gap-1" :class="customClass">
    <label class="text-primary block text-lg font-medium opacity-80"
      >{{ title }}{{ optional ? "" : "*" }}</label
    >
    <div class="flex flex-wrap gap-2">
      <button
        v-for="day in weekdays"
        :key="day.value"
        type="button"
        @click="toggleDay(day.value)"
        :class="[
          'cursor-pointer rounded-md border px-2 py-1 transition-all',
          isSelected(day.value)
            ? 'border-activity-4 bg-activity-4 text-white'
            : 'border-activity-2 bg-activity-1 text-text-primary',
        ]"
      >
        {{ day.label }}
      </button>
    </div>
  </div>
</template>

<script>
// Vue 2 uses a different component structure with options API
export default {
  name: "WeekdaySelector",

  // Props in Vue 2 are defined in a props object
  props: {
    title: {
      type: String,
      required: true,
    },
    optional: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      default: () => [],
    },
    customClass: {
      type: String,
      default: "",
    },
  },

  // Data in Vue 2 is a function that returns an object
  data() {
    return {
      weekdays: [
        { value: "Mon", label: "Mon" },
        { value: "Tue", label: "Tue" },
        { value: "Wed", label: "Wed" },
        { value: "Thu", label: "Thu" },
        { value: "Fri", label: "Fri" },
        { value: "Sat", label: "Sat" },
        { value: "Sun", label: "Sun" },
      ],
    };
  },

  // Methods in Vue 2 are defined in the methods object
  methods: {
    toggleDay(day) {
      let newValue = [...(this.value || [])];

      if (!newValue.length) {
        newValue = [day];
      } else if (newValue.includes(day)) {
        newValue = newValue.filter((d) => d !== day);
      } else {
        newValue.push(day);
      }

      // Vue 2 uses $emit for two-way binding
      this.$emit("input", newValue);
    },

    isSelected(day) {
      return this.value && this.value.includes(day);
    },
  },
};
</script>

<style scoped>
/* Styles remain the same */
</style>
