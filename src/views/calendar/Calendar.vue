<script setup>
import { ref, computed } from 'vue';
import dayjs from 'dayjs';

const currentDate = ref(dayjs());
const selectedDate = ref(null);

const daysInMonth = computed(() => {
  const startOfMonth = currentDate.value.startOf('month');
  const days = [];
  for (let i = 0; i < currentDate.value.daysInMonth(); i++) {
    days.push(startOfMonth.add(i, 'day'));
  }
  return days;
});

const changeMonth = (direction) => {
  currentDate.value = currentDate.value.add(direction, 'month');
};

const selectDate = (date) => {
  selectedDate.value = date;
};
</script>

<template>
  <div>
    <div>
      <button @click="changeMonth(-1)">Previous</button>
      <h2>{{ currentDate.format('MMMM YYYY') }}</h2>
      <button @click="changeMonth(1)">Next</button>
    </div>
    
    <div class="calendar-grid">
      <div v-for="day in daysInMonth" :key="day.format('YYYY-MM-DD')" @click="selectDate(day)">
        {{ day.format('DD') }}
      </div>
    </div>

    <p v-if="selectedDate">Selected Date: {{ selectedDate.format('YYYY-MM-DD') }}</p>
  </div>
</template>

<style scoped>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  padding: 20px;
}

.calendar-grid div {
  text-align: center;
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
