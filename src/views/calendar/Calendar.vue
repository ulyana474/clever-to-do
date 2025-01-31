<script setup>
import { ref, onMounted, reactive, computed, watch, nextTick } from 'vue';
import { useCalendarStore } from '@/stores';
import dayjs from 'dayjs';
import Day from '@/components//scroll/Day.vue';
import TaskList from '@/components/taskList/TaskList.vue';

const calendarStore = useCalendarStore()

const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const dayId = entry.target.getAttribute('data-day');
          if (dayId) {
            if (!intersections[dayId]) {
              intersections[dayId] = 0;
            }
            intersections[dayId]++;

          }
          if (dayId == lastDay.value) {
            generateNext365Days();
          }
        }
      });
    },
    { root: null, rootMargin: '0px', threshold: 0.1 }
  );

let scroller = ref(null);
let days = ref([]);
const intersections = reactive({});

const today = dayjs();
const endOfYear = ref(today.endOf('year'));
const totalDays = ref(endOfYear.value.diff(today, 'day') + 1);

const selectedDay = ref(null);

const daysGenerated = ref(
  Array.from({ length: totalDays.value }, (_, i) => 
  today.add(i, 'day').format('YYYY-MM-DD'))
);

const lastDay = computed(() => daysGenerated.value.at(-1));

const parsedDays = computed(() =>
  daysGenerated.value.map((date) => ({
    date,
    day: dayjs(date).date(),
    month: dayjs(date).format('MMMM'),
    year: dayjs(date).year(),
  }))
);

const generateNext365Days = () => {
  const lastDay = dayjs(daysGenerated.value[daysGenerated.value.length - 1]);
  const nextDays = Array.from({ length: 365 }, (_, i) => lastDay.add(i + 1, 'day').format('YYYY-MM-DD'));
  daysGenerated.value = [...daysGenerated.value, ...nextDays];
};

const generateInitialDays = async () => {
  await nextTick();
  daysGenerated.value = Array.from(
    { length: totalDays.value },
    (_, i) => today.add(i, 'day').format('YYYY-MM-DD')
  );
};

const updateObserver = () => {
  const dayElements = scroller.value.querySelectorAll('.day');
  dayElements.forEach((el) => observer.observe(el));
};

const handleDaySelect = (day) => {
  selectedDay.value = {
    day: day.day,
    month: day.month,
    year: day.year
  };
  calendarStore.selectedDay = selectedDay.value;
};

onMounted(() => {
  selectedDay.value = {
    day: today.date(),
    month: today.format('MMMM'),
    year: today.year()
  }; 

  calendarStore.selectedDay = selectedDay.value

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

watch(parsedDays, () => {
  updateObserver();
}, { deep: true });
</script>

<template>
  <div ref="scroller" class="scroller">
    <Day 
      v-for="day in parsedDays"
      :key="day"
      :data-day="day.date"
      :day="day.day"
      :month="day.month"
      :year="day.year"
      :selected="selectedDay?.day === day?.day &&
                 selectedDay?.month === day?.month &&
                 selectedDay?.year === day?.year"
      @select="handleDaySelect(day)"
    />
  </div>
  <TaskList/>
</template>

<style scoped>
.scroller {
  height: 100%;
  width: 85%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  display: flex;
  gap: 2%;
  margin: 5% 7% 0 5%;
}
</style>