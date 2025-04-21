<template>
  <div class="User">
    <UserBanner :user="user" :initials="initials" :email="user.email" />
    <FollowingList :following="user.following" style="margin-top: 30px" />

    <RecentlyVisited :recentVisits="recentVisits" />

    <FavoriteLists
      :favoriteLists="favoriteLists"
      :editingListId="editingListId"
      @update-name="handleUpdateListName"
      @toggle-edit="toggleEditList"
      @open-add-modal="openAddRestaurantModal"
      @delete-list="deleteList"
      @remove-restaurant="removeRestaurant"
      @open-create-modal="openCreateListModal"
    />

    <FavoriteModal
      v-if="showCreateListModal"
      v-model="newListName"
      :createListSuccess="createListSuccess"
      @create="createList"
      @close="closeCreateListModal"
    />

    <RestaurantModal
      v-if="showAddRestaurantModal"
      :allRestaurants="allRestaurantsAsFavorites"
      :addSuccess="addRestaurantSuccess"
      v-model="selectedRestaurantId"
      @add="addRestaurant"
      @close="closeAddRestaurantModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Cookies from 'js-cookie'
import { fetchUserDetails } from '@/api/users'
import { fetchUserLists } from '@/api/users'
import { fetchRestaurantDetails } from '@/api/restaurants'
import {
  createFavoriteList,
  updateListName,
  deleteFavoriteList,
  addRestaurantToList,
  removeRestaurantFromList,
} from '@/api/favoritesList'
import { fetchUserVisits } from '@/api/visit'
import { fetchRestaurants } from '@/api/restaurants'
import { restaurantParams } from '@/api/api.config'
import { retrieveAllPaginatedUserData } from '@/components/user/script/userUtil.js'

import UserBanner from '@/components/user/UserBanner.vue'
import RecentlyVisited from '@/components/user/RecentlyVisited.vue'
import FavoriteLists from '@/components/user/FavoriteLists.vue'
import FavoriteModal from '@/components/user/FavoriteModal.vue'
import RestaurantModal from '@/components/user/RestaurantModal.vue'
import FollowingList from '@/components/user/FollowingList.vue'

const user = ref({ firstName: '', lastName: '', followers: [], following: [], rating: 0 })
const initials = ref('')
const recentVisits = ref([])
const favoriteLists = ref([])
const allRestaurantsAsFavorites = ref([])

const editingListId = ref(null)
const showCreateListModal = ref(false)
const newListName = ref('')
const createListSuccess = ref(false)

const showAddRestaurantModal = ref(false)
const selectedRestaurantId = ref('')
const addRestaurantSuccess = ref(false)
const currentListId = ref(null)

onMounted(async () => {
  const userId = Cookies.get('userId')
  const token = Cookies.get('token')
  if (!userId || !token) return

  const userData = await fetchUserDetails(userId)
  user.value = {
    id: userData.id,
    firstName: userData.name.split(' ')[0],
    lastName: userData.name.split(' ')[1] || '',
    email: userData.email,
    followers: userData.followers,
    following: userData.following,
    rating: userData.rating || 0,
  }
  initials.value = `${user.value.firstName[0]}${user.value.lastName[0]}`.toUpperCase()

  const [visits] = await fetchUserVisits(userId, [[restaurantParams.LIMIT, 10]])
  const enrichedVisits = []

  for (const visit of visits) {
    const restaurant = await fetchRestaurantDetails(visit.restaurant_id)
    if (restaurant) {
      enrichedVisits.push({
        ...visit,
        name: restaurant.name,
        genres: restaurant.genres,
        price_range: restaurant.price_range,
        address: restaurant.address,
        tel: restaurant.tel,
      })
    }
  }

  recentVisits.value = enrichedVisits

  await reloadMyFavoriteLists()

  const [restaurants] = await retrieveAllPaginatedUserData(fetchRestaurants, [], 10)
  allRestaurantsAsFavorites.value = restaurants
})

const openCreateListModal = () => {
  console.log('Opening modal...')
  showCreateListModal.value = true
  newListName.value = ''
  createListSuccess.value = false
}

const closeCreateListModal = () => {
  showCreateListModal.value = false
}

const createList = async () => {
  const result = await createFavoriteList(newListName.value)
  if (result) {
    const [id, name, restaurants] = result
    favoriteLists.value.unshift({ id, name, restaurants })
    createListSuccess.value = true
    setTimeout(() => {
      createListSuccess.value = false
      closeCreateListModal()
    }, 1500)
  }
}

const handleUpdateListName = async (list) => {
  await updateListName(list.id, list.name)
  await reloadMyFavoriteLists()
  editingListId.value = null
}

const toggleEditList = (listId) => {
  editingListId.value = editingListId.value === listId ? null : listId
}

const deleteList = async (listId) => {
  const result = await deleteFavoriteList(listId)
  if (result) {
    favoriteLists.value = favoriteLists.value.filter((list) => list.id !== listId)
  }
}

const openAddRestaurantModal = async (listId) => {
  currentListId.value = listId
  selectedRestaurantId.value = ''
  addRestaurantSuccess.value = false

  const [restaurants] = await retrieveAllPaginatedUserData(fetchRestaurants, [], 10)
  allRestaurantsAsFavorites.value = restaurants

  showAddRestaurantModal.value = true
}

const closeAddRestaurantModal = () => {
  showAddRestaurantModal.value = false
}

const addRestaurant = async () => {
  const result = await addRestaurantToList(currentListId.value, selectedRestaurantId.value)
  if (result) {
    await reloadMyFavoriteLists()
    addRestaurantSuccess.value = true
    setTimeout(() => {
      addRestaurantSuccess.value = false
      closeAddRestaurantModal()
    }, 1500)
  }
}

const removeRestaurant = async (listId, restaurantId) => {
  const result = await removeRestaurantFromList(listId, restaurantId)
  if (result) {
    await reloadMyFavoriteLists()
  }
}

const reloadMyFavoriteLists = async () => {
  const myId = Cookies.get('userId')
  const [lists] = await fetchUserLists(myId)
  for (const list of lists) {
    const enrichedRestaurants = []
    for (const restaurant of list.restaurants) {
      const fullData = await fetchRestaurantDetails(restaurant.id)
      if (fullData) {
        enrichedRestaurants.push(fullData)
      }
    }
    list.restaurants = enrichedRestaurants
  }
  favoriteLists.value = lists
}
</script>
<style scoped>
.User {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
