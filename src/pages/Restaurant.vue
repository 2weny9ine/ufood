<!-- <template>
  <div v-if="loading" class="loading">Loading...</div>
  <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>

  <div v-else class="restaurant-info">
    <div class="restaurant-header">
      <div class="image-container">
        <img
          :src="restaurant?.pictures?.[0] || '/default-image.jpg'"
          alt="Restaurant Image"
          class="restaurant-image"
        />
        <img
          :src="restaurant?.pictures?.[1] || '/default-logo.jpg'"
          alt="Restaurant logo"
          class="restaurant-logo"
        />

        <div class="logo-text-container">
          <div class="restaurant-details">
            <div class="name-category">
              <h2 class="restaurant-name">{{ restaurant?.name || 'Restaurant Name' }}</h2>
              <p class="restaurant-category">
                <img src="../assets/images/food-restaurant-svgrepo-com.svg" height="15" />
                {{ restaurant?.genres?.[0] || 'Unknown' }}, {{ restaurant?.genres?.[1] || '' }}
              </p>
            </div>

            <div class="contact-info">
              <div class="restaurant-location">
                <img src="../assets/images/location-pin-alt-1-svgrepo-com.svg" height="18" />
                <a
                  :href="`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurant?.address)}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="map-link"
                >
                  {{ restaurant?.address || 'No Address Available' }}
                </a>
              </div>
              <p class="separator">|</p>

              <div class="restaurant-phone">
                <img src="../assets/images/phone-rounded-svgrepo-com.svg" height="18" />
                <a :href="'tel:' + restaurant?.tel">{{ restaurant?.tel || 'No Phone' }}</a>
              </div>
              <p class="separator">|</p>

              <div class="rating">
                <span class="rating-text">{{ restaurant?.rating?.toFixed(1) || '0.0' }}</span>
                <img src="../assets/images/star.png" class="star-icon" />
              </div>
              <p class="separator">|</p>

              <div class="price-range">
                <span>{{ '$'.repeat(restaurant?.price_range || 0) }}</span>
              </div>
            </div>
            <div class="button-container">
              <button class="visit-button" @click="openVisitModal(restaurant)">
                Register Your Visit
              </button>
              <button class="favorite-button" @click="openFavoriteModal(restaurant)">
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showVisitModal" class="modal-overlay">
      <div class="visit-modal">
        <h2>Register Your Visit</h2>
        <p>
          <strong>{{ selectedRestaurant?.name }}</strong>
        </p>
        <div class="visit-infos">
          <div>
            <label for="visit-date">Date:</label>
            <input type="date" id="visit-date" v-model="visitDate" required />
          </div>

          <div>
            <label for="visit-rating">Rating:</label>
            <select id="visit-rating" v-model="visitRating">
              <option v-for="n in 5" :key="n" :value="n">{{ n }} ★</option>
            </select>
          </div>

          <div>
            <label for="visit-comment">Comment:</label>
          </div>
          <textarea
            id="visit-comment"
            v-model="visitComment"
            placeholder="Write a comment..."
          ></textarea>
        </div>

        <p v-if="visitSuccess" class="success-message">Visit recorded successfully!</p>
        <div class="modal-buttons">
          <button class="submit-visit" @click="submitVisit" :disabled="!visitDate">Submit</button>
          <button class="close-modal" @click="closeVisitModal">Cancel</button>
        </div>
      </div>
    </div>

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

    <h2 style="text-align: center">Restaurant Location</h2>
    <div id="map"></div>
    <div id="directions-panel" v-if="showDirectionsPanel"></div>

    <h2 style="text-align: center">Restaurant Gallery</h2>
    <div class="gallery-container">
      <div class="gallery" ref="gallery">
        <img
          v-for="(image, index) in restaurant?.pictures"
          :key="index"
          :src="image"
          alt="Gallery Image"
        />
      </div>
      <button class="btn prev" @click="moveSlide(-1)">❮</button>
      <button class="btn next" @click="moveSlide(1)">❯</button>
    </div>

    <div class="opening-hours">
      <h3>Opening Hours</h3>
      <ul>
        <li v-for="(hours, day) in restaurant?.opening_hours" :key="day">
          {{ day }}: {{ hours || 'Closed' }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getRestaurantById } from '@/api/restaurantId'
import { useRoute } from 'vue-router'
import { postVisit } from '@/api/visit.js'
import { getFavoriteLists, addRestaurantToList } from '@/api/favoritesList.js'

