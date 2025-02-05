<template>
  <div>
    <Header :isUserPage="route.path === '/user'" />
    <router-view />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style></style>
