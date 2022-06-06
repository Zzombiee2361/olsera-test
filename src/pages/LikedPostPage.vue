<script setup>
import PostCard from 'src/components/PostCard.vue'
import { useLikedPost } from 'src/composables/likedPost'

const { likedPostsData, togglePostLike } = useLikedPost()

</script>

<template>
  <q-page class="container">
    <router-view />
    <PostCard
      v-for="post in likedPostsData"
      :key="post.id"
      :post="post"
      :to="{ name: 'liked-posts.view', params: { id: post.id } }"
      liked
      @click:like="togglePostLike($event, post)"
    />
  </q-page>
</template>
