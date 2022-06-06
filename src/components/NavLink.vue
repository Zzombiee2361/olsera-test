<template>
  <q-item
    clickable
    tag="a"
    :to="to"
    :exact="exact"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    to: {
      type: null,
      required: true
    },

    icon: {
      type: String,
      default: ''
    },

    exact: {
      type: Boolean,
      default: false
    }
  }
})
</script>
