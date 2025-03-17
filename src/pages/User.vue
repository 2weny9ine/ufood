<template>
  <div class="User">
    <section class="main">
      <div class="Home">
        <div class="wrapper">
          <img src="../assets/images/background%20pic.png" alt="Background Image" class="image" />
          <div class="info">
            <div class="info-item">
              <div class="info-item-part1">
                <div class="info-item-part1-2">
                  <div class="info-item-part1-2-3">
                    <p>{{ user.firstName }} {{ user.lastName }}</p>
                    <span class="rating">
                      <span v-for="star in user.rating" :key="star">⭐</span>
                    </span>
                  </div>
                </div>
                <button class="Follow">Follow</button>
              </div>
            </div>
            <div class="profile-picture">
              <h2>{{ getInitials() }}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="Table">
      <div class="Table-Visit">
        <h3>Recently Visited</h3>
        <div class="Table-content">
          <div v-if="recentVisits.length > 0">
            <ul class="restaurant-list">
              <li
                v-for="visit in recentVisits"
                :key="visit.date + visit.name"
                class="restaurant-card"
              >
                <div class="restaurant-info">
                  <p>
                    <span class="restaurant-name">{{ visit.name }}</span>
                  </p>
                  <p>
                    <span class="visit-rating">Rating: {{ visit.rating }} ★</span>
                  </p>
                  <p>
                    <span class="visit-comment">{{ visit.comment || 'No comment' }}</span>
                  </p>
                  <p>
                    <span class="visit-date"
                      >Date: {{ new Date(visit.date).toLocaleDateString() }}</span
                    >
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div v-else class="no-visits">
            <p1>You haven't visited any restaurants yet!</p1>
          </div>
        </div>
      </div>
    </section>

    <section class="Table">
      <div class="Table-Favorites">
        <h3>Favorite Lists</h3>
        <button class="create-list-button" @click="openCreateListModal">Create New List</button>
        <div class="Table-content">
          <div v-if="favoriteLists.length > 0">
            <ul class="favorite-list">
              <li v-for="list in favoriteLists" :key="list.id" class="favorite-card">
                <div class="favorite-info">
                  <input
                    v-model="list.name"
                    @blur="updateListName(list)"
                    class="list-name-input"
                    :disabled="editingListId !== list.id"
                  />
                  <div class="favorite-actions">
                    <button @click="toggleEditList(list.id)">Edit Name</button>
                    <button @click="openAddRestaurantModal(list.id)">Add Restaurant</button>
                    <button @click="deleteList(list.id)">Delete</button>
                  </div>
                </div>
                <ul class="restaurant-list">
                  <li
                    v-for="restaurant in list.restaurants"
                    :key="restaurant.id"
                    class="restaurant-card"
                  >
                    <div class="restaurant-info">
                      <p>
                        <span class="restaurant-name">{{ restaurant.name }}</span>
                        <button
                          class="remove-button"
                          @click="removeRestaurant(list.id, restaurant.id)"
                        >
                          Remove
                        </button>
                      </p>
                      <p>
                        {{ '$'.repeat(restaurant.price_range) }} |
                        {{ restaurant.genres?.join(', ') }}
                      </p>
                      <p>Rating: {{ restaurant.rating.toFixed(1) }} ★</p>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div v-else class="no-favorites">
            <p1>You haven't created any favorite lists yet!</p1>
          </div>
        </div>
      </div>

      <div v-if="showCreateListModal" class="modal-overlay">
        <div class="favorite-modal">
          <h2>Create New Favorite List</h2>
          <div class="favorite-infos">
            <label for="new-list-name">List Name:</label>
            <input id="new-list-name" v-model="newListName" placeholder="Enter list name" />
          </div>
          <p v-if="createListSuccess" class="success-message">List created successfully!</p>
          <div class="modal-buttons">
            <button class="submit-favorite" @click="createList" :disabled="!newListName">
              Create
            </button>
            <button class="close-modal" @click="closeCreateListModal">Cancel</button>
          </div>
        </div>
      </div>

      <div v-if="showAddRestaurantModal" class="modal-overlay">
        <div class="favorite-modal">
          <h2>Add Restaurant to List</h2>
          <div class="favorite-infos">
            <label for="restaurant-select">Select Restaurant:</label>
            <select id="restaurant-select" v-model="selectedRestaurantId">
              <option value="" disabled>Select a restaurant</option>
              <option
                v-for="restaurant in allRestaurantsAsFavorites"
                :key="restaurant.id"
                :value="restaurant.id"
              >
                {{ restaurant.name }}
              </option>
            </select>
          </div>
          <p v-if="addRestaurantSuccess" class="success-message">Restaurant added successfully!</p>
          <div class="modal-buttons">
            <button
              class="submit-favorite"
              @click="addRestaurant"
              :disabled="!selectedRestaurantId"
            >
              Add
            </button>
            <button class="close-modal" @click="closeAddRestaurantModal">Cancel</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import userData from '@/assets/user.json'
