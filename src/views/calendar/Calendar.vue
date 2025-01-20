<script setup>
import dayjs from 'dayjs';
import { ref } from "vue";
import Day from "@/components/scroll/Day.vue"
import InfiniteScroller from "@/components/scroll/InfiniteScrollWrapper.vue";

const currentDate = ref(dayjs());
let items = ref([]);

const generateDaysInMonth = () => {
  const startOfMonth = currentDate.value.startOf('month');
  const days = [];
  for (let i = 0; i < currentDate.value.daysInMonth(); i++) {
    days.push(startOfMonth.add(i, 'day'));
  }
  return days;
};

const loadItems = async () => {
  const newItems = await generateDaysInMonth();
  console.log(newItems)
  items.value = [...items.value, ...newItems];
};

// const changeMonth = (direction) => {
//   currentDate.value = currentDate.value.add(direction, 'month');
// };
// const generateData = (limit, offset) => {
//   return new Promise((resolve) => {
//     const newData = Array(limit)
//       .fill(0)
//       .map((_, index) => index + offset * limit + 1);
//     setTimeout(resolve, 0, newData);
//   });
// };
</script>

<template>
  <InfiniteScroller class="cards" @infinite="loadItems">
    <Day v-for="(item, idx) in items" :value="item" :key="idx"></Day>
  </InfiniteScroller>
</template>

<style scoped>
.cards {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;
}
</style>
