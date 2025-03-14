<template>
  <section id="restaurants-section">
    <h1 class="restaurants-label">Restaurants</h1>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="loading">Loading...</p>

    <div class="inline-container">
      <button v-if="isSmallScreen" class="hamburger-button" @click="toggleFilterSidebar">
        ☰ Filters
      </button>
      <section :class="['filter-sidebar', { hidden: isSmallScreen && !isFilterVisible }]">
        <h3>
          Filters <button class="clear-button" @click="clearAllFilters">Clear All</button>
          <i class="icon-settings"></i>
        </h3>

        <div class="filter-section">
          <p class="filter-title">Sort</p>
          <div class="filter-options">
            <label><input type="radio" v-model="tempSortBy" value="name" /> Name</label>
            <label><input type="radio" v-model="tempSortBy" value="price_range" /> Price</label>
            <label><input type="radio" v-model="tempSortBy" value="rating" /> Rating</label>
          </div>
          <div class="filter-options">
            <label
              ><input type="radio" v-model="tempSortOrder" value="asc" checked /> Ascending</label
            >
            <label><input type="radio" v-model="tempSortOrder" value="desc" /> Descending</label>
          </div>
        </div>

        <div class="filter-section">
          <p class="filter-title">Genres</p>
          <div class="filter-options">
            <label
              ><input type="checkbox" v-model="tempGenres" value="végétarien" /> Végétarien</label
            >
            <label><input type="checkbox" v-model="tempGenres" value="café" /> Café</label>
            <label><input type="checkbox" v-model="tempGenres" value="italien" /> Italien</label>
            <label><input type="checkbox" v-model="tempGenres" value="santé" /> Santé</label>
            <label
              ><input type="checkbox" v-model="tempGenres" value="hamburgers" /> Hamburgers</label
            >
            <label><input type="checkbox" v-model="tempGenres" value="desserts" /> Desserts</label>
            <label
              ><input type="checkbox" v-model="tempGenres" value="asiatique" /> Asiatique</label
            >
            <label><input type="checkbox" v-model="tempGenres" value="japonais" /> Japonais</label>
            <label><input type="checkbox" v-model="tempGenres" value="ambiance" /> Ambiance</label>
            <label
              ><input type="checkbox" v-model="tempGenres" value="happy hour" /> Happy Hour</label
            >
            <label><input type="checkbox" v-model="tempGenres" value="pizzeria" /> Pizzeria</label>
            <label
              ><input type="checkbox" v-model="tempGenres" value="cuisine moléculaire" /> Cuisine
              Moléculaire</label
            >
            <label
              ><input type="checkbox" v-model="tempGenres" value="fast-food" /> Fast-Food</label
            >
            <label><input type="checkbox" v-model="tempGenres" value="mexicain" /> Mexicain</label>
            <label
              ><input type="checkbox" v-model="tempGenres" value="fruits de mer" /> Fruits de
              Mer</label
            >
            <label><input type="checkbox" v-model="tempGenres" value="bistro" /> Bistro</label>
            <label><input type="checkbox" v-model="tempGenres" value="libanais" /> Libanais</label>
            <label
              ><input type="checkbox" v-model="tempGenres" value="steakhouse" /> Steakhouse</label
            >
          </div>
        </div>

        <div class="filter-section">
          <p class="filter-title">Price Range</p>
          <div class="filter-options">
            <label><input type="radio" v-model="tempPrice" :value="1" /> $</label>
            <label><input type="radio" v-model="tempPrice" :value="2" /> $$</label>
            <label><input type="radio" v-model="tempPrice" :value="3" /> $$$</label>
            <label><input type="radio" v-model="tempPrice" :value="4" /> $$$$</label>
            <label><input type="radio" v-model="tempPrice" :value="5" /> $$$$$</label>
          </div>
        </div>

        <div class="filter-section">
          <p class="filter-title">Rating</p>
          <div class="filter-options">
            <label><input type="radio" v-model="tempRating" value="1" /> ★</label>
            <label><input type="radio" v-model="tempRating" value="2" /> ★★</label>
            <label><input type="radio" v-model="tempRating" value="3" /> ★★★</label>
            <label><input type="radio" v-model="tempRating" value="4" /> ★★★★</label>
            <label><input type="radio" v-model="tempRating" value="5" /> ★★★★★</label>
          </div>
        </div>

        <button class="apply-filters" @click="applyFilters">Apply</button>
      </section>

      <section class="restaurants">
        <div class="Table">
          <div
            v-for="restaurant in filteredRestaurants"
            :key="restaurant.id"
            class="restaurant-card"
          >
            <div class="banner-container">
              <img
                :src="restaurant.pictures?.[0] || 'default-image.jpg'"
                :alt="restaurant.name"
                class="restaurant-banner"
              />
            </div>
            <div class="inline-container-restaurant">
              <div class="restaurant-info">
                <h3 class="restaurant-name">{{ restaurant.name }}</h3>
                <p class="restaurant-details">
                  {{ '$'.repeat(restaurant.price_range) }} | {{ restaurant.genres?.join(', ') }}
                </p>
              </div>
              <p class="restaurant-rating">
                {{ restaurant.rating.toFixed(1) }}
                <img src="../assets/images/star.png" class="star-icon" />
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getRestaurants } from '@/api/restaurants.js'

