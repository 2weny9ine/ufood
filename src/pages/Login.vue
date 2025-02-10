<template>
  <section id="main">
    <div class="Main">
      <img src="../assets/images/background%20pic.png" alt="Background Image" class="image" />
      <div class="overlay">
        <div class="logo">
          <img src="../assets/images/Logo.png" alt="logo" />
        </div>
        <h1>Discover Flavor, Share the Love!</h1>
        <h2>Find & Share Your Favorite Restaurants!</h2>
        <div class="login-form">
          <input type="text" placeholder="Username" class="login-input" v-model="username" />
          <input type="password" placeholder="Password" class="login-input" v-model="password" />
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          <button class="Start" @click="handleLogin">Login</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.Main {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  filter: brightness(90%);
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  padding: 20px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.logo img {
  width: 200px;
  height: auto;
}

.overlay h1 {
  font-size: 3em;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 10px;
}

.overlay h2 {
  font-size: 1.5em;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 40px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin-top: 20px;
}

.login-input {
  width: 80%;
  max-width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.error-message {
  color: red;
  font-size: 0.9em;
  margin: -10px 0 10px;
}

.Start {
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
  font-size: 1.3em;
  font-weight: bold;
  cursor: pointer;
  font-family: Arial, Helvetica, sans-serif;
  color: #ffffff;
  background-color: #f55702;
}

.Start:hover {
  opacity: 0.8;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import userData from '@/assets/user.json'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
let user = ref({})

onMounted(() => {
  user.value = {
    username: userData.firstName.trim().toLowerCase(),
    password: userData.password,
  }
})

const handleLogin = () => {
  if (
    username.value.trim().toLowerCase() === user.value.username &&
    password.value === user.value.password
  ) {
    router.push('/Home')
  } else {
    errorMessage.value = 'Invalid username or password'
  }
}
</script>
