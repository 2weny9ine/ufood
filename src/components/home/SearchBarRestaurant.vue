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
.search-result {
  max-height: 30rem;
  overflow-y: auto;
}

.disabled {
  pointer-events: none;
}

.search-bar-wrapper {
  width: 100%;
  position: relative;
}

.search-form {
  display: flex;
  padding: 1rem;
}
</style>
