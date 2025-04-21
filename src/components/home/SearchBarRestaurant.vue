<template>
  <div class="search-wrapper" @click="clearIfClickedOutside">
    <div class="search-bar-wrapper">
      <form class="search-form">
        <input
          ref="inputRef"
          v-model="query"
          class="form-control"
          type="search"
          placeholder="Search Restaurants..."
        />
      </form>
      <ul
        v-if="restaurants.length > 0"
        class="search-result dropdown-menu position-absolute"
        :style="{
          width: $refs.inputRef.offsetWidth + 'px',
          left: $refs.inputRef.offsetLeft + 'px',
          top: $refs.inputRef.offsetHeight + 'px',
        }"
        @click="preventBlur"
      >
        <li
          v-for="r in restaurants"
          :key="r.id"
          class="list-group-item d-flex justify-content-between"
          @click="delayedClearSearch"
        >
          <router-link
            :to="{ name: 'Restaurant', params: { id: r.id } }"
            class="text-decoration-none text-dark"
            style="flex: 1"
          >
            {{ r.name }}
          </router-link>

          <slot name="actions" :restaurant="r" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { fetchRestaurants } from '@/api/restaurants'
import { restaurantParams } from '@/api/api.config'

const query = ref('')
const restaurants = ref([])
const inputRef = ref(null)

const searchRestaurants = async () => {
  try {
    const filters = [
      [restaurantParams.Q, query.value],
      [restaurantParams.LIMIT, 12],
    ]
    const [results] = await fetchRestaurants(filters)
    restaurants.value = results
  } catch (error) {
    console.error('Error fetching search results:', error)
    restaurants.value = []
  }
}

const clearSearch = () => {
  query.value = ''
  restaurants.value = []
}

const delayedClearSearch = () => {
  setTimeout(clearSearch, 100)
}

const clearIfClickedOutside = (e) => {
  if (!inputRef.value.contains(e.target)) {
    clearSearch()
  }
}

const preventBlur = (e) => {
  e.stopPropagation()
}

watch(query, (newVal) => {
  if (newVal && newVal.trim() !== '') {
    searchRestaurants()
  } else {
    restaurants.value = []
  }
})
</script>

<style scoped>
.search-wrapper {
  position: relative;
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
}

.search-bar-wrapper {
  width: 100%;
  position: relative;
}

.search-form {
  display: flex;
  padding: 5px 10px;
  border-radius: 15px;
  background-color: #ffffff;
  border: 1px solid #ccc;
}

.form-control {
  border: none;
  padding: 6px 8px;
  font-size: 15px;
  flex-grow: 1;
  font-family: Arial, Helvetica, sans-serif;
  outline: none;
  min-width: 100px;
  background-color: transparent;
}

.search-result {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  z-index: 10;
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  border-radius: 15px;
  padding: 0;
  list-style: none;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  border: 1px solid #f55702;
}

.search-result li {
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s ease;
}

.search-result li:hover {
  background-color: #eee;
}

.text-dark {
  color: #f55702 !important;
  font-weight: bold;
  text-decoration: none;
}
</style>
