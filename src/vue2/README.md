# Vue 2 vs Vue 3 Components

This directory contains Vue 2 equivalents of the Vue 3 components used in the Habits-Vue application. Below are the key differences between Vue 2 and Vue 3 syntax and approaches.

## Key Differences

### 1. Component Definition

**Vue 3 (Composition API):**

```vue
<script setup lang="ts">
import { ref, computed } from "vue";

const count = ref(0);
const doubled = computed(() => count.value * 2);

function increment() {
  count.value++;
}
</script>
```

**Vue 2 (Options API):**

```vue
<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    doubled() {
      return this.count * 2;
    },
  },
  methods: {
    increment() {
      this.count++;
    },
  },
};
</script>
```

### 2. Props Definition

**Vue 3:**

```vue
<script setup lang="ts">
const props = defineProps<{
  title: string;
  optional?: boolean;
}>();
</script>
```

**Vue 2:**

```vue
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    optional: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
```

### 3. Two-way Binding

**Vue 3:**

```vue
<script setup lang="ts">
const modelValue = defineModel<string>();
</script>

<template>
  <input v-model="modelValue" />
</template>
```

**Vue 2:**

```vue
<script>
export default {
  props: {
    value: String,
  },
  methods: {
    updateValue(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<template>
  <input :value="value" @input="updateValue" />
</template>
```

### 4. State Management

**Vue 3 (Pinia):**

```ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const habitsStore = defineStore("habits", () => {
  const count = ref(0);

  function increment() {
    count.value++;
  }

  return { count, increment };
});
```

**Vue 2 (Vuex):**

```js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    INCREMENT(state) {
      state.count++;
    },
  },
  actions: {
    increment({ commit }) {
      commit("INCREMENT");
    },
  },
});
```

### 5. TypeScript Support

- **Vue 3** has built-in TypeScript support with better type inference and checking
- **Vue 2** requires additional configuration and doesn't have as good TypeScript integration

### 6. Template Fragment Support

**Vue 3** allows multiple root elements in templates, while **Vue 2** requires a single root element.

## Component Implementation Differences

### HabitModal

- Vue 3: Uses `defineModel` for two-way binding, `ref()` for reactive variables
- Vue 2: Uses props/events pattern with value/input, explicit update methods

### WeekdaySelector

- Vue 3: Uses `defineModel` and `<script setup>`
- Vue 2: Uses `value` prop and `@input` event for v-model compatibility

### State Management

- Vue 3: Uses Pinia with a simpler, more intuitive API
- Vue 2: Uses Vuex with mutations, actions, and getters

## Migration Path

To migrate from Vue 2 to Vue 3:

1. Update dependencies (vue, vue-router, vuex→pinia)
2. Convert Options API to Composition API
3. Update v-model syntax
4. Replace Vuex with Pinia
5. Update global API usage

## Additional Resources

- [Vue 3 Migration Guide](https://v3-migration.vuejs.org/)
- [Composition API Documentation](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Pinia Documentation](https://pinia.vuejs.org/)
