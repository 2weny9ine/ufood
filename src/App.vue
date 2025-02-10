<template>
  <div>
    <Header v-if="!route.meta.hideHeader" />
    <router-view />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style></style>
