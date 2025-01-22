import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useCalendarStore = defineStore('calendar', () => {

  const selectedDate = ref(null);

  return {
   selectedDate
  };
});
