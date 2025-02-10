<template>
  <div>
    <Header v-if="!route.meta.hideHeader" />
    <router-view />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

if (!route.name) {
  router.push('/')
}
</script>

<style></style>
