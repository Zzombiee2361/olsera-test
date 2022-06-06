<script setup>
import { api } from 'src/boot/axios'
import PostLoader from 'src/components/PostLoader.vue'

const limit = 15

async function fetchData (page) {
  const { data } = await api.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)
  return data
}
</script>

<template>
  <q-page class="container">
    <router-view />
    <PostLoader :fetch-data="fetchData" />
  </q-page>
</template>
