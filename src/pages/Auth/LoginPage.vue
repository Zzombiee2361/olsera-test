<script setup>
import { api } from 'src/boot/axios'
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const open = ref(true)
const userId = ref(null)
const email = ref(null)
const loginFailed = ref(false)

function setOpen (isOpen) {
  open.value = isOpen
  if (!isOpen && !store.state.auth.user) {
    setTimeout(() => {
      router.back()
    }, 300)
  }
}

async function submit () {
  loginFailed.value = false
  const { data: user } = await api.get(`https://jsonplaceholder.typicode.com/users/${userId.value}`)
  if (email.value === user.email) {
    store.commit('auth/setUser', user)
    nextTick(() => {
      router.push({ name: 'admin' })
    })
  } else {
    loginFailed.value = true
  }
}
</script>

<template>
  <q-dialog :model-value="open" @update:model-value="setOpen">
    <q-card style="width: 500px">
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
    </q-card>
  </q-dialog>
</template>
