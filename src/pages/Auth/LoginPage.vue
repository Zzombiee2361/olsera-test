<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRouter()

const userId = ref(null)
const email = ref(null)
const loginFailed = ref(false)

async function submit () {
  loginFailed.value = false
  const { data: user } = await api.get(`https://jsonplaceholder.typicode.com/users/${userId.value}`)
  if (email.value === user.email) {
    store.commit('auth/setUser', user)
    route.push({ name: 'home' })
  } else {
    loginFailed.value = true
  }
}
</script>

<template>
  <div class="container q-mt-md">
    <q-form @submit="submit">
      <q-card>
        <q-card-section>
          <h3 class="q-mt-none">Login</h3>
          <q-input
            v-model="userId"
            label="User ID"
            bottom-slots
            :error="loginFailed"
            error-message="User ID dan Email tidak cocok"
          />
          <q-input
            v-model="email"
            label="Email"
            type="email"
          />
        </q-card-section>
        <q-card-actions vertical>
          <q-btn color="primary" type="submit">Login</q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>
