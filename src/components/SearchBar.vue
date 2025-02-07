<script setup>
import { ref } from 'vue'

// Liste des options
const options = [
  'Pizza Pizza',
  'Grillades Torino',
  'McDonalds',
  'Sushi X ',
  'Holy Burgers',
  'Chocolato',
]

const searchQuery = ref('')
const filteredSuggestions = ref([])

const resetSearch = () => {
  searchQuery.value = ''
  filteredSuggestions.value = []
}

const updateSuggestions = () => {
  const search = searchQuery.value.trim()
  if (search !== '') {
    filteredSuggestions.value = options.filter((option) =>
      option.toLowerCase().includes(search.toLowerCase()),
    )
  } else {
    filteredSuggestions.value = []
  }
}
</script>

<template>
  <div id="container-drop">
    <div id="dropDown-container">
      <div class="search-bar">
        <!--<img
          src="../assets/images/search-svgrepo-com%20(1).svg"
          alt="search-logo"
          class="search-icon"
        />-->
        <input
          id="text-field"
          type="text"
          v-model="searchQuery"
          placeholder="Find your favorite meal here!"
          @input="updateSuggestions"
        />
        <button id="reset-button" @click="resetSearch">X</button>
      </div>

      <div id="suggestions-container" v-if="filteredSuggestions.length > 0">
        <div
          v-for="(suggestion, index) in filteredSuggestions"
          :key="index"
          class="suggestion"
          @click="searchQuery = suggestion"
        >
          {{ suggestion }}
        </div>
      </div>

      <div v-if="filteredSuggestions.length === 0 && searchQuery.trim() !== ''">
        <div class="no-result">No results found</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#container-drop {
  position: relative;
  width: 350px;
}

#dropDown-container {
  position: relative;
  color: black;
}

.search-bar {
  display: flex;
  align-items: center;
  border-radius: 15px;
  padding: 5px;
  background-color: #ffffff;
  max-width: 750px;
  width: 100%;
}

.search-bar input {
  border: none;
  padding: 5px;
  font-size: 20px;
  width: 680px;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  outline: none;
}
/*
.search-icon {
  width: 40px;
  height: 25px;
  margin-right: 10px;
}*/

#reset-button {
  background: none;
  border: none;
  font-size: 20px;
  color: #0b0b0b;
  cursor: pointer;
  margin-left: 10px;
}

#reset-button:hover {
  color: #333;
}

#suggestions-container {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  border-radius: 15px;
  width: 100%;
  font-size: 20px;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
}

.suggestion {
  padding: 8px;
  cursor: pointer;
}

.suggestion:hover {
  background-color: #9f9a9a;
}

.no-result {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  border-radius: 15px;
  font-size: 20px;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
}
</style>
