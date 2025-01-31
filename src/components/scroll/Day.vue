<script setup>
const props = defineProps({
  day: Number,
  month: String,
  year: Number,
  selected: Boolean
});

const emit = defineEmits(['select']);

const handleClick = () => {
  emit('select', props.day);
};
</script>

<template>
  <div>
    <button 
      :class="selected ? 'day selected' : 'day'" 
      @click="handleClick"
    >
      <div class="content">
        <p class="day-number">{{ day }}</p>
        <div class="month-year">
          <p>{{ month }}</p>
          <p>{{ year }}</p>
        </div>
      </div>
    </button>
  </div>
</template>

<style scoped>
.day {
  height: 5rem;
  width: 8rem;
  padding: 1rem;
  border-radius: 50px;
  color: white;
  background-color: indigo;
  opacity: 0.6;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.selected {
  background-color: navajowhite;
  color: indigo;
}

.day-number {
  font-weight: 700;
  font-size: 30px;
}

.month-year {
  display: flex;
  gap: 5px;
}

</style>