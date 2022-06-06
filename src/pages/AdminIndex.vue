<script setup>
import { api } from 'src/boot/axios'
import PostLoader from 'src/components/PostLoader.vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

const route = useRoute()
const store = useStore()
const $q = useQuasar()
const limit = 15

async function fetchData (page) {
  const userId = store.state.auth.user.id
  const { data } = await api.get(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}&_page=${page}&_limit=${limit}`
  )
  return data
}

function confirmDelete (post, removePost) {
  $q.dialog({
    title: 'Are you sure?',
    message: 'Are you sure you want to delete this post?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    api.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
      .then(() => {
        removePost(post)
      })
  })
}

onBeforeRouteUpdate((to, from, next) => {
  if (to.fullPath === route.fullPath) {
    // refresh page here
    // disabled because server is not actually updating data
    // postLoader.refresh()
  }
  next()
})
</script>

<template>
  <q-page class="container">
    <router-view />

    <PostLoader :fetch-data="fetchData" detail-route="admin.view">
      <template #action="{ post, removePost }">
        <div class="text-grey-8 q-gutter-xs">
          <q-btn
            class="gt-xs"
            size="12px"
            flat
            dense
            round
            icon="edit"
            :to="{ name: 'admin.edit', params: { id: post.id } }"
            @click.stop
          />
          <q-btn
            size="12px"
            flat
            dense
            round
            icon="delete"
            @click.stop.prevent="confirmDelete(post, removePost)"
          />
        </div>
      </template>
    </PostLoader>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" :to="{ name: 'admin.create' }" />
    </q-page-sticky>
  </q-page>
</template>
