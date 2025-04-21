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

        <div class="auth-toggle">
          <button :class="{ active: isLoginMode }" @click="isLoginMode = true">Login</button>
          <button :class="{ active: !isLoginMode }" @click="isLoginMode = false">Sign Up</button>
        </div>

        <div class="login-form">
          <input
            type="text"
            placeholder="Name"
            class="login-input"
            v-model="name"
            v-if="!isLoginMode"
          />
          <input type="text" placeholder="Email" class="login-input" v-model="username" />
          <input type="password" placeholder="Password" class="login-input" v-model="password" />

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          <button class="Start" @click="isLoginMode ? handleLogin() : handleSignup()">
            {{ isLoginMode ? 'Login' : 'Sign Up' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { authenticateUser, registerAccount } from '@/api/authentication'

const router = useRouter()

const isLoginMode = ref(true)
const username = ref('')
const password = ref('')
const name = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''

  if (!username.value.includes('@')) {
    errorMessage.value = 'Please enter a valid email address.'
    return
  }

  try {
    const [token, user] = await authenticateUser(username.value, password.value)
    Cookies.set('token', token)
    Cookies.set('userId', user.id)
    Cookies.set('userName', user.name)
    Cookies.set('userEmail', user.email)
    router.push('/Home')
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      errorMessage.value = 'Invalid email or password.'
    } else {
      errorMessage.value = error.message
    }
  }
}

const handleSignup = async () => {
  errorMessage.value = ''

  if (!username.value.includes('@')) {
    errorMessage.value = 'Please enter a valid email address.'
    return
  }

  try {
    await registerAccount(name.value, username.value, password.value)
    await handleLogin()
  } catch (error) {
    if (error.message.includes('already exists')) {
      errorMessage.value = 'An account with this email already exists.'
    } else {
      errorMessage.value = error.message || 'Signup failed. Please try again.'
    }
  }
}
</script>

<style scoped>
.error-message {
  color: #ff4d4d;
  font-size: 0.95em;
  background-color: #fff2f2;
  border: 1px solid #ffb3b3;
  padding: 10px 15px;
  border-radius: 8px;
  width: 90%;
  max-width: 320px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.Main {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin: 0;
  overflow: hidden;
  position: relative;
}

.image {
  position: fixed;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.auth-toggle {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.auth-toggle button {
  background-color: #f55702;
  border: none;
  color: white;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  opacity: 0.5;
}

.auth-toggle button.active {
  opacity: 1;
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

@media (max-width: 767px) {
  .overlay {
    padding: 10px;
  }

  .overlay h1 {
    font-size: 1.5em;
    word-break: break-word;
    margin-bottom: 5px;
  }

  .overlay h2 {
    font-size: 1em;
    word-break: break-word;
    margin-bottom: 20px;
  }

  .login-input {
    font-size: 14px;
    width: 90%;
  }

  .Start {
    font-size: 0.9em;
  }
}
</style>
