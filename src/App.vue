<template>
  <div class="container">
    <div v-if="currentPage === 'register'" class="page">
      <h2>Register</h2>
      <div class="form">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" />
        <button @click="register">Register</button>
      </div>
    </div>


    <div v-else-if="currentPage === 'login'" class="page">
      <h2>Login</h2>
      <div class="form">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button @click="login">Login</button>
      </div>
    </div>

    
    <div v-else-if="currentPage === 'dashboard'" class="page">
      <h2>Welcome, {{ currentUser.email }}</h2>
      <div class="form">
        <button @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

input, button {
  margin-bottom: 10px;
}
</style>

<script setup>
import { useUserStore } from './stores/user.js'
import {computed, ref} from "vue";

const userStore = useUserStore()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const currentPage = ref('register')

const register = () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }

  userStore.register(email.value, password.value)
  currentPage.value = 'login'
}

const login = () => {
  const user = userStore.login(email.value, password.value)

  if (user) {
    currentPage.value = 'dashboard'
  } else {
    alert('Invalid email or password')
  }
}

const logout = () => {
  userStore.logout()
  currentPage.value = 'login'
}

const currentUser = computed(() => userStore.currentUser)
</script>
