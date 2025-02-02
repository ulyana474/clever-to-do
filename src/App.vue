<script setup>
import Nav from '@/components/Nav.vue'
</script>

<template>
  <div>
    <Nav />
    <div>
      <router-view />
    </div>
  </div>
</template>

<style>
@import '@/assets/base.css';
</style>
