<script setup>
import { api } from 'src/boot/axios'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const postId = computed(() => route.params.id)
/** @type {import('src/types/post').Post} */
const post = ref(null)
const open = ref(false)

function setOpen (isOpen) {
  open.value = isOpen
  if (!isOpen) {
    setTimeout(() => {
      router.push({ name: route.matched.slice(-2).shift().name })
    }, 300)
  }
}

watch(postId, async () => {
  open.value = false
  const { data } = await api.get(`https://jsonplaceholder.typicode.com/posts/${postId.value}`)
  post.value = data
  open.value = true
}, { immediate: true })
</script>

<template>
  <q-dialog :model-value="open" @update:model-value="setOpen">
    <q-card>
      <q-card-section>
        <h4 class="q-mt-none">{{ post.title }}</h4>
        <p>{{ post.body }}</p>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
