<script setup>
import { ref } from 'vue'

const searchQuery = ref('')

const emitSearch = () => {
  console.log('Searching for:', searchQuery.value)
}
</script>

<template>
  <div class="search-bar">
    <img src="../assets/search-svgrepo-com%20(1).svg" alt="search-logo" class="search-icon" />
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search other Ufooders..."
      @input="emitSearch"
    />
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  border-radius: 50px;
  padding: 10px;
  background-color: white;
  max-width: 750px;
  width: 100%;
}

.search-bar input {
  border: none;
  padding: 8px;
  font-size: 25px;
  width: 100%;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  outline: none;
}
.search-icon {
  width: 40px;
  height: 25px;
  margin-right: 10px;
}
</style>
