<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  minRatio: {
    type: Number,
    default: 1
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['intersect'])

const triggerEl = ref(null)
const observer = ref(null)

/** @param {IntersectionObserverEntry[]} entry */
function intersectionHandler (entry) {
  if (
    entry[0].intersectionRatio >= props.minRatio &&
    !props.loading
  ) {
    emit('intersect')
  }
}

observer.value = new IntersectionObserver(
  (entry) => intersectionHandler(entry),
  {
    rootMargin: '200px',
    threshold: 1
  }
)

onMounted(() => {
  observer.value.observe(triggerEl.value)
})

onUnmounted(() => {
  observer.value.disconnect()
})
</script>

<template>
  <div ref="triggerEl"></div>
</template>
