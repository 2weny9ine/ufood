<template>
  <header class="header">
    <div class="logo">
      <img src="../assets/images/Logo.png" alt="Logo" />
    </div>
    <SearchBar />
    <Navigation />
  </header>
</template>
<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import Navigation from '@/components/Navigation.vue'
</script>
<style>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  background-color: #f55702;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
.logo img {
  height: 40px;
  margin-right: 10px;
}
</style>
