<template>
  <div class="restaurant-header">
    <div class="image-container">
      <img :src="pictures?.[0] || '/default-image.jpg'" class="restaurant-image" />
      <img :src="pictures?.[1] || '/default-logo.jpg'" class="restaurant-logo" />

      <div class="logo-text-container">
        <div class="restaurant-details">
          <div class="name-category">
            <h2 class="restaurant-name">{{ name || 'Restaurant Name' }}</h2>
            <p class="restaurant-category">
              <img src="@/assets/images/food-restaurant-svgrepo-com.svg" height="15" />
              {{ genres?.[0] || 'Unknown' }}, {{ genres?.[1] || '' }}
            </p>
          </div>

          <div class="contact-info">
            <div class="restaurant-location">
              <img src="@/assets/images/location-pin-alt-1-svgrepo-com.svg" height="18" />
              <a
                :href="`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`"
                target="_blank"
                class="map-link"
              >
                {{ address || 'No Address Available' }}
              </a>
            </div>
            <p class="separator">|</p>

            <div class="restaurant-phone">
              <img src="@/assets/images/phone-rounded-svgrepo-com.svg" height="18" />
              <a :href="'tel:' + tel">{{ tel || 'No Phone' }}</a>
            </div>
            <p class="separator">|</p>

            <div class="rating">
              <span class="rating-text">{{ rating?.toFixed(1) || '0.0' }}</span>
              <img src="@/assets/images/star.png" class="star-icon" />
            </div>
            <p class="separator">|</p>

            <div class="price-range">
              <span>{{ '$'.repeat(priceRange || 0) }}</span>
            </div>
          </div>

          <div class="button-container">
            <button class="visit-button" @click="$emit('visit')">Register Your Visit</button>
            <button class="favorite-button" @click="$emit('favorite')">Add to Favorites</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  genres: Array,
  address: String,
  tel: String,
  rating: Number,
  priceRange: Number,
  pictures: Array,
})
defineEmits(['visit', 'favorite'])
</script>

<style scoped>
.restaurant-header {
  width: 100%;
  max-width: 950px;
  margin-bottom: 80px;
}

.image-container {
  position: relative;
  width: 100%;
  overflow: visible;
}

.restaurant-image {
  margin-top: 100px;
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.restaurant-logo {
  position: absolute;
  bottom: -20px;
  left: 30px;
  width: 200px;
  height: 200px;
  border-radius: 20%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  z-index: 1;
  object-fit: cover;
}

.restaurant-details {
  width: 650px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  position: relative;
  top: 5px;
  left: 250px;
}

.name-category {
  display: flex;
  align-items: center;
  gap: 10px;
}

.restaurant-name {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0;
  color: #333;
}

.restaurant-category {
  font-size: 1em;
  color: #666;
  margin: 0;
}

.contact-info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  flex-wrap: nowrap;
  overflow: hidden;
  white-space: nowrap;
}

.restaurant-location,
.restaurant-phone,
.rating,
.price-range {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
}

.separator {
  margin: 0 5px;
  color: #aaa;
  font-size: 0.9em;
}

.rating-text {
  font-size: 0.9em;
  color: #333;
  font-weight: bold;
}

.star-icon {
  height: 15px;
}

.button-container {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.visit-button,
.favorite-button {
  background-color: #ff6600;
  color: white;
  border: none;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  width: 150px;
  text-align: center;
}

.visit-button:hover,
.favorite-button:hover {
  background-color: #cc5200;
}

@media (max-width: 1200px) {
  .restaurant-header {
    max-width: 850px;
  }

  .restaurant-details {
    width: 500px;
    left: 200px;
  }

  .restaurant-logo {
    width: 170px;
    height: 170px;
    bottom: -20px;
    left: 20px;
  }
}

@media (max-width: 900px) {
  .restaurant-logo {
    width: 170px;
    height: 170px;
    bottom: 130px;
    left: 50%;
    transform: translateX(-50%);
  }

  .restaurant-header {
    max-width: 100%;
    text-align: center;
  }

  .restaurant-image {
    max-height: 200px;
    border-radius: 10px;
  }

  .restaurant-details {
    top: 80px;
    width: 100%;
    left: 0;
    align-items: center;
    text-align: center;
    padding: 10px;
  }

  .contact-info {
    flex-direction: column;
    align-items: center;
  }

  .separator {
    display: none;
  }

  .restaurant-location,
  .restaurant-phone,
  .rating-text,
  .price-range {
    font-size: 1rem;
  }

  .button-container {
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 5px;
  }

  .visit-button,
  .favorite-button {
    width: 100%;
    font-size: 14px;
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .restaurant-name {
    font-size: 1.2rem;
  }

  .restaurant-details {
    top: 60px;
  }

  .restaurant-logo {
    width: 140px;
    height: 140px;
  }

  .contact-info {
    gap: 5px;
  }
}
</style>