const isSmallScreen = ref(window.innerWidth <= 920)
const isFilterVisible = ref(false)
const loading = ref(true)
const errorMessage = ref('')

const restaurants = ref([])
const selectedGenres = ref([])
const selectedPrice = ref(null)
const selectedRating = ref(null)

const tempGenres = ref([])
const tempPrice = ref(null)
const tempRating = ref(null)

const tempSortBy = ref('')
const tempSortOrder = ref('asc')
const selectedSortBy = ref('')
const selectedSortOrder = ref('asc')

onMounted(async () => {
  try {
    const response = await getRestaurants({ limit: 20, page: 1 })
    restaurants.value = response.items || []
  } catch (error) {
    console.error('Error fetching restaurants:', error)
    errorMessage.value = 'Failed to load restaurants.'
  } finally {
    loading.value = false
  }
})

const applyFilters = () => {
  selectedGenres.value = [...tempGenres.value]
  selectedPrice.value = tempPrice.value ? Number(tempPrice.value) : null
  selectedRating.value = tempRating.value ? parseFloat(tempRating.value) : null
  selectedSortBy.value = tempSortBy.value
  selectedSortOrder.value = tempSortOrder.value
}

const filteredRestaurants = computed(() => {
  return restaurants.value
    .filter((restaurant) => {
      const matchesGenre =
        selectedGenres.value.length === 0 ||
        selectedGenres.value.some((genre) =>
          restaurant.genres?.map((g) => g.toLowerCase()).includes(genre.toLowerCase()),
        )

      const matchesPrice =
        selectedPrice.value === null || restaurant.price_range === selectedPrice.value

      const matchesRating =
        selectedRating.value === null ||
        (Math.floor(restaurant.rating) >= selectedRating.value &&
          Math.floor(restaurant.rating) < selectedRating.value + 1)

      return matchesGenre && matchesPrice && matchesRating
    })
    .sort((a, b) => {
      if (!selectedSortBy.value) return 0

      let valueA = a[selectedSortBy.value]
      let valueB = b[selectedSortBy.value]

      if (selectedSortBy.value === 'name') {
        valueA = valueA.toLowerCase()
        valueB = valueB.toLowerCase()
      }

      return selectedSortOrder.value === 'asc'
        ? valueA < valueB
          ? -1
          : 1
        : valueA > valueB
          ? -1
          : 1
    })
})

const toggleFilterSidebar = () => {
  isFilterVisible.value = !isFilterVisible.value
}

window.addEventListener('resize', () => {
  isSmallScreen.value = window.innerWidth <= 920
  if (!isSmallScreen.value) {
    isFilterVisible.value = false
  }
})
</script>

<style scoped>
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

.filter-sidebar.hidden {
  display: none;
}

