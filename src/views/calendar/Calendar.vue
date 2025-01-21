<script setup>
import dayjs from 'dayjs';
import { ref, computed } from "vue";
import Day from "@/components/scroll/Day.vue"
import InfiniteScroller from "@/components/scroll/InfiniteScrollWrapper.vue";

const currentDate = ref(dayjs());
let items = ref([]);
const selectedDate = ref(null);

const generateDaysInMonth = () => {
  const startOfMonth = currentDate.value.startOf('month');
  const days = [];
  for (let i = 0; i < currentDate.value.daysInMonth(); i++) {
    days.push(startOfMonth.add(i, 'day'));
  }
  return days;
};

const loadItems = () => {
  const newItems = generateDaysInMonth(currentDate.value);
  items.value = [...items.value, ...newItems];
  currentDate.value = currentDate.value.add(1, 'month');
};

const formattedItems = computed(() => {
  return items.value.map(item => {
    return {
      date: item.date(),
      weekday: item.format('ddd'),
      month: item.format('MMMM'),
      year: item.year(),
    };
  });
});

const selectDate = (date) => {
  selectedDate.value = date;
  console.log(selectedDate.value)
};
</script>

<template>
  <!-- <div class="month-year">
    <p>{{ item.month }}</p>
    <p>{{ item.year }}</p>
  </div> -->

  <div class="calendar-container">
    <InfiniteScroller class="cards" @infinite="loadItems">
      <Day
       v-for="(item, idx) in formattedItems"
       :day="item.date"
       :weekday="item.weekday"
       :month="item.month"
       :year="item.year"
       :key="idx"
       @click="selectDate(item)"
       />
    </InfiniteScroller>
    <p v-if="selectedDate">Selected Date: {{ selectedDate }}</p>
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
}
</style>
