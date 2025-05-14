<script setup lang="ts">
import { X } from "lucide-vue-next";
import { modalsStore, type Modals } from "../../stores";
import { cn } from "../../utils/cn";
import BaseButton from "../buttons/BaseButton.vue";
import PrimaryButton from "../buttons/PrimaryButton.vue";

const props = defineProps<{
  modal: Modals;
  title: string;
  handleSubmit: () => void;
  class?: string;
}>();

const { modal } = props;

const modals = modalsStore();

function closeModal() {
  modals.toggleModal(modal, false);
}
</script>

<template>
  <Teleport to="#portal">
    <div class="fixed top-0 left-0 z-1000 h-screen w-screen">
      <div
        role="button"
        class="h-screen w-screen bg-black/50"
        @click="closeModal"
      />
      <div
        :class="
          cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-activity-0 p-6',
            props.class,
          )
        "
      >
        <div class="mb-3 flex justify-between">
          <h2 class="text-xl font-bold">{{ title }}</h2>
          <X color="white" class="cursor-pointer" @click="closeModal" />
        </div>
        <div class="flex flex-col gap-2">
          <slot />
        </div>
        <div class="mt-3 flex justify-end gap-1">
          <BaseButton :click="closeModal">Close</BaseButton>
          <PrimaryButton :click="handleSubmit">Save</PrimaryButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>
