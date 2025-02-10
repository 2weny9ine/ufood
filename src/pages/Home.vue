<template>
  <section id="restaurants-section">
    <h1 class="restaurants-label">Restaurants</h1>

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
            <label><input type="radio" v-model="tempSortBy" value="price" /> Price</label>
            <label><input type="radio" v-model="tempSortBy" value="rating" /> Rating</label>
            <hr class="line" />
          </div>
          <div class="filter-options">
            <label
              ><input type="radio" v-model="tempSortOrder" value="asc" checked /> Ascending</label
            >
            <label><input type="radio" v-model="tempSortOrder" value="desc" /> Descending</label>
          </div>
        </div>
        <div class="filter-section">
          <p class="filter-title">
            Genres <button class="clear-button" @click="clearGenres">Clear</button>
          </p>
          <div class="filter-section">
            <div class="filter-options">
              <label><input type="checkbox" v-model="tempGenres" value="halal" /> Halal</label>
              <label><input type="checkbox" v-model="tempGenres" value="pizza" /> Pizza</label>
              <label><input type="checkbox" v-model="tempGenres" value="burger" /> Burger</label>
              <label><input type="checkbox" v-model="tempGenres" value="dessert" /> Dessert</label>
              <label
                ><input type="checkbox" v-model="tempGenres" value="fast food" /> Fast food</label
              >
              <label><input type="checkbox" v-model="tempGenres" value="sushi" /> Sushi</label>
            </div>
          </div>
          <div class="filter-section">
            <p class="filter-title">
              Price <button class="clear-button" @click="clearPrice">Clear</button>
            </p>
            <div class="filter-options">
              <label><input type="radio" v-model="tempPrice" value="$" checked /> $</label>
              <label><input type="radio" v-model="tempPrice" value="$$" /> $$</label>
              <label><input type="radio" v-model="tempPrice" value="$$$" /> $$$</label>
            </div>
          </div>
        </div>
        <div class="filter-section">
          <p class="filter-title">
            Rating <button class="clear-button" @click="clearRating">Clear</button>
          </p>
          <div class="filter-options">
            <label
              ><input type="radio" v-model="tempRating" value="1" />
              <img src="../assets/images/star.png" alt="1 Star" class="star-icon"
            /></label>
            <label
              ><input type="radio" v-model="tempRating" value="2" />
              <img src="../assets/images/star.png" alt="2 Stars" class="star-icon" />
              <img src="../assets/images/star.png" alt="2 Stars" class="star-icon"
            /></label>
            <label
              ><input type="radio" v-model="tempRating" value="3" />
              <img src="../assets/images/star.png" alt="3 Stars" class="star-icon" />
              <img src="../assets/images/star.png" alt="3 Stars" class="star-icon" />
              <img src="../assets/images/star.png" alt="3 Stars" class="star-icon"
            /></label>
            <label
              ><input type="radio" v-model="tempRating" value="4" />
              <img src="../assets/images/star.png" alt="4 Stars" class="star-icon" />
              <img src="../assets/images/star.png" alt="4 Stars" class="star-icon" />
              <img src="../assets/images/star.png" alt="4 Stars" class="star-icon" />
              <img src="../assets/images/star.png" alt="4 Stars" class="star-icon"
            /></label>
            <label
              ><input type="radio" v-model="tempRating" value="5" />
              <img src="../assets/images/star.png" alt="5 Stars" class="star-icon" />
              <img src="../assets/images/star.png" alt="5 Stars" class="star-icon" />
              <img src="../assets/images/star.png" alt="5 Stars" class="star-icon" />
              <img src="../assets/images/star.png" alt="5 Stars" class="star-icon" />
              <img src="../assets/images/star.png" alt="5 Stars" class="star-icon"
            /></label>
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
              <img :src="restaurant.images[0]" :alt="restaurant.name" class="restaurant-banner" />
              <div class="banner-overlay">
                <img :src="restaurant.images[1]" />
              </div>
            </div>
            <div class="inline-container-restaurant">
              <h3>{{ restaurant.name }}</h3>
              <a
                :href="`restaurant?id=${restaurant.id}`"
                class="details"
                @click.stop="updateVisit(restaurant.name)"
                target="_self"
              >
                Details →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import restaurantsData from '@/assets/restaurants.json'

const isSmallScreen = ref(window.innerWidth <= 920)
const isFilterVisible = ref(false)

const toggleFilterSidebar = () => {
  isFilterVisible.value = !isFilterVisible.value
}

window.addEventListener('resize', () => {
  isSmallScreen.value = window.innerWidth <= 920
  if (!isSmallScreen.value) {
    isFilterVisible.value = false
  }
})

const restaurants = ref([])
const selectedGenres = ref([])
const selectedPrice = ref('')
const selectedRating = ref(null)

const tempGenres = ref([])
const tempPrice = ref('')
const tempRating = ref(null)

const tempSortBy = ref('')
const tempSortOrder = ref('asc')
const selectedSortBy = ref('')
const selectedSortOrder = ref('asc')

onMounted(() => {
  restaurants.value = restaurantsData.map((restaurant) => ({
    ...restaurant,
    images: restaurant.images?.map((image) => new URL(image, import.meta.url).href) || [],
  }))
})

const applyFilters = () => {
  selectedGenres.value = [...tempGenres.value]
  selectedPrice.value = tempPrice.value
  selectedRating.value = tempRating.value
  selectedSortBy.value = tempSortBy.value
  selectedSortOrder.value = tempSortOrder.value
}

const filteredRestaurants = computed(() => {
  let result = restaurants.value.filter((restaurant) => {
    const matchesGenre =
      selectedGenres.value.length === 0 ||
      selectedGenres.value.every((genre) =>
        restaurant.genres.map((g) => g.toLowerCase()).includes(genre.toLowerCase()),
      )

    const matchesPrice =
      !selectedPrice.value || restaurant.priceRange.trim() === selectedPrice.value.trim()
    const matchesRating =
      !selectedRating.value || Math.floor(restaurant.rating) === parseInt(selectedRating.value)

    return matchesGenre && matchesPrice && matchesRating
  })

  if (selectedSortBy.value) {
    result = result.sort((a, b) => {
      let valueA = a[selectedSortBy.value]
      let valueB = b[selectedSortBy.value]

      if (selectedSortBy.value === 'name') {
        valueA = valueA.toLowerCase()
        valueB = valueB.toLowerCase()
      }

      if (valueA < valueB) return selectedSortOrder.value === 'asc' ? -1 : 1
      if (valueA > valueB) return selectedSortOrder.value === 'asc' ? 1 : -1
      return 0
    })
  }

  return result
})

const clearGenres = () => {
  tempGenres.value = []
}

const clearPrice = () => {
  tempPrice.value = ''
}

const clearRating = () => {
  tempRating.value = null
}

const clearAllFilters = () => {
  clearGenres()
  clearPrice()
  clearRating()
}

const updateVisit = (restaurantName) => {
  const visits = JSON.parse(localStorage.getItem('recentVisits') || '[]')

  visits.push({
    name: restaurantName,
    timestamp: new Date().toISOString(),
  })

  localStorage.setItem('recentVisits', JSON.stringify(visits))
}
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
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  width: 100%;
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
