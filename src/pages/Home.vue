<template>
  <section id="restaurants-section">
    <h1 class="restaurants-label">Restaurants</h1>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="loading">Loading...</p>

    <div class="view-toggle">
      <button @click="viewMode = 'list'" :class="{ active: viewMode === 'list' }">Liste</button>
      <button @click="viewMode = 'map'" :class="{ active: viewMode === 'map' }">Carte</button>
    </div>

    <div class="inline-container">
      <button v-if="isSmallScreen" class="hamburger-button" @click="toggleFilterSidebar">
        ☰ Filters
      </button>

      <RestaurantFilter
        v-show="!isSmallScreen || isFilterVisible"
        v-model:genres="filters.genres"
        v-model:price="filters.price"
        v-model:rating="filters.rating"
        v-model:sortBy="filters.sortBy"
        v-model:sortOrder="filters.sortOrder"
        :genres-list="availableGenres"
        @select-restaurant="handleRestaurantSelect"
        @clear-filters="clearFilters"
      />

      <template v-if="viewMode === 'list'">
        <RestaurantCardsContainer :restaurants="filteredRestaurants" @visit="openVisitModal" />
      </template>

      <template v-else>
        <MapRestaurantView
          :restaurants="filteredRestaurants"
          :user-location="userLocation"
          @visit="openVisitModal"
        />
      </template>
    </div>

    <VisitModal
      v-if="showVisitModal"
      :restaurant="selectedRestaurant"
      v-model:date="visitDate"
      v-model:rating="visitRating"
      v-model:comment="visitComment"
      :success="visitSuccess"
      @submit="submitVisit"
      @close="closeVisitModal"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import Cookies from 'js-cookie'

import { fetchRestaurants } from '@/api/restaurants'
import { registerVisit } from '@/api/visit.js'
import { buildQueryParams } from '@/components/home/script/RestaurantTools.js'
import { RestaurantModel } from '@/components/home/script/RestaurantModel.js'
import { getCurrentPositionWithRetry } from '@/components/restaurant/script/geolocation.js'

import RestaurantFilter from '@/components/home/Filter.vue'
import RestaurantCardsContainer from '@/components/home/CardsContainer.vue'
import VisitModal from '@/components/form/VisitModal.vue'
import MapRestaurantView from '@/components/home/MapRestaurantView.vue'

const isSmallScreen = ref(window.innerWidth <= 920)
const isFilterVisible = ref(false)
const loading = ref(true)
const errorMessage = ref('')

const allRestaurants = ref([])
const restaurants = ref([])
const availableGenres = ref([])
const filters = ref({
  genres: [],
  rating: '',
  sortBy: '',
  sortOrder: 'asc',
  price: '',
})

const currentPage = ref(1)
const limitPerPage = ref(80)
const isLoadingMore = ref(false)
const totalRestaurants = ref(0)

const showVisitModal = ref(false)
const selectedRestaurant = ref(null)
const visitDate = ref('')
const visitRating = ref(3)
const visitComment = ref('')
const visitSuccess = ref(false)

const viewMode = ref<'list' | 'map'>('list')
const userLocation = ref([])

const USER_ID = Cookies.get('userId')

const openVisitModal = (restaurant) => {
  selectedRestaurant.value = restaurant
  visitDate.value = ''
  visitRating.value = 3
  visitComment.value = ''
  showVisitModal.value = true
}

const closeVisitModal = () => {
  showVisitModal.value = false
}

const submitVisit = async () => {
  if (!visitDate.value) {
    alert('Please select a date!')
    return
  }

  const visitData = {
    restaurant_id: selectedRestaurant.value.id,
    comment: visitComment.value,
    rating: visitRating.value,
    date: new Date(visitDate.value).toISOString(),
  }

  try {
    await registerVisit(USER_ID, visitData)
    visitSuccess.value = true
    setTimeout(() => {
      visitSuccess.value = false
      closeVisitModal()
    }, 1500)
  } catch {
    alert('Failed to register visit.')
  }
}

const handleRestaurantSelect = (restaurant) => {
  restaurants.value = [restaurant]
}

