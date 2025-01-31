import dayjs from 'dayjs';
import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useCalendarStore = defineStore('calendar', () => {

  const selectedDay = ref(dayjs());

  return {
   selectedDay
  };
});
