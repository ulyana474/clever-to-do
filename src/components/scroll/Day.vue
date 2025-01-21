<script setup>

defineProps({
  day: Number,
  weekday: String,
  month: String,
  year: Number,
});
</script>

<template>
  <div class="day">
    <div class="content">
      <p class="weekday">{{ weekday }}</p>
      <p class="day-number">{{ day }}</p>
    </div>
  </div>
</template>

<style scoped>
.day {
  height: 3rem;
  width: 3rem;
  padding: 2rem;
  border-radius: 10px;
  color: white;
  background-color: indigo;
  display: flex;
  justify-content: center;
  align-items: center;
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