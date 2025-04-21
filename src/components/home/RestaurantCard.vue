<template>
  <div class="restaurant-card">
    <router-link
      :to="{ name: 'Restaurant', params: { id: restaurant.id } }"
      class="restaurant-card-link"
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
          <p>{{ '$'.repeat(restaurant.price_range) }} | {{ restaurant.genres?.join(', ') }}</p>
        </div>
        <p class="restaurant-rating">
          {{ restaurant.rating.toFixed(1) }}
          <img src="@/assets/images/star.png" class="star-icon" />
        </p>
      </div>
    </router-link>
    <button class="visit-button" @click="$emit('visit')">Visit</button>
  </div>
</template>

<script setup>
defineProps(['restaurant'])
defineEmits(['visit'])
</script>

<style scoped>
.restaurant-card {
  position: relative;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  width: 400px;
  height: fit-content;
  overflow: hidden;
}

.banner-container {
  position: relative;
  height: 150px;
  border-radius: 10px 10px 0 0;
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

.inline-container-restaurant {
  align-items: start;
  display: flex;
  padding: 10px 10px 0px 10px;
  font-family: Arial, Helvetica, sans-serif;
}

.restaurant-info {
  align-items: flex-start;
}

.restaurant-info p {
  color: #555;
  margin-top: 5px;
  margin-bottom: 0px;
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

.star-icon {
  height: 15px;
}

.visit-button {
  background-color: #ff6600;
  color: white;
  border: none;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  width: 100px;
  display: block;
  margin: 0px auto 5px;
  text-align: center;
}

.visit-button:hover {
  background-color: #cc5200;
}
</style>
