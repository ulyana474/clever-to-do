<script setup>
import dayjs from 'dayjs';
import { ref, computed } from 'vue';
import Day from '@/components/scroll/Day.vue';
import InfiniteScroller from '@/components/scroll/InfiniteScrollWrapper.vue';
import { useCalendarStore } from '@/stores/calendar-store';

const currentDate = ref(dayjs());
let items = ref([]);

const useCalendar = useCalendarStore();

const formattedItems = computed(() => {
  return items.value.map((item) => {
    return {
      date: item.date(),
      weekday: item.format('ddd'),
      month: item.format('MMMM'),
      year: item.year(),
    }
  })
})

const currentMonthYear = computed(() => {
  return `${currentDate.value.subtract(1, 'month').format('MMMM')} ${currentDate.value.year()}`
})

const generateDaysInMonth = () => {
  const startOfMonth = currentDate.value.startOf('month');
  const days = [];
  for (let i = 0; i < currentDate.value.daysInMonth(); i++) {
    days.push(startOfMonth.add(i, 'day'));
  }
  return days;
}

const loadNextMonth = () => {
  const newItems = generateDaysInMonth(currentDate.value);
  items.value = [...items.value, ...newItems];
  currentDate.value = currentDate.value.add(1, 'month');
}

const selectDate = (date) => {
  useCalendar.selectedDate = date;
};
</script>

<template>
  <div class="month-year">
    <p>{{ currentMonthYear }}</p>
  </div>

  <div class="calendar-container">
    <InfiniteScroller class="cards" @infinite="loadNextMonth">
      <Day
        v-for="(item, idx) in formattedItems"
        :day="item.date"
        :weekday="item.weekday"
        :month="item.month"
        :year="item.year"
        :key="idx"
        :selected="useCalendar.selectedDate?.date === item.date && 
                useCalendar.selectedDate?.month === item.month && 
                useCalendar.selectedDate?.year === item.year"
        @select="selectDate(item)"
      />
    </InfiniteScroller>
    <p v-if="useCalendar.selectedDate">Selected Date: {{ useCalendar.selectedDate }}</p>
  </div>
</template>

<style scoped>
.calendar-container {
  width: 600px;
  margin-left: 25%;
}

.cards {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;
}

.month-year {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 30px;
  font-weight: 800;
}

.selected-day {
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  padding: 5px;
}
</style>
