<template>
  <header class="header">
    <div class="logo">
      <a href="/Home">
        <img src="@/assets/images/Logo.png" alt="Logo" />
      </a>
    </div>

    <div class="search-container">
      <SearchBar />
    </div>

    <button class="menu-toggle" @click="toggleMenu">
      <img src="@/assets/images/icone-version2.png" alt="Menu" />
    </button>

    <nav :class="['nav-links', { 'nav-active': isMenuOpen }]">
      <Navigation />
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchBar from '@/components/NavBar/SearchBarUser.vue'
import Navigation from '@/components/NavBar/Navigation.vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: #f55702;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.logo {
  margin-right: 20px;
}

.logo img {
  height: 40px;
}

.search-container {
  display: flex;
  min-width: 200px;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  justify-content: flex-end;
}

.menu-toggle img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 15px;
}

@media (max-width: 900px) {
  .header {
    padding: 5px;
  }

  .menu-toggle {
    display: flex;
    margin-left: 10px;
  }

  .nav-links {
    position: absolute;
    top: 60px;
    right: 0;
    background: #f55702;
    width: 100%;
    display: none;
    flex-direction: column;
    padding: 10px 0;
  }

  .nav-active {
    display: flex;
  }
}
</style>
