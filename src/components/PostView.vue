<script setup>
import { api } from 'src/boot/axios'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PostComment from './PostComment.vue'

const route = useRoute()
const router = useRouter()
const postId = computed(() => route.params.id)
/** @type {import('src/types/post').Post} */
const open = ref(false)
const opening = ref(false)
const post = ref(null)
const comments = ref([])

function setOpen (isOpen) {
  open.value = isOpen
  if (!isOpen) {
    setTimeout(() => {
      router.push({ name: route.matched.slice(-2).shift().name })
    }, 300)
  }
}

watch(postId, async () => {
  open.value = true
  opening.value = true
  if (postId.value) {
    const { data } = await api.get(`https://jsonplaceholder.typicode.com/posts/${postId.value}`)
    post.value = data
    const { data: commentData } = await api.get(`https://jsonplaceholder.typicode.com/posts/${postId.value}/comments`)
    comments.value = commentData
  }
  opening.value = false
}, { immediate: true })
</script>

<template>
  <q-dialog :model-value="open" @update:model-value="setOpen">
    <q-card v-if="opening" style="width: 300px">
      <div class="row justify-center q-py-lg">
      <q-spinner color="primary" size="3em" />
      </div>
    </q-card>
    <q-card v-else>
      <q-card-section>
        <h4 class="q-mt-none">{{ post.title }}</h4>
        <p>{{ post.body }}</p>
      </q-card-section>

      <q-list v-if="comments.length" bordered>
        <q-item-label header>
          Comments
        </q-item-label>

        <PostComment
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
        />
      </q-list>
    </q-card>
  </q-dialog>
</template>
