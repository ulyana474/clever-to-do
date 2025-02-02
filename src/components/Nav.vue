<script setup>
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
    <nav v-show="authStore.user" class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav">
            <button @click="authStore.logout()" class="logout btn btn-link nav-item nav-link">Logout</button>
        </div>
    </nav>
</template>

<style scoped>
.logout {
  background-color: #590d22;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  line-height: 20px;
  padding: 10px 16px;
  text-align: center;
}
</style>