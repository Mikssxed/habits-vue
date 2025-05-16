<script setup lang="ts">
import { type CalendarDate, today } from "@internationalized/date";
import { ArrowLeft, ArrowRight } from "lucide-vue-next";
import {
  DatePickerArrow,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerContent,
  DatePickerField,
  DatePickerGrid,
  DatePickerGridBody,
  DatePickerGridHead,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerHeader,
  DatePickerHeading,
  DatePickerNext,
  DatePickerPrev,
  DatePickerRoot,
  DatePickerTrigger,
} from "reka-ui";
import { ref } from "vue";

defineProps<{ title: string; optional?: boolean }>();
const modelValue = defineModel<CalendarDate>();
const open = ref(false);

function handleSelectDate(date: CalendarDate) {
  modelValue.value = date;
  open.value = !open.value;
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <label class="text-primary block text-lg font-medium opacity-80"
      >{{ title }}{{ optional ? "" : "*" }}</label
    >
    <DatePickerRoot
      :open="open"
      :default-value="today('UTC')"
      v-model="modelValue"
    >
      <DatePickerField
        class="bg-opacity-50 placeholder-opacity-50 relative h-[34px] w-full cursor-pointer rounded-lg border border-activity-2 bg-activity-1 px-2 py-1 text-text-primary placeholder-text-primary transition-all focus:border-transparent focus:ring-2 focus:ring-activity-4 focus:outline-none"
      >
        <input v-model="modelValue" type="text" placeholder="Select Date" />
        <DatePickerTrigger
          class="absolute top-0 left-0 h-full w-full cursor-pointer"
          @click="open = !open"
        />
      </DatePickerField>

      <DatePickerContent
        :side-offset="4"
        class="z-10000 rounded-xl border border-border bg-activity-1"
      >
        <DatePickerArrow class="fill-border stroke-border" />
        <DatePickerCalendar v-slot="{ weekDays, grid }" class="p-4">
          <DatePickerHeader class="flex items-center justify-between">
            <DatePickerPrev
              class="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-transparent hover:bg-bg-hover"
            >
              <ArrowLeft class="h-4 w-4" />
            </DatePickerPrev>

            <DatePickerHeading class="font-medium" />
            <DatePickerNext
              class="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-transparent hover:bg-bg-hover"
            >
              <ArrowRight class="h-4 w-4" />
            </DatePickerNext>
          </DatePickerHeader>
          <div
            class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-y-0 sm:space-x-4"
          >
            <DatePickerGrid
              v-for="month in grid"
              :key="month.value.toString()"
              class="w-full border-collapse space-y-1 select-none"
            >
              <DatePickerGridHead>
                <DatePickerGridRow class="mb-1 flex w-full justify-between">
                  <DatePickerHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="w-8 rounded-md text-xs"
                  >
                    {{ day }}
                  </DatePickerHeadCell>
                </DatePickerGridRow>
              </DatePickerGridHead>
              <DatePickerGridBody>
                <DatePickerGridRow
                  v-for="(weekDates, index) in month.rows"
                  :key="`weekDate-${index}`"
                  class="flex w-full"
                >
                  <DatePickerCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                  >
                    <DatePickerCellTrigger
                      :day="weekDate"
                      :month="month.value"
                      class="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-[9px] border border-transparent bg-transparent text-sm font-normal whitespace-nowrap outline-none before:absolute before:top-[5px] before:hidden before:h-1 before:w-1 before:rounded-full before:bg-white hover:border-border focus:shadow-border data-[outside-view]:text-white/30 data-[selected]:bg-activity-4 data-[selected]:font-medium data-[selected]:before:bg-white data-[today]:before:block data-[today]:before:bg-activity-4 data-[unavailable]:pointer-events-none data-[unavailable]:text-black/30 data-[unavailable]:line-through"
                      @click="handleSelectDate(weekDate)"
                    />
                  </DatePickerCell>
                </DatePickerGridRow>
              </DatePickerGridBody>
            </DatePickerGrid>
          </div>
        </DatePickerCalendar>
      </DatePickerContent>
    </DatePickerRoot>
  </div>
</template>
