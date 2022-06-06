<script setup>
import { api } from 'src/boot/axios'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()
const router = useRouter()
const postId = computed(() => route.params.id)
/** @type {import('src/types/post').Post} */
const post = ref(null)
const open = ref(false)
const title = ref(null)
const body = ref(null)
const user = computed(() => store.state.auth.user)
const loading = ref(false)

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
  if (postId.value) {
    const { data } = await api.get(`https://jsonplaceholder.typicode.com/posts/${postId.value}`)
    post.value = data
    title.value = data.title
    body.value = data.body
  } else {
    title.value = null
    body.value = null
  }
  open.value = true
}, { immediate: true })

function submit () {
  const isCreate = !post.value
  const url = `https://jsonplaceholder.typicode.com/posts/${isCreate ? '' : post.value.id}`
  loading.value = true
  api({
    url,
    method: (isCreate ? 'POST' : 'PUT'),
    data: { title, body, userId: user.value.id }
  })
    .then(({ data }) => {
      console.log('updated', data)
      setOpen(false)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <q-dialog :model-value="open" @update:model-value="setOpen">
    <q-card style="width: 600px">
      <q-form @submit="submit">
        <q-card-section>
          <h4 class="q-mt-none">{{ post ? 'Update' : 'Create' }} Post</h4>
          <q-input
            v-model="title"
            label="Title"
            :rules="[val => !!val || 'Title is required']"
          />
          <q-input
            v-model="body"
            label="Body"
            :rules="[val => !!val || 'Body is required']"
          />
        </q-card-section>
        <q-card-actions>
          <q-space />
          <q-btn color="primary" type="submit" :loading="loading">Save</q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