@media (max-width: 920px) {
  .hamburger-button {
    display: block;
  }

  .filter-sidebar {
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    z-index: 10;
    background: white;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
}
.clear-button {
  background: none;
  border: none;
  color: #f55702;
  font-size: 0.8em;
  cursor: pointer;
  margin-left: 10px;
}

.clear-button:hover {
  text-decoration: underline;
}

.restaurants-label {
  margin-top: 30px;
  text-align: left;
  margin-left: 310px;
  font-family: Arial, Helvetica, sans-serif;
}

.restaurants {
  gap: 180px;
  width: 50%;
  justify-content: center;
}

.Table {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

#restaurants-section {
  padding-top: 80px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  overflow-x: hidden;
}

.restaurant-card {
  position: relative;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  width: 400px;
  height: fit-content;
  overflow: hidden;
}
.restaurant-banner {
  position: relative;
  width: 100%;
  height: 150px;
  filter: brightness(0.8);
  z-index: 0;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  max-width: 100%;
}

.inline-container {
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  width: 100%;
}

.inline-container-restaurant {
  align-items: center;
  justify-content: space-between;
  display: flex;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
}
.restaurant-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.restaurant-details {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: #555;
  margin-top: 2px;
  text-align: left;
}
.restaurant-name {
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
}

.restaurant-rating {
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  text-align: right;
  min-width: 50px;
}

.banner-container {
  position: relative;
  height: 150px;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
}

.banner-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.banner-overlay img {
  width: 150px;
  height: auto;
}

h3 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #0b0b0b;
  text-align: left;
}

.details {
  margin-right: 20px;
  color: #ff6600;
  text-decoration: none;
  font-weight: bold;
  text-align: right;
  font-family: Arial, Helvetica, sans-serif;
}

.nav-links a {
  color: white;
  margin: 0 15px;
  text-decoration: none;
}

.filter-sidebar {
  padding: 5px 20px;
  margin-right: 50px;
  height: fit-content;
  width: 250px;
  max-width: 500px;
  position: sticky;
  background: rgba(232, 232, 232, 0.33);
  border-radius: 10px;
  font-family: Arial, Helvetica, sans-serif;
}

.filter-sidebar h3 {
  display: flex;
  align-items: center;
  font-size: 18px;
}

.filter-sidebar label {
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  cursor: pointer;
}

.filter-options label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.line {
  opacity: 0.3;
}

.star-icon {
  height: 15px;
}

.apply-filters {
  margin-left: 25%;
  margin-top: 10px;
  padding: 10px;
  width: 50%;
  background: #ff6600;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  font-family: Arial, Helvetica, sans-serif;
}

.apply-filters:hover {
  background: #cc5200;
}

.filter-title {
  font-weight: bold;
}

@media (max-width: 920px) {
  .filter-sidebar {
    position: relative;
    width: 100%;
    z-index: 10;
    background: white;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
  }

  .hamburger-button {
    display: block;
    margin-bottom: 10px;
  }
}
@media (max-width: 1600px) and (min-width: 1200px) {
  .Table {
    grid-template-columns: repeat(2, 1fr);
  }
  .filter-sidebar {
    width: 220px;
    margin-right: 30px;
  }
  .restaurants {
    width: 50%;
  }
  .restaurant-card {
    width: 400px;
  }
}

@media (max-width: 1199px) and (min-width: 768px) {
  .Table {
    grid-template-columns: repeat(2, 1fr);
  }
  .filter-sidebar {
    width: 200px;
    margin-right: 20px;
  }
  .restaurants {
    width: 70%;
  }
}

@media (max-width: 1100px) and (min-width: 920px) {
  .Table {
    grid-template-columns: 1fr;
  }
  .filter-sidebar {
    width: 180px;
  }
  .restaurants {
    width: 100%;
  }
  .restaurant-card {
    width: 700px;
  }
}

@media (max-width: 919px) {
  .inline-container {
    flex-direction: column;
  }

  .filter-sidebar {
    width: 300px;
    margin-bottom: 20px;
    position: relative;
  }

  .restaurants {
    width: 100%;
  }

  .Table {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .restaurant-card {
    width: 100%;
    max-width: 100%;
  }

  .apply-filters {
    width: 100%;
    margin-left: 0;
  }

  .restaurants-label {
    margin-left: 0;
    text-align: center;
  }
}
</style>
