import { createTestingPinia } from "@pinia/testing";
import { render } from "@testing-library/vue";
import { createPinia, setActivePinia } from "pinia";
import { test } from "vitest";
import HabitsView from "../views/HabitsView.vue";

test("App test", async () => {
  setActivePinia(createPinia());
  const { findByText } = render(HabitsView, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

  await findByText("Create habit");
});
