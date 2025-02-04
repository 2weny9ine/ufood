<template>
  <header class="header">
    <div class="logo">
      <img src="../assets/Logo.png" alt="Logo" />
    </div>
    <Navigation />
  </header>
</template>
<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
</script>
<style>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #f55702;
  color: white;
  border-radius: 25px;
}
.logo img {
  height: 70px;
  margin-right: 10px;
}
</style>