const loadRestaurants = async (reset = false) => {
  if (isLoadingMore.value) return

  if (reset) {
    currentPage.value = 1
    restaurants.value = []
  }

  isLoadingMore.value = true
  loading.value = true

  const queryFilters = buildQueryParams(
    filters.value.genres.length ? filters.value.genres : '',
    filters.value.price,
    currentPage.value,
    limitPerPage.value,
  )

  try {
    const [items, total] = await fetchRestaurants(queryFilters)
    const newRestaurants = items.map((r) => new RestaurantModel(r))
    totalRestaurants.value = total

    if (reset) {
      restaurants.value = newRestaurants
      allRestaurants.value = [...restaurants.value]

      const genresSet = new Set()
      newRestaurants.forEach((restaurant) => {
        restaurant.genres?.forEach((genre) => {
          if (genre && typeof genre === 'string') {
            genresSet.add(genre.toLowerCase())
          }
        })
      })
      availableGenres.value = Array.from(genresSet).sort()
    } else {
      restaurants.value = [...restaurants.value, ...newRestaurants]
    }

    currentPage.value += 1
  } catch {
    errorMessage.value = 'Failed to load restaurants.'
  } finally {
    loading.value = false
    isLoadingMore.value = false
  }
}

const clearFilters = () => {
  filters.value = {
    genres: [],
    rating: '',
    sortBy: '',
    sortOrder: 'asc',
    price: '',
  }
  loadRestaurants(true)
}

const filteredRestaurants = computed(() => {
  let filtered = [...restaurants.value]

  if (filters.value.genres.length) {
    filtered = filtered.filter((restaurant) =>
      filters.value.genres.some((genre) =>
        restaurant.genres?.map((g) => g.toLowerCase()).includes(genre.toLowerCase()),
      ),
    )
  }

  if (filters.value.rating !== '' && filters.value.rating !== null) {
    const rating = Number(filters.value.rating)
    filtered = filtered.filter((restaurant) => Math.floor(restaurant.rating) === rating)
  }

  if (filters.value.price !== '' && filters.value.price !== null) {
    const price = Number(filters.value.price)
    filtered = filtered.filter((restaurant) => restaurant.price_range === price)
  }

  if (filters.value.sortBy) {
    filtered.sort((a, b) => {
      let valueA = a[filters.value.sortBy]
      let valueB = b[filters.value.sortBy]

      if (filters.value.sortBy === 'name') {
        valueA = valueA.toLowerCase()
        valueB = valueB.toLowerCase()
      }

      return filters.value.sortOrder === 'asc'
        ? valueA < valueB
          ? -1
          : 1
        : valueA > valueB
          ? -1
          : 1
    })
  }

  return filtered
})

const toggleFilterSidebar = () => {
  isFilterVisible.value = !isFilterVisible.value
}

const handleScroll = () => {
  const scrollOffset = window.pageYOffset || document.documentElement.scrollTop
  const totalHeight = document.documentElement.scrollHeight
  const windowHeight = window.innerHeight || document.documentElement.clientHeight

  const bottomOfWindow = totalHeight - (scrollOffset + windowHeight) < 100

  if (bottomOfWindow && restaurants.value.length < totalRestaurants.value) {
    loadRestaurants()
  }
}

onMounted(async () => {
  userLocation.value = await getCurrentPositionWithRetry()
  await loadRestaurants(true)
  window.addEventListener('scroll', handleScroll)
})

window.addEventListener('resize', () => {
  isSmallScreen.value = window.innerWidth <= 920
  if (!isSmallScreen.value) {
    isFilterVisible.value = false
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', () => {})
})
</script>

<style scoped>
#restaurants-section {
  padding-top: 80px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  overflow-x: hidden;
}

.restaurants-label {
  margin-top: 30px;
  text-align: left;
  margin-left: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.inline-container {
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
  width: 100%;
}

.hamburger-button {
  display: none;
  background-color: #ff6600;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 20px;
}

.hamburger-button:hover {
  background-color: #ff6600;
}

.view-toggle {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.view-toggle button {
  background-color: #eee;
  border: 1px solid #ccc;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
}

.view-toggle button.active {
  background-color: #ff6600;
  color: white;
}

@media (max-width: 920px) {
  .inline-container {
    flex-direction: column;
  }

  .hamburger-button {
    display: block;
    margin-bottom: 10px;
  }
}
</style>
