<script setup>
import { computed, ref } from 'vue'
import NavLink from 'components/NavLink.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const user = computed(() => store.state.auth.user)

const linksList = computed(() => [
  {
    title: 'Home',
    icon: 'dashboard',
    to: { name: 'home' },
    exact: true
  },
  {
    title: 'Liked Post',
    icon: 'favorite',
    to: { name: 'liked-posts' }
  },
  ...(user.value ? [{
    title: 'Admin',
    icon: 'article',
    to: { name: 'admin' }
  }] : [])
])

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logout () {
  store.commit('auth/setUser', null)
  router.push({ name: 'login' })
}

</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <q-btn v-if="user" flat @click="logout">
          Logout
        </q-btn>
        <q-btn v-else flat :to="{ name: 'login' }">
          Login
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <NavLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
