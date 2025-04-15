<template>
  <div v-if="loading" class="loading">Loading...</div>
  <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>

  <div v-else class="restaurant-info">
    <RestaurantInfos
      :name="restaurant?.name"
      :genres="restaurant?.genres"
      :address="restaurant?.address"
      :tel="restaurant?.tel"
      :rating="restaurant?.rating"
      :price-range="restaurant?.price_range"
      :pictures="restaurant?.pictures"
      @visit="openVisitModal(restaurant)"
      @favorite="openFavoriteModal(restaurant)"
    />
    <RegisterVisitForm
      v-if="showVisitModal"
      :restaurant="selectedRestaurant"
      :date="visitDate"
      :rating="visitRating"
      :comment="visitComment"
      :success="visitSuccess"
      @update:date="visitDate = $event"
      @update:rating="visitRating = $event"
      @update:comment="visitComment = $event"
      @submit="submitVisit"
      @close="closeVisitModal"
    />
    <div v-if="showFavoriteModal" class="modal-overlay">
      <div class="favorite-modal">
        <h2>Add to Favorites</h2>
        <p>
          <strong>{{ selectedRestaurant?.name }}</strong>
        </p>
        <div class="favorite-infos">
          <label for="favorite-list">Select a Favorite List:</label>
          <select id="favorite-list" v-model="selectedListId">
            <option value="" disabled>Select a list</option>
            <option v-for="list in favoriteLists" :key="list.id" :value="list.id">
              {{ list.name }}
            </option>
          </select>
        </div>
        <p v-if="favoriteSuccess" class="success-message">Added to favorites successfully!</p>
        <div class="modal-buttons">
          <button class="submit-favorite" @click="submitFavorite" :disabled="!selectedListId">
            Add
          </button>
          <button class="close-modal" @click="closeFavoriteModal">Cancel</button>
        </div>
      </div>
    </div>
    <Map
      :restaurant-location="restaurant?.location"
      :address="restaurant?.address"
      :user-location="userLocation"
      :show-directions-panel="showDirectionsPanel"
    />
    <Images :pictures="restaurant?.pictures" />
    <Opening :opening-hours="restaurant?.opening_hours" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Cookies from 'js-cookie'
import RestaurantInfos from '@/components/restaurant/RestaurantInfos.vue'
import RegisterVisitForm from '@/components/form/VisitModal.vue'
import Map from '@/components/restaurant/Map.vue'
import Images from '@/components/restaurant/Images.vue'
import Opening from '@/components/restaurant/Opening.vue'
import { getCurrentPositionWithRetry } from '@/components/restaurant/script/geolocation.js'
import { fetchRestaurantDetails } from '@/api/restaurants.js'
import { fetchUserLists } from '@/api/users.js'
import { registerVisit } from '@/api/visit.js'
import { addRestaurantToList } from '@/api/favoritesList.js'

const route = useRoute()
const restaurant = ref(null)
const loading = ref(true)
const errorMessage = ref('')
const userLocation = ref(null)
const showDirectionsPanel = ref(false)

const showVisitModal = ref(false)
const selectedRestaurant = ref(null)
const visitDate = ref('')
const visitRating = ref(3)
const visitComment = ref('')
const visitSuccess = ref(false)

const showFavoriteModal = ref(false)
const selectedListId = ref('')
const favoriteLists = ref([])
const favoriteSuccess = ref(false)

const USER_ID = Cookies.get('userId')
const restaurantId = route.params.id

onMounted(async () => {
  if (!restaurantId) {
    errorMessage.value = 'Invalid restaurant ID.'
    loading.value = false
    return
  }

  try {
    userLocation.value = await getCurrentPositionWithRetry()
    const data = await fetchRestaurantDetails(restaurantId)
    if (data?.location?.coordinates?.length === 2) {
      data.location = [data.location.coordinates[0], data.location.coordinates[1]]
    }

    restaurant.value = data
  } catch (e) {
    errorMessage.value = 'Failed to load restaurant or location data.'
    console.error(e)
  } finally {
    loading.value = false
  }
})

function openVisitModal(r) {
  selectedRestaurant.value = r
  visitDate.value = ''
  visitRating.value = 3
  visitComment.value = ''
  showVisitModal.value = true
}

function closeVisitModal() {
  showVisitModal.value = false
}

async function submitVisit() {
  if (!visitDate.value) {
    alert('Please select a date!')
    return
  }

  const payload = {
    restaurant_id: selectedRestaurant.value.id,
    date: new Date(visitDate.value).toISOString(),
    rating: visitRating.value,
    comment: visitComment.value,
  }

  try {
    await registerVisit(USER_ID, payload)
    visitSuccess.value = true
    setTimeout(() => {
      visitSuccess.value = false
      closeVisitModal()
    }, 1500)
  } catch (error) {
    console.error('Failed to submit visit:', error)
    alert('Could not register visit.')
  }
}

async function openFavoriteModal(r) {
  selectedRestaurant.value = r
  selectedListId.value = ''
  favoriteSuccess.value = false
  showFavoriteModal.value = true

  try {
    const [lists] = await fetchUserLists(USER_ID)
    favoriteLists.value = lists
  } catch (error) {
    console.error('Error loading favorites:', error)
  }
}

function closeFavoriteModal() {
  showFavoriteModal.value = false
}

async function submitFavorite() {
  if (!selectedListId.value) {
    alert('Please select a favorite list!')
    return
  }

  try {
    await addRestaurantToList(selectedListId.value, selectedRestaurant.value.id)
    favoriteSuccess.value = true
    setTimeout(() => {
      favoriteSuccess.value = false
      closeFavoriteModal()
    }, 1500)
  } catch (error) {
    console.error('Failed to add restaurant to list:', error)
    alert('Could not add to favorites.')
  }
}
</script>

<style scoped>
.restaurant-info {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 100%;
}

.loading,
.error {
  font-size: 1.2rem;
  color: #444;
  margin: 20px;
  text-align: center;
}

.modal-overlay {
  font-family: Arial, Helvetica, sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.favorite-modal {
  background: white;
  padding: 20px;
  width: 350px;
  border-radius: 8px;
  text-align: center;
}

.favorite-infos {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.favorite-infos label {
  font-weight: bold;
  margin-bottom: 5px;
}

.favorite-infos select {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.modal-buttons {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}

.submit-favorite {
  background-color: #cc5200;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.submit-favorite:hover {
  background-color: #e1650d;
}

.close-modal {
  background-color: #9c9c9c;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.close-modal:hover {
  background-color: #383737;
}

.success-message {
  color: green;
  margin-top: 10px;
  font-size: 14px;
}
</style>
