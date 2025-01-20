<script setup>
import { ref, onMounted } from 'vue'
const emits = defineEmits(['infinite'])
let scroller = ref(null)
let endOfScroller = ref()
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      let entry = entries[0]
      if (entry.isIntersecting) {
        emits('infinite')
      }
    },
    { root: null, rootMargin: '0px', threshold: 0 },
  )
  observer.observe(endOfScroller.value)
})
</script>

<template>
  <div ref="scroller" class="scroller">
    <slot></slot>
    <div ref="endOfScroller"></div>
  </div>
</template>

<style scoped>
.scroller {
  height: 100%;
  width: 100%;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scroller::-webkit-scrollbar {
    width: 0;
    height: 0;
}
</style>
