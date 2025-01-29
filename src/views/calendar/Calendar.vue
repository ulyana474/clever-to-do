<script setup>
import { ref, onMounted, reactive, computed, watch } from 'vue';
import dayjs from 'dayjs';

let scroller = ref(null);
let days = ref([]);
const intersections = reactive({});

const today = dayjs();
const endOfYear = ref(today.endOf('year'));
const totalDays = ref(endOfYear.value.diff(today, 'day') + 1);

const daysGenerated = ref(
  Array.from({ length: totalDays.value }, (_, i) => 
  today.add(i, 'day').format('YYYY-MM-DD'))
);

const lastDay = computed(() => daysGenerated.value.at(-1));

const generateNext365Days = () => {
  const lastDay = dayjs(daysGenerated.value[daysGenerated.value.length - 1]);
  const nextDays = Array.from({ length: 365 }, (_, i) => lastDay.add(i + 1, 'day').format('YYYY-MM-DD'));
  daysGenerated.value = [...daysGenerated.value, ...nextDays];
};

const generateInitialDays = () => {
  daysGenerated.value = Array.from(
    { length: totalDays.value },
    (_, i) => today.add(i, 'day').format('YYYY-MM-DD')
  );
};

const updateObserver = () => {
  const dayElements = scroller.value.querySelectorAll('.day');
  dayElements.forEach((el) => observer.observe(el));
};

const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
          const dayId = entry.target.getAttribute('data-day');
          if (dayId) {
            if (!intersections[dayId]) {
              intersections[dayId] = 0;
            }
            intersections[dayId]++;

          }
          if (dayId == lastDay.value) {
            console.log('ksdxnksdnc')
            generateNext365Days();
          }
        }
      });
    },
    { root: null, rootMargin: '0px', threshold: 0.1 }
  );

onMounted(() => {
  days.value = Array.from(scroller.value.querySelectorAll('.day'));

  generateInitialDays();
  watch(
    () => daysGenerated.value,
    () => updateObserver(),
    { flush: 'post' }
  );

  days.value.forEach((day) => {
    observer.observe(day);
  });
});

watch(days.value, (newDays) => {
  lastDay.value = newDays.at(-1);
});
</script>

<template>
  <div ref="scroller" class="scroller">
    <div v-for="day in daysGenerated" :key="day" class="day" :data-day="day">
      Day {{ day }}
    </div>
  </div>
</template>

<style scoped>
.scroller {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scroller::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.day {
  height: 100px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
}
</style>