export default {
  data() {
    return {
      restaurant: null,
      loading: true,
      errorMessage: '',
      googleMapsApiKey: 'AIzaSyB46nMuC6KEFC1o1Qv4HJPz66kTdJhoL3c',
      index: 0,
      showVisitModal: false,
      selectedRestaurant: null,
      visitDate: '',
      visitRating: 3,
      visitComment: '',
      visitSuccess: false,
      USER_ID: '6569767db55a58e85c543213',
      map: null,
      directionsService: null,
      directionsRenderer: null,
      showDirectionsPanel: false,
      userLocation: null,
      showFavoriteModal: false,
      favoriteLists: [],
      selectedListId: '',
      favoriteSuccess: false,
    }
  },

  async mounted() {
    const route = useRoute()
    const restaurantId = route.params.id

    if (!restaurantId) {
      this.errorMessage = 'Invalid restaurant ID.'
      this.loading = false
      return
    }

    this.getUserLocation()
    await this.getRestaurantData(restaurantId)
    this.loadGoogleMaps()
  },

  methods: {
    async getRestaurantData(restaurantId) {
      try {
        this.restaurant = await getRestaurantById(restaurantId)

        if (this.restaurant?.location?.coordinates) {
          this.restaurant.location = {
            lat: this.restaurant.location.coordinates[1],
            lng: this.restaurant.location.coordinates[0],
          }
          console.log('Restaurant coordinates loaded:', this.restaurant.location)
        }

        if (window.google && window.google.maps) {
          this.initMap()
        }
      } catch (error) {
        console.error('Error fetching restaurant:', error)
        this.errorMessage = 'Failed to fetch restaurant data.'
      } finally {
        this.loading = false
      }
    },

    getUserLocation() {
      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by this browser.')
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          console.log('User location fetched:', this.userLocation)
        },
        (error) => {
          console.error('Geolocation error:', error)
        },
      )
    },

    openVisitModal(restaurant) {
      this.selectedRestaurant = restaurant
      this.visitDate = ''
      this.visitRating = 3
      this.visitComment = ''
      this.showVisitModal = true
    },

    closeVisitModal() {
      this.showVisitModal = false
    },

    async submitVisit() {
      if (!this.visitDate) {
        alert('Please select a date!')
        return
      }

      const visitData = {
        restaurant_id: this.selectedRestaurant.id,
        name: this.selectedRestaurant.name,
        comment: this.visitComment,
        rating: this.visitRating,
        date: new Date(this.visitDate).toISOString(),
      }

      try {
        await postVisit(this.USER_ID, {
          restaurant_id: visitData.restaurant_id,
          comment: visitData.comment,
          rating: visitData.rating,
          date: visitData.date,
        })

        const existingVisits = JSON.parse(localStorage.getItem('recentVisits') || '[]')
        existingVisits.push(visitData)
        localStorage.setItem('recentVisits', JSON.stringify(existingVisits))

        this.visitSuccess = true
        setTimeout(() => {
          this.visitSuccess = false
          this.closeVisitModal()
        }, 1500)
      } catch (error) {
        console.error('Error submitting visit:', error)
        alert('Failed to register visit.')
      }
    },

    openFavoriteModal(restaurant) {
      this.selectedRestaurant = restaurant
      this.favoriteLists = getFavoriteLists()
      this.selectedListId = ''
      this.favoriteSuccess = false
      this.showFavoriteModal = true
    },

    closeFavoriteModal() {
      this.showFavoriteModal = false
    },

    submitFavorite() {
      if (!this.selectedListId) {
        alert('Please select a favorite list!')
        return
      }

      const updatedList = addRestaurantToList(this.selectedListId, this.selectedRestaurant.id, [
        this.restaurant,
      ])
      if (updatedList) {
        this.favoriteSuccess = true
        setTimeout(() => {
          this.favoriteSuccess = false
          this.closeFavoriteModal()
        }, 1500)
      } else {
        alert('Failed to add to favorites. Restaurant might already be in the list.')
      }
    },

    moveSlide(direction) {
      const gallery = this.$refs.gallery
      const totalImages = this.restaurant?.pictures?.length || 0

      if (!gallery || totalImages === 0) return

      const imageWidth = gallery.clientWidth
      this.index += direction

      if (this.index >= totalImages) {
        this.index = 0
      } else if (this.index < 0) {
        this.index = totalImages - 1
      }

      gallery.style.transform = `translateX(${-this.index * imageWidth}px)`
      gallery.style.transition = 'transform 0.5s ease-in-out'
    },

    loadGoogleMaps() {
      if (window.google && window.google.maps) {
        this.initMap()
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.googleMapsApiKey}&callback=initMap`
      script.defer = true
      script.async = true

      window.initMap = () => {
        if (this.initMap) {
          this.initMap()
        }
      }

      script.onload = () => {
        console.log('Google Maps script loaded.')
      }

      script.onerror = () => {
        console.error('Failed to load Google Maps script.')
        this.errorMessage = 'Failed to load Google Maps.'
      }

      document.head.appendChild(script)
    },

    initMap() {
      if (!window.google || !window.google.maps) {
        console.error('Google Maps API is not available yet.')
        return
      }

      if (
        !this.restaurant.location ||
        !this.restaurant.location.lat ||
        !this.restaurant.location.lng
      ) {
        console.error('Restaurant location is missing.')
        return
      }

      const restaurantLocation = {
        lat: this.restaurant.location.lat,
        lng: this.restaurant.location.lng,
      }

      this.map = new google.maps.Map(document.getElementById('map'), {
        center: restaurantLocation,
        zoom: 15,
      })

      new google.maps.Marker({
        position: restaurantLocation,
        map: this.map,
        title: this.restaurant.address,
      })

      this.directionsService = new google.maps.DirectionsService()
      this.directionsRenderer = new google.maps.DirectionsRenderer()
      this.directionsRenderer.setMap(this.map)

      const button = document.createElement('button')
      button.textContent = '📍 Get Directions'
      button.classList.add('maps-button')
      button.onclick = this.showDirections

      const customControlDiv = document.createElement('div')
      customControlDiv.appendChild(button)
      this.map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(customControlDiv)
    },

    showDirections() {
      if (!this.userLocation || !this.userLocation.lat || !this.userLocation.lng) {
        alert('Your location is unavailable. Please enable location access.')
        return
      }

      if (
        !this.restaurant.location ||
        !this.restaurant.location.lat ||
        !this.restaurant.location.lng
      ) {
        alert('Restaurant location is missing.')
        return
      }

      const origin = { lat: this.userLocation.lat, lng: this.userLocation.lng }
      const destination = { lat: this.restaurant.location.lat, lng: this.restaurant.location.lng }

      console.log('Routing from:', origin, 'to:', destination)

      this.directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === 'OK') {
            this.directionsRenderer.setDirections(response)
          } else {
            console.error('Directions request failed due to:', status)
            alert('Failed to get directions.')
          }
        },
      )
    },
  },
}
</script>

<style>
.visit-button {
  background-color: #ff6600;
  color: white;
  border: none;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  width: 150px;
  display: block;
  text-align: center;
}

.visit-button:hover {
  background-color: #cc5200;
}

.button-container {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.favorite-button {
  background-color: #ff6600;
  color: white;
  border: none;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  width: 150px;
  display: block;
  text-align: center;
}

.favorite-button:hover {
  background-color: #cc5200;
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

.visit-modal {
  background: white;
  padding: 20px;
  width: 350px;
  border-radius: 8px;
  text-align: center;
}

.visit-infos {
  font-weight: lighter;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.visit-infos div {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 10px;
}

.visit-infos label {
  font-weight: bold;
  margin-right: 10px;
  text-align: right;
}

.visit-infos input {
  width: 100px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.visit-infos select {
  width: 60px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.visit-infos textarea {
  width: 95%;
  min-height: 70px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
}

.visit-modal h2 {
  margin-bottom: 10px;
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

.submit-visit {
  background-color: #ff6600;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.submit-visit:hover {
  background-color: #cc5200;
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

textarea {
  width: 100%;
  height: 50px;
  resize: none;
  padding: 5px;
}

.gallery-container {
  position: relative;
  width: 800px;
  height: 400px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.gallery {
  display: flex;
  transition: transform 0.9s ease-in-out;
  width: 800px;
  height: 400px;
}

.gallery img {
  width: 800px;
  height: 400px;
  object-fit: cover;
  flex: 0 0 auto;
  display: block;
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
}

.rating {
  flex-direction: row;
}

.star-icon {
  height: 15px;
}

.restaurant-info {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 100%;
}

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

.contact-info {
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

.restaurant-phone {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9em;
  color: #555;
}

.restaurant-location {
  display: flex;
  align-items: center;
  gap: 5px;
}

.separator {
  font-size: 0.9em;
  color: #aaa;
  margin: 0;
}

.rating {
  display: flex;
  align-items: center;
  gap: 3px;
}

.star {
  color: gold;
  font-size: 1em;
}

.star-empty {
  color: lightgray;
  font-size: 1em;
}

.rating-text {
  font-size: 0.9em;
  color: #333;
  font-weight: bold;
}

.btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 20px;
  border-radius: 5px;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.opening-hours {
  margin-top: 20px;
  align-items: center;
  text-align: center;
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.opening-hours h3 {
  font-size: 1.5em;
  color: #333;
}

.opening-hours ul {
  list-style-type: none;
  padding: 0;
}

.opening-hours li {
  font-size: 1em;
  color: #555;
  margin: 5px 0;
}

.map-link {
  text-decoration: none;
  color: inherit;
  font-size: inherit;
  font-weight: normal;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
}

.map-link:hover {
  text-decoration: none;
  color: #f55702;
  font-weight: bold;
}

#map {
  width: 100%;
  max-width: 800px;
  height: 400px;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.maps-button {
  padding: 10px 15px;
  font-size: 1em;
  font-weight: bold;
  background-color: #ff5722;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  margin: 20px;
}

.maps-button:hover {
  background-color: #e64a19;
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
  .restaurant-info {
    padding: 10px;
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
  }

  .gallery-container {
    width: 100%;
    height: auto;
  }

  .gallery img {
    width: 100%;
    height: auto;
  }

  .opening-hours {
    width: 90%;
    font-size: 0.9rem;
  }

  #map {
    width: 90%;
    height: 300px;
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

  .button-container {
    width: 100%;
    gap: 5px;
  }

  .visit-button,
  .favorite-button {
    width: 100%;
    font-size: 14px;
    padding: 8px;
  }

  .gallery-container {
    height: auto;
  }

  .gallery img {
    width: 100%;
    height: auto;
  }

  .opening-hours {
    width: 95%;
    font-size: 0.8rem;
  }

  #map {
    width: 95%;
    height: 250px;
  }
}
</style> -->
<template></template>
<style></style>
