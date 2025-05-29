import { createTestingPinia } from "@pinia/testing";
import { render } from "@testing-library/vue";
import { createPinia, setActivePinia } from "pinia";
import { test } from "vitest";
import App from "../App.vue";

test("App test", () => {
  setActivePinia(createPinia());
  render(App, {
    global: {
      plugins: [createTestingPinia()],
    },
  });
});
