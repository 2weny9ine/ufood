<template>
  <div class="User">
    <UserBanner :user="user" :initials="initials" :email="user.email" />

    <RecentlyVisited :recentVisits="recentVisits" />

    <FavoriteLists :favoriteLists="favoriteLists" :editingListId="null" :readonly="true" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchUserDetails, fetchUserLists } from '@/api/users'
import { fetchUserVisits } from '@/api/visit'
import { fetchRestaurantDetails } from '@/api/restaurants'
import { restaurantParams } from '@/api/api.config'

import UserBanner from '@/components/user/UserBanner.vue'
import RecentlyVisited from '@/components/user/RecentlyVisited.vue'
import FavoriteLists from '@/components/user/FavoriteLists.vue'

const route = useRoute()
const user = ref({ firstName: '', lastName: '', followers: [], following: [], rating: 0 })
const initials = ref('')
const recentVisits = ref([])
const favoriteLists = ref([])

const loadUserProfile = async (userId) => {
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

  const [lists] = await fetchUserLists(userId)
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

onMounted(() => {
  loadUserProfile(route.params.id)
})

watch(
  () => route.params.id,
  (newId) => {
    loadUserProfile(newId)
  },
)
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
