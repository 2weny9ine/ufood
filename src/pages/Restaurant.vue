<template>
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
            <button class="visit-button" @click="openVisitModal(restaurant)">
              Register Your Visit
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Visit Modal -->
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

    <!-- Google Maps -->
    <h2 style="text-align: center">Restaurant Location</h2>
    <div id="map"></div>

    <!-- Gallery -->
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
      <button class="btn prev" @click="moveSlide(-1)">&#10094;</button>
      <button class="btn next" @click="moveSlide(1)">&#10095;</button>
    </div>

    <!-- Opening Hours -->
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

    try {
      this.restaurant = await getRestaurantById(restaurantId)
      this.loadGoogleMaps()
    } catch (error) {
      console.error('Error fetching restaurant:', error)
      this.errorMessage = 'Failed to fetch restaurant data.'
    } finally {
      this.loading = false
    }
  },

  methods: {
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
      if (!window.google) {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${this.googleMapsApiKey}&callback=initMap`
        script.defer = true
        script.async = true
        window.initMap = this.getCoordinates
        document.head.appendChild(script)
      } else {
        this.getCoordinates()
      }
    },

    async getCoordinates() {
      const address = encodeURIComponent(this.restaurant?.address)
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.googleMapsApiKey}`

      try {
        const response = await fetch(url)
        const data = await response.json()

        if (data.status === 'OK') {
          const location = data.results[0].geometry.location
          this.initMap(location.lat, location.lng)
        } else {
          console.error('Geocoding error:', data.status)
        }
      } catch (error) {
        console.error('Error fetching geocode:', error)
      }
    },

    initMap(lat, lng) {
      const restaurantLocation = { lat, lng }
      const map = new google.maps.Map(document.getElementById('map'), {
        center: restaurantLocation,
        zoom: 15,
      })

      new google.maps.Marker({
        position: restaurantLocation,
        map: map,
        title: this.restaurant?.address,
      })

      const button = document.createElement('button')
      button.textContent = '📍 Get Directions'
      button.classList.add('maps-button')
      button.onclick = () => {
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
        window.open(googleMapsUrl, '_blank')
      }

      const customControlDiv = document.createElement('div')
      customControlDiv.appendChild(button)
      map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(customControlDiv)
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
@media (max-width: 768px) {
  .contact-info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1px;
  }

  .restaurant-location,
  .restaurant-phone,
  .rating,
  .price-range {
    display: flex;
    align-items: center;
    gap: 5px;
    line-height: 1.2;
    margin: 2px 0;
  }

  .separator {
    display: none;
  }
  .restaurant-name {
    font-size: 1rem;
  }

  .restaurant-category {
    font-size: 0.7rem;
  }

  .restaurant-location,
  .restaurant-phone,
  .rating-text,
  .price-range {
    font-size: 0.5rem;
  }

  .logo-text-container {
    bottom: -70px;
  }
}
</style>
