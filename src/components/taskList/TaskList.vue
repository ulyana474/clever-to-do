<template>
    <div id="app">
      <h1>Vue.js To-Do List</h1>
      <input v-model="newTask" placeholder="Add a new task" @keyup.enter="addTask" />
      <button @click="addTask">Add Task</button>
      <ul>
        <li v-for="(task, index) in tasks" :key="index">
          <input type="checkbox" v-model="task.completed" />
          <span :class="{ 'completed-task': task.completed }">{{ task.text }}</span>
          <button @click="removeTask(index)">Delete</button>
        </li>
      </ul>
    </div>
</template>
  
<script setup>

import { ref } from 'vue';

const tasks = ref([]);
const newTask = ref('');
  
const addTask = () => {
  if (newTask.value.trim() !== '') {
    tasks.value.push({ text: newTask.value, completed: false });
    newTask.value = '';
  }
}

const removeTask = (index) => {
  tasks.value.splice(index, 1);
}

</script>
  
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.completed-task {
  text-decoration: line-through;
  color: grey;
}

input {
  margin-bottom: 10px;
  padding: 5px;
}

button {
  margin-left: 5px;
  padding: 5px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
}

</style>