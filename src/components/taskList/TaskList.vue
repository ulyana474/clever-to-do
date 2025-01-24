<template>
  <div id="app">
    <div v-if="useCalendar.selectedDate">
      <h2>
        Tasks for {{ useCalendar.selectedDate.month }} {{ useCalendar.selectedDate.date }},
        {{ useCalendar.selectedDate.year }}
      </h2>
      <input
        v-model="newTask"
        placeholder="Add a new task"
        @keyup.enter="addTask"
      />
      <button @click="addTask">Add Task</button>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          <input type="checkbox" v-model="task.completed" />
          <span :class="{ 'completed-task': task.completed }">
            {{ task.text }}
          </span>
          <button @click="removeTask(task.id)">Delete</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Please select a date to view and add tasks.</p>
    </div>
  </div>
</template>

  
<script setup>
import { ref, onMounted } from 'vue';
import db from '@/firebaseConfig';
import {
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { useCalendarStore } from '@/stores';

const useCalendar = useCalendarStore()

const newTask = ref('');
const tasks = ref([]);

// const tasksCollection = collection(db, 'tasks');

const tasksCollection = 'tasks'

const getDateKey = (date) => `${date.year}-${date.month}-${date.date}`;

const fetchTasksForSelectedDate = async () => {
  if (!useCalendar.selectedDate) return;

  const dateKey = getDateKey(useCalendar.selectedDate);
  const q = query(tasksCollection, where('dateKey', '==', dateKey));

  const querySnapshot = await getDocs(q);
  tasks.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const addTask = async () => {
  if (newTask.value.trim() !== '' && useCalendar.selectedDate) {
    const dateKey = getDateKey(useCalendar.selectedDate);
    const newTaskDoc = {
      text: newTask.value,
      completed: false,
      dateKey,
      createdAt: new Date(),
    };

    await addDoc(tasksCollection, newTaskDoc);
    newTask.value = '';
    await fetchTasksForSelectedDate();
  }
};

const removeTask = async (taskId) => {
  const taskDoc = doc(db, 'tasks', taskId);
  await deleteDoc(taskDoc);
  await fetchTasksForSelectedDate();
};

onMounted(() => {
  fetchTasksForSelectedDate();
});
</script>
