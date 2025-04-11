<template>
  <section id="restaurants-section">
    <h1 class="restaurants-label">Restaurants</h1>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="loading">Loading...</p>

    <div class="inline-container">
      <button v-if="isSmallScreen" class="hamburger-button" @click="toggleFilterSidebar">
        ☰ Filters
      </button>

      <RestaurantFilter
        v-show="!isSmallScreen || isFilterVisible"
        :genres="tempGenres"
        :price="tempPrice"
        :rating="tempRating"
        :sort-by="tempSortBy"
        :sort-order="tempSortOrder"
        @select-restaurant="handleRestaurantSelect"
        @clear-filters="clearAllFilters"
        @apply-filters="applyFilters"
      />

      <RestaurantCardsContainer :restaurants="filteredRestaurants" @visit="openVisitModal" />
    </div>

    <RegisterVisitForm
      v-if="showVisitModal"
      :restaurant="selectedRestaurant"
      :date="visitDate"
      :rating="visitRating"
      :comment="visitComment"
      :success="visitSuccess"
      @submit="submitVisit"
      @close="closeVisitModal"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Cookies from 'js-cookie'
import { fetchRestaurants } from '@/api/restaurants'
import { registerVisit } from '@/api/visit.js'
import { buildQueryParams } from '@/components/home/script/RestaurantTools.js'
import { RestaurantModel } from '@/components/home/script/RestaurantModel.js'

import RestaurantFilter from '@/components/home/Filter.vue'
import RestaurantCardsContainer from '@/components/home/CardsContainer.vue'
import RegisterVisitForm from '@/components/form/VisitModal.vue'

const isSmallScreen = ref(window.innerWidth <= 920)
const isFilterVisible = ref(false)
const loading = ref(true)
const errorMessage = ref('')

const restaurants = ref([])
const selectedGenres = ref('')
const selectedPrice = ref('')
const selectedSortBy = ref('')
const selectedSortOrder = ref('asc')

const tempGenres = ref('')
tempGenres.value = ''
const tempPrice = ref('')
const tempRating = ref('')
const tempSortBy = ref('')
const tempSortOrder = ref('asc')

const selectedRating = ref(null)
const showVisitModal = ref(false)
const selectedRestaurant = ref(null)
const visitDate = ref('')
const visitRating = ref(3)
const visitComment = ref('')
const visitSuccess = ref(false)

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
  } catch (error) {
    console.error('Error submitting visit:', error)
    alert('Failed to register visit.')
  }
}

const handleRestaurantSelect = (restaurant) => {
  restaurants.value = [restaurant]
}

const applyFilters = async () => {
  selectedGenres.value = tempGenres.value
  selectedPrice.value = tempPrice.value
  selectedSortBy.value = tempSortBy.value
  selectedSortOrder.value = tempSortOrder.value
  selectedRating.value = tempRating.value

  const filters = buildQueryParams(selectedGenres.value, selectedPrice.value, 1)

  try {
    loading.value = true
    const [items] = await fetchRestaurants(filters)
    restaurants.value = items.map((r) => new RestaurantModel(r))
  } catch {
    errorMessage.value = 'Failed to load restaurants with filters.'
  } finally {
    loading.value = false
  }
}

const clearAllFilters = () => {
  tempGenres.value = ''
  tempPrice.value = ''
  tempSortBy.value = ''
  tempSortOrder.value = 'asc'
  tempRating.value = ''
  applyFilters()
}

const filteredRestaurants = computed(() => restaurants.value)

const toggleFilterSidebar = () => {
  isFilterVisible.value = !isFilterVisible.value
}

onMounted(async () => {
  try {
    const [items] = await fetchRestaurants([])
    restaurants.value = items.map((r) => new RestaurantModel(r))
  } catch {
    errorMessage.value = 'Failed to load restaurants.'
  } finally {
    loading.value = false
  }
})

window.addEventListener('resize', () => {
  isSmallScreen.value = window.innerWidth <= 920
  if (!isSmallScreen.value) {
    isFilterVisible.value = false
  }
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
  margin-left: 0px;
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
  background-color: #cc5200;
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
