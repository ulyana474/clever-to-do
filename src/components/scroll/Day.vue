<script setup>
import { Dayjs } from 'dayjs';

defineProps({
  value: Dayjs,
});
</script>

<template>
  <div class="day">{{ value }}</div>
</template>

<style scoped>
.day {
  height: 10rem;
  width: 10rem;
  padding: 2rem;
  color: white;
  background-color: indigo;
  display: flex;
  justify-content: center;
  align-items: center;
  /* font-size: 3rem; */
}
</style>