import {
  getFavoriteLists,
  fetchAllRestaurants,
  createFavoriteList,
  updateFavoriteListName,
  deleteFavoriteList,
  addRestaurantToList,
  removeRestaurantFromList,
} from '@/api/favoritesList.js'

const user = ref({ firstName: '', lastName: '', followers: 0, following: 0, rating: 0 })
const recentVisits = ref([])
const favoriteLists = ref([])
const editingListId = ref(null)
const showCreateListModal = ref(false)
const newListName = ref('')
const createListSuccess = ref(false)
const showAddRestaurantModal = ref(false)
const selectedRestaurantId = ref('')
const addRestaurantSuccess = ref(false)
const allRestaurantsAsFavorites = ref([])
const currentListId = ref(null)

onMounted(async () => {
  user.value = userData

  const visits = JSON.parse(localStorage.getItem('recentVisits') || '[]')
  recentVisits.value = visits.sort((a, b) => new Date(b.date) - new Date(a.date))

  favoriteLists.value = getFavoriteLists()

  allRestaurantsAsFavorites.value = await fetchAllRestaurants()
})

const getInitials = () => {
  return `${user.value.firstName.charAt(0)}${user.value.lastName.charAt(0)}`.toUpperCase()
}

const openCreateListModal = () => {
  showCreateListModal.value = true
  newListName.value = ''
  createListSuccess.value = false
}

const closeCreateListModal = () => {
  showCreateListModal.value = false
}

const createList = () => {
  createFavoriteList(newListName.value)
  favoriteLists.value = getFavoriteLists()
  createListSuccess.value = true
  setTimeout(() => {
    createListSuccess.value = false
    closeCreateListModal()
  }, 1500)
}

const toggleEditList = (listId) => {
  editingListId.value = editingListId.value === listId ? null : listId
}

const updateListName = (list) => {
  updateFavoriteListName(list.id, list.name)
  favoriteLists.value = getFavoriteLists()
  editingListId.value = null
}

const deleteList = (listId) => {
  favoriteLists.value = deleteFavoriteList(listId)
}

const openAddRestaurantModal = (listId) => {
  currentListId.value = listId
  showAddRestaurantModal.value = true
  selectedRestaurantId.value = ''
  addRestaurantSuccess.value = false
}

const closeAddRestaurantModal = () => {
  showAddRestaurantModal.value = false
}

const addRestaurant = () => {
  const updatedList = addRestaurantToList(
    currentListId.value,
    selectedRestaurantId.value,
    allRestaurantsAsFavorites.value,
  )
  if (updatedList) {
    favoriteLists.value = getFavoriteLists()
    addRestaurantSuccess.value = true
    setTimeout(() => {
      addRestaurantSuccess.value = false
      closeAddRestaurantModal()
    }, 1500)
  }
}

const removeRestaurant = (listId, restaurantId) => {
  const updatedList = removeRestaurantFromList(listId, restaurantId)
  if (updatedList) {
    favoriteLists.value = getFavoriteLists()
  }
}
</script>

<style scoped>
.User {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
}

.main {
  width: 100%;
  display: block;
}
.Home {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  height: px;
  padding-top: 30px;
  margin-top: 0;
}
.wrapper {
  position: relative;
}
.image {
  margin-top: 100px;
  width: 1200px;
  border-radius: 20px;
  height: 400px;
  object-fit: cover;
  object-position: right;
  z-index: -1;
  filter: brightness(90%);
}
.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  text-align: center;
  transform: translate(-50%, -50%);
}
.overlay h1 {
  font-size: 3em;
  color: white;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
}
.overlay .logo-main {
  width: 350px;
}
.info {
  font-size: 25px;
  padding-left: 300px;
}
.info-item-part1 {
  display: flex;
  justify-content: space-between;
}
.info-item-part1-2 {
  padding: 0;
  margin: 0;
}
.info-item-part1-2-3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
p {
  align-content: center;
  justify-content: center;
  font-weight: bold;
}
.rating {
  font-size: 20px;
}
.Follow {
  margin-top: 10px;
  background-color: #f55702;
  border-radius: 15px;
  width: 150px;
  height: 50px;
  color: white;
  font-size: 25px;
  border: none;
  cursor: pointer;
}
.Follow:hover {
  background-color: #c8c0c0;
  transition:
    background-color 0.3s ease,
    transform 0.2s;
}
.profile-picture {
  width: 200px;
  height: 200px;
  background-color: #ffffff;
  border-radius: 50px;
  position: absolute;
  top: 70%;
  right: 76%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 1);
}
.profile-picture h2 {
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
  font-size: 80px;
  color: #f55702;
}

