<template>
  <div class="search-bar-container">
    <div class="search-bar">
      <img
        src="../assets/images/search-svgrepo-com%20(1).svg"
        alt="search-logo"
        class="search-icon"
      />
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for a restaurant..."
        @input="onInput"
        @focus="showSuggestions = true"
        @blur="hideSuggestions"
        class="search-input"
      />
    </div>
    <div v-if="showSuggestions && suggestions.length > 0" class="suggestions">
      <ul>
        <li
          v-for="suggestion in suggestions"
          :key="suggestion.id"
          @click="selectSuggestion(suggestion)"
          class="suggestion-item"
        >
          {{ suggestion.name }}
        </li>
      </ul>
    </div>
    <div v-else-if="showSuggestions && searchQuery && !suggestions.length" class="no-results">
      No restaurants found
    </div>
  </div>
</template>

<script>
import { getRestaurants } from '@/api/restaurants.js'

export default {
  data() {
    return {
      searchQuery: '',
      suggestions: [],
      showSuggestions: false,
    }
  },
  methods: {
    async onInput() {
      if (!this.searchQuery) {
        this.suggestions = []
        this.showSuggestions = false
        return
      }

      try {
        const response = await getRestaurants({
          query: this.searchQuery,
          limit: 10,
          page: 1,
        })
        this.suggestions = response.items || []
        this.showSuggestions = true
      } catch (error) {
        console.error('Error fetching restaurant suggestions:', error)
        this.suggestions = []
      }
    },
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion.name
      this.showSuggestions = false
      this.$emit('select-restaurant', suggestion)
    },
    hideSuggestions() {
      setTimeout(() => {
        this.showSuggestions = false
      }, 200)
    },
  },
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 5px;
  background-color: #ffffff;
  width: 95%;
}
.search-icon {
  width: 40px;
  height: 25px;
  margin-right: 10px;
}
.search-bar-container {
  position: relative;
  width: 300px;
}

.search-input {
  border: none;
  outline: none;
  border: none;
  width: 100%;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
}
.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.suggestion-item {
  padding: 10px;
  cursor: pointer;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
}

.suggestion-item:hover {
  background-color: #f55702;
  color: white;
}

.no-results {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: Arial, Helvetica, sans-serif;
  color: #666;
}
</style>
