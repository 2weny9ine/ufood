<template>
  <div class="search-bar-container">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search for a restaurant..."
      @input="onInput"
      @focus="showSuggestions = true"
      @blur="hideSuggestions"
      class="search-input"
    />
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
.search-bar-container {
  position: relative;
  width: 300px;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  outline: none;
}

.search-input:focus {
  border-color: #f55702;
  box-shadow: 0 0 5px rgba(245, 87, 2, 0.5);
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
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  color: #666;
}
</style>
