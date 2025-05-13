import { defineStore } from "pinia";
import { reactive } from "vue";

type Modals = "habit";

export const modalsStore = defineStore("modals", () => {
  const modals = reactive<Record<Modals, boolean>>({
    habit: false,
  });

  function toggleModal(modal: Modals, open: boolean) {
    modals[modal] = open;
  }

  return {
    modals,
    toggleModal,
  };
});
