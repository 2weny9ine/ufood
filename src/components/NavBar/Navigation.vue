<template>
  <nav>
    <ul>
      <li>
        <router-link to="/Home">Home</router-link>
      </li>
      <li class="user-container">
        <span class="user-greeting" @click="toggleDropdown">Hi, {{ user.firstName }}</span>
        <div v-if="dropdownVisible" class="dropdown-menu">
          <router-link to="/user" class="dropdown-item">
            <img src="@/assets/images/profileicon.svg" alt="Profile Icon" class="icon" />
            Profile
          </router-link>
          <router-link to="/" class="dropdown-item">
            <img src="@/assets/images/logouticon.svg" alt="Log out Icon" class="icon" />
            Log out
          </router-link>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import userData from '@/assets/user.json'

const dropdownVisible = ref(false)

const user = ref({
  firstName: '',
  lastName: '',
  followers: 0,
  following: 0,
  rating: 0,
})

onMounted(() => {
  user.value = userData
})

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value
}
</script>

<style scoped></style>

<style>
.icon {
  fill: #f3f0f0;
}
nav ul {
  display: flex;
  list-style: none;
  gap: 10px;
  align-items: center;
  position: relative;
}

nav a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
}

nav a:hover {
  color: #f4b4b4;
}

.user-container {
  position: relative;
  cursor: pointer;
}

.user-greeting {
  font-size: 20px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}

.user-greeting:hover {
  color: #f4b4b4;
}

.dropdown-menu {
  position: absolute;
  top: 70px;
  right: 0;
  background: #f55702;
  color: #f3f0f0;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 180px;
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  padding: 10px;
  text-decoration: none;
  color: #ffffff;
  display: flex;
}

.dropdown-item:hover {
  background: #f4b4b4;
  color: white;
}

.logout {
  border: none;
  background: none;
  width: 100%;
  cursor: pointer;
}

.logout:hover {
  background: #f4b4b4;
  color: white;
}
.icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  color: white;
}
</style>
