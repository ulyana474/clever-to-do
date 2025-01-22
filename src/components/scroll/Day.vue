<script setup>

defineProps({
  day: Number,
  weekday: String,
  month: String,
  year: Number,
  selected: Boolean
});

</script>

<template>
  <button 
    :class="{ 'day': true, 'selected': selected }" 
    @click="$emit('select', { day, weekday, month, year })"
  >
    <div class="content">
      <p class="weekday">{{ weekday }}</p>
      <p class="day-number">{{ day }}</p>
    </div>
  </button>
</template>

<style scoped>
.day {
  height: 5rem;
  width: 8rem;
  padding: 1rem;
  border-radius: 10px;
  color: white;
  background-color: indigo;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.selected {
  background-color: navajowhite;
  color: indigo;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.day-number {
  font-weight: 700;
  font-size: 30px;
}
</style>