.Table {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px 0;
}
.Table-Visit,
.Table-Favorites {
  width: 1200px;
  padding: 20px;
}
h3 {
  font-size: 50px;
  color: #0b0b0b;
  margin-bottom: 20px;
}
.Table-content {
  width: 100%;
  border-radius: 50px;
  background-color: #f3efef;
  border: 1px solid #f55702;
  padding: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
}
.restaurant-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;
}
.restaurant-card {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  padding: 15px;
  text-align: left;
}
.restaurant-name {
  font-size: 23px;
  font-weight: bold;
  color: #f55702;
}
.visit-rating,
.visit-comment,
.visit-date {
  font-size: 16px;
  color: #333;
}
.visit-comment {
  font-style: italic;
}
.no-visits,
.no-favorites {
  text-align: center;
  padding: 50px;
  width: 100%;
}
p1 {
  font-size: 40px;
  padding: 25px;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  background-color: #f55702;
  border-radius: 25px;
  margin: 20px auto;
}
.btn a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 25px;
}
.btn:hover {
  background-color: #a5a1a1;
}

.create-list-button {
  background-color: #f55702;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}
.create-list-button:hover {
  background-color: #a5a1a1;
}
.favorite-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}
.favorite-card {
  border: 1px solid #f55702;
  border-radius: 10px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
.favorite-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.list-name-input {
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  width: 50%;
}
.favorite-actions {
  display: flex;
  gap: 10px;
}
.favorite-actions button {
  background-color: #f55702;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
.favorite-actions button:hover {
  background-color: #a5a1a1;
}
.remove-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
}
.remove-button:hover {
  background-color: #c82333;
}

.modal-overlay {
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
.favorite-modal h2 {
  font-size: 24px;
  margin-bottom: 15px;
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
.favorite-infos input,
.favorite-infos select {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  font-size: 16px;
}
.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.submit-favorite {
  background-color: #f55702;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 45%;
}
.submit-favorite:hover {
  background-color: #a5a1a1;
}
.close-modal {
  background-color: #9c9c9c;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 45%;
}
.close-modal:hover {
  background-color: #383737;
}
.success-message {
  color: green;
  margin-top: 10px;
  font-size: 16px;
}

@media (max-width: 1200px) {
  .Table .Table-Visit .Table-Favorites {
    width: 100%;
  }
  .info {
    padding-left: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .info-item-part1 {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .info-item-part1-2-3 {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 80px;
  }

  .profile-picture h2 {
    font-size: 50px;
  }

  .Follow {
    width: 120px;
    height: 45px;
    font-size: 16px;
  }
  .profile-picture {
    top: 400px;
    right: 50%;
    transform: translateX(50%);
  }
  .Table-Visit,
  .Table-Favorites {
    width: 100%;
    padding: 10px;
  }
  .Table-content {
    width: 100%;
  }
  .restaurant-card {
    width: 100%;
    max-width: 90%;
    box-sizing: border-box;
  }
}
@media (max-width: 768px) {
  .Table .Table-Visit .Table-Favorites {
    width: 100%;
  }
  .overlay h1 {
    font-size: 2em;
  }
  .overlay .logo-main {
    width: 250px;
  }
  .profile-picture {
    width: 150px;
    height: 180px;
    top: 60%;
  }
  .profile-picture h2 {
    font-size: 60px;
    margin-top: 30%;
  }
  .info {
    font-size: 20px;
  }
  .Follow {
    width: 120px;
    height: 75px;
    font-size: 20px;
  }
  h3 {
    font-size: 40px;
  }
  p1 {
    font-size: 30px;
  }
  .favorite-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .favorite-card {
    width: 100%;
    max-width: 90%;
    box-sizing: border-box;
  }

  .restaurant-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0;
  }

  .restaurant-card {
    width: 100%;
    max-width: 90%;
    box-sizing: border-box;
  }
  .favorite-info {
    flex-direction: column;
    align-items: flex-start;
  }
  .favorite-actions {
    margin-top: 10px;
  }
  .list-name-input {
    width: 100%;
  }
}
@media (max-width: 480px) {
  .Table .Table-Visit .Table-Favorites {
    width: 100%;
  }

  .overlay h1 {
    font-size: 1.5em;
  }
  .overlay .logo-main {
    width: 200px;
  }
  .profile-picture {
    width: 120px;
    height: 150px;
    top: 50%;
  }
  .profile-picture h2 {
    font-size: 50px;
    margin-top: 25%;
  }
  .info {
    font-size: 18px;
  }
  .Follow {
    width: 100px;
    height: 60px;
    font-size: 18px;
  }
  h3 {
    font-size: 30px;
  }
  p1 {
    font-size: 25px;
  }
  .restaurant-card {
    width: 100%;
  }
  .create-list-button {
    font-size: 16px;
    padding: 8px 16px;
  }
}
</style>
