<script setup>
const props = defineProps({
  comment: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <q-item>
    <q-item-section>
      <q-item-label>{{ props.comment.name }}</q-item-label>
      <q-item-label caption>{{ props.comment.body }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
