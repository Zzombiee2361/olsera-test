<script setup>
const emit = defineEmits(['click', 'click:like'])

const props = defineProps({
  /** @type {import('vue').PropType<import('src/types/post').Post>} */
  post: {
    type: Object,
    required: true
  },
  liked: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <q-item v-bind="$attrs">
    <q-item-section>
      <q-item-label>{{ props.post.title }}</q-item-label>
      <q-item-label caption :lines="2">{{ props.post.body }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <div></div>
      <q-btn
        :color="liked ? 'red' : null"
        :icon="liked ? 'favorite' : 'favorite_border'"
        flat
        round
        @click="emit('click:like', !liked, $event)"
      />
    </q-item-section>
  </q-item>
</template>
