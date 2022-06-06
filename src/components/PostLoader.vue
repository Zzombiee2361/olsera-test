<script setup>
import { useLikedPost } from 'src/composables/likedPost'
import { ref } from 'vue'
import PageIntersector from './PageIntersector.vue'
import PostCard from './PostCard.vue'

const props = defineProps({
  /** @type {import('vue').PropType<(page: number) => Promise<import('src/types/post').Post[]>>} */
  fetchData: {
    type: Function,
    required: true
  }
})

/** @type {import('src/types/post').Post[]} */
const posts = ref([])
const currentPage = ref(0)
const hasMorePage = ref(true)
const loading = ref(false)
// const likedPost = ref(new Set())
const { likedPosts, togglePostLike } = useLikedPost()

async function fetchNext () {
  if (!hasMorePage.value) {
    return
  }

  loading.value = true
  try {
    const fetchedPost = await props.fetchData(currentPage.value + 1)
    posts.value = posts.value.concat(fetchedPost)
    if (!fetchedPost.length) {
      hasMorePage.value = false
    }
    currentPage.value += 1
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <q-list>
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :liked="likedPosts.has(post.id)"
      :to="{ name: 'home.view', params: { id: post.id } }"
      @click:like="togglePostLike($event, post)"
    />
    <div v-if="loading" class="row justify-center q-py-lg">
      <q-spinner color="primary" size="3em" />
    </div>
    <PageIntersector :loading="loading" @intersect="fetchNext" />
  </q-list>
</template>
