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
    default: false
  }
})
</script>

<template>
  <q-item class="post-card" v-bind="$attrs">
    <q-item-section>
      <q-item-label>{{ props.post.title }}</q-item-label>
      <q-item-label caption :lines="2">{{ props.post.body }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <slot name="action" :post="post" :liked="liked">
        <q-btn
          :color="liked ? 'red' : null"
          :icon="liked ? 'favorite' : 'favorite_border'"
          flat
          round
          @click.stop.prevent="emit('click:like', !liked, $event)"
        />
      </slot>
    </q-item-section>
  </q-item>
</template>

<style scoped>
.post-card:nth-child(odd) {
  background-color: #fff;
}
.post-card:nth-child(even) {
  background-color: #eee;
}
</style>
