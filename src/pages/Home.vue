<template>
  <section id="main">
    <div class="Main">
      <img src="../assets/images/background%20pic.png" alt="Background Image" class="image" />
      <div class="overlay">
        <div class="logo">
          <img src="../assets/images/Logo.png" alt="logo" />
        </div>
        <h1>Discover Flavor, Share the Love!</h1>
        <h2>Find & Share Your Favorite Restaurants!</h2>
        <div class="Buttons">
          <a href="#restaurants-section" class="Explore">Explore</a>
          <button class="Start">Get Started →</button>
        </div>
      </div>
    </div>
  </section>
  <section id="restaurants-section">
    <h1 class="restaurants-label">Restaurants</h1>

    <div class="inline-container">
      <section class="filter-sidebar">
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
              <a href="#" class="details" @click.prevent="updateVisit(restaurant.name)"
                >Details →</a
              >
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
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

.Main {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  filter: brightness(90%);
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  padding: 20px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.logo img {
  width: 200px;
  height: auto;
}

.overlay h1 {
  font-size: 3em;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 0px;
}

.overlay h2 {
  font-size: 1.5em;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 40px;
}

.Buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.Explore,
.Start {
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
  font-size: 1.3em;
  font-weight: bold;
  cursor: pointer;
}

.Explore {
  font-family: Arial, Helvetica, sans-serif;
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
  font-size: 1.3em;
  font-weight: bold;
  cursor: pointer;
  color: #f55702;
  text-decoration: none;
  background-color: white;
  display: inline-block;
}

.Start {
  font-family: Arial, Helvetica, sans-serif;
  color: #ffffff;
  background-color: #f55702;
}

.Explore:hover,
.Start:hover {
  opacity: 0.8;
}

.restaurants-label {
  margin-top: 30px;
  text-align: center;
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

.restaurant-card {
  position: relative;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  width: 400px;
  height: fit-content;
  max-width: 400px;
  max-height: 300px;
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

.inline-container,
.inline-container-restaurant {
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  width: 100%;
}
.inline-container-restaurant {
  align-items: center;
  justify-content: space-between;
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
  margin-right: 20px;
  height: fit-content;
  width: 200px;
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
</style>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import restaurantsData from '@/assets/restaurants.json'

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
/*
const updateVisit = (restaurantName: string) => {
  let visits = JSON.parse(localStorage.getItem('recentVisits') || '[]')

  const existingVisit = visits.find((visit: any) => visit.restaurantName === restaurantName)

  if (existingVisit) {
    existingVisit.visitCount++
  } else {
    visits.push({ restaurantName, visitCount: 1 })
  }

  localStorage.setItem('recentVisits', JSON.stringify(visits))
}*/
</script>
