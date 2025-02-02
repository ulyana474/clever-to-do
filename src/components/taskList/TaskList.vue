<template>
  <div id="app">
    <div v-if="useCalendar.selectedDay" class="content">
      <h2>
        Tasks for {{ useCalendar.selectedDay }}
      </h2>
      
      <div class="add-task-section">
        <input v-model="newTask" placeholder="Add a new task" @keyup.enter="addTask" />
        <button @click="addTask">Add Task</button>
      </div>

      <ul>
        <li v-for="task in tasks" :key="task.id" class="task-item">
          <input type="checkbox" v-model="task.completed" />
          <span :class="{ 'completed-task': task.completed }">
            {{ task.text }}
          </span>
          <div class="task-actions">
            <button class="edit-button" @click="editTask(task)">Edit</button>
            <button class="delete-button" @click="removeTask(task.id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="editingTask" class="edit-task-modal">
      <input v-model="editingTask.text" placeholder="Edit task text" />
      <div class="modal-actions">
        <button @click="saveEditedTask">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div>

    <div v-else>
      <p>Add tasks here</p>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue'
import { db } from '@/firebase.config'
import {
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  collection,
  updateDoc
} from 'firebase/firestore'
import { useAuthStore, useCalendarStore } from '@/stores'

const useCalendar = useCalendarStore()
const authStore = useAuthStore()

const currUser = ref(authStore.user);

const newTask = ref('')
const tasks = ref([])
const editingTask = ref(null)

const tasksCollection = collection(db, 'tasks');

const getDateKey = (date) => `${date.year}-${date.month}-${date.day}`

const fetchTasksForSelectedDate = async () => {
  if (!useCalendar.selectedDay) return;

  const dateKey = getDateKey(useCalendar.selectedDay);

  const q = query(
    tasksCollection,
    where('dateKey', '==', dateKey),
    where('userId', '==', currUser.value.uid)
  );

  const querySnapshot = await getDocs(q);
  const newTasks = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const completedState = new Map(tasks.value.map(task => [task.id, task.completed]));

  tasks.value = newTasks.map(task => ({
    ...task,
    completed: completedState.get(task.id) ?? task.completed
  }));
};


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

const editTask = (task) => {
  editingTask.value = { ...task }
}

const saveEditedTask = async () => {
  if (editingTask.value && editingTask.value.text.trim() !== '') {
    const taskDoc = doc(db, 'tasks', editingTask.value.id)
    await updateDoc(taskDoc, { text: editingTask.value.text })
    editingTask.value = null
    await fetchTasksForSelectedDate()
  }
}

const cancelEdit = () => {
  editingTask.value = null
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

<style scoped>
#app {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
}

input[type="text"] {
  padding: 10px;
  width: 100%;
  font-size: 1rem;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
}

input[type="checkbox"] {
  margin-right: 10px;
}

button {
  padding: 8px 12px;
  font-size: 1rem;
  margin-top: 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
  color: #fff;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: background-color 0.3s;
}

li:hover {
  background-color: #f2f2f2;
}

.completed-task {
  text-decoration: line-through;
  color: #888;
}

button.delete-button {
  background-color: #e74c3c;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  margin-left: 10px;
}

button.edit-button {
  background-color: #f39c12;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  margin-left: 10px;
}

.edit-task-modal {
  position: fixed;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  z-index: 100;
}

.edit-task-modal input {
  padding: 10px;
  width: 100%;
  font-size: 1rem;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
}

.edit-task-modal button {
  margin-top: 10px;
}

.edit-task-modal button:first-of-type {
  background-color: #2ecc71;
  margin-right: 10px;
}

.edit-task-modal button:first-of-type:hover {
  background-color: #27ae60;
}

.edit-task-modal button:last-of-type {
  background-color: #e74c3c;
}

.edit-task-modal button:last-of-type:hover {
  background-color: #c0392b;
}

/* Модальные окна с фоном */
body {
  font-family: Arial, sans-serif;
}

body {
  font-family: 'Arial', sans-serif;
}

body {
  background-color: #f1f1f1;
}

</style>

