<template>
  <div id="app">
    <div v-if="useCalendar.selectedDay">
      <h2>
        Tasks for {{ useCalendar.selectedDay.month }} {{ useCalendar.selectedDay.day }},
        {{ useCalendar.selectedDay.year }}
      </h2>
      <input v-model="newTask" placeholder="Add a new task" @keyup.enter="addTask" />
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
import { ref, onMounted, watch } from 'vue'
import { db } from '@/firebaseConfig'
import {
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  collection,
} from 'firebase/firestore'
import { useAuthStore, useCalendarStore } from '@/stores'

const useCalendar = useCalendarStore()
const authStore = useAuthStore()

const currUser = ref(authStore.user);

const newTask = ref('')
const tasks = ref([])

const tasksCollection = collection(db, 'tasks');

const getDateKey = (date) => `${date.year}-${date.month}-${date.day}`

const fetchTasksForSelectedDate = async () => {
  if (!useCalendar.selectedDay) return

  const dateKey = getDateKey(useCalendar.selectedDay)
  const q = query(tasksCollection, where('dateKey', '==', dateKey), where('userId', '==', currUser.value.uid))
  const querySnapshot = await getDocs(q)
  tasks.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

const addTask = async () => {
  if (newTask.value.trim() !== '' && useCalendar.selectedDay) {
    const dateKey = getDateKey(useCalendar.selectedDay)
    const newTaskDoc = {
      text: newTask.value,
      completed: false,
      dateKey,
      createdAt: new Date(),
      userId: currUser.value.uid
    }

    await addDoc(tasksCollection, newTaskDoc)
    newTask.value = ''
    await fetchTasksForSelectedDate()
  }
}

const removeTask = async (taskId) => {
  const taskDoc = doc(db, 'tasks', taskId)
  await deleteDoc(taskDoc)
  await fetchTasksForSelectedDate();
}

onMounted(async () => {
  if (useCalendar.selectedDay) {
    await fetchTasksForSelectedDate();
  }
})

watch(() => useCalendar.selectedDay, (newDay) => {
  if (newDay) {
    fetchTasksForSelectedDate()
  }
})

</script>
