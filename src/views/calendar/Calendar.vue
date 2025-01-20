<script setup>
import { ref } from "vue";
import Day from "@/components/scroll/Day.vue"
import InfiniteScroller from "@/components/scroll/InfiniteScrollWrapper.vue";
let items = ref([]);
let limit = 30;
let offset = 0;

const loadItems = async () => {
  const newItems = await generateData(limit, offset);
  items.value = [...items.value, ...newItems];
  ++offset;
};
const generateData = (limit, offset) => {
  return new Promise((resolve) => {
    const newData = Array(limit)
      .fill(0)
      .map((_, index) => index + offset * limit + 1);
    setTimeout(resolve, 0, newData);
  });
};
</script>

<template>
  <InfiniteScroller class="cards" @infinite="loadItems">
    <Day v-for="item in items" :value="item" :key="item"></Day>
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
