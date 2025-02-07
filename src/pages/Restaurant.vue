<template>
  <div class="restaurant-info">
    <div class="restaurant-header">
      <div class="image-container">
        <img
          src="../assets/Recipes_2400_Spicy-Pepperoni-Pizza.jpg"
          alt="Restaurant Image"
          class="restaurant-image"
        />
        <img src="../assets/Pizza-Pizza-Logo.png" alt="Restaurant logo" class="restaurant-logo" />
        <div class="logo-text-container">
          <div class="restaurant-details">
            <div class="name-category">
              <h2 class="restaurant-name">Pizza Pizza</h2>
              <p class="restaurant-category">
                <img src="../assets/food-restaurant-svgrepo-com.svg" height="15" /> Pizza
              </p>
            </div>
            <div class="contact-info">
              <p class="restaurant-location">
                <img src="../assets/location-pin-alt-1-svgrepo-com.svg" height="18" />
                <a
                  :href="`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="map-link"
                >
                  2360 Ch Ste-Foy, Québec, QC G1V 1T1
                </a>
              </p>
              <p class="separator">|</p>
              <p class="restaurant-phone">
                <img src="../assets/phone-rounded-svgrepo-com.svg" height="18" /> 418-874-1111
              </p>
              <p class="separator">|</p>
              <div class="rating">
                <span class="star">&#9733;</span>
                <span class="star">&#9733;</span>
                <span class="star">&#9733;</span>
                <span class="star">&#9733;</span>
                <span class="star-empty">&#9734;</span>
                <span class="rating-text">4.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="restaurant-info">
    <h2 style="text-align: center">Restaurant Location</h2>
    <div id="map"></div>

    <h2 style="text-align: center">Restaurant Gallery</h2>
    <div class="gallery-container">
      <div class="gallery" ref="gallery">
        <img v-for="(image, index) in images" :key="index" :src="image" alt="Pizza" />
      </div>
      <button class="btn prev" @click="moveSlide(-1)">&#10094;</button>
      <button class="btn next" @click="moveSlide(1)">&#10095;</button>
    </div>

    <div class="opening-hours">
      <h3>Opening Hours</h3>
      <ul>
        <li>Monday - Friday: 11:00 AM - 10:00 PM</li>
        <li>Saturday - Sunday: 12:00 PM - 11:00 PM</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.restaurant-info {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
}

.restaurant-header {
  width: 100%;
  max-width: 950px;
  margin-bottom: 80px; /* Ensures space for gallery */
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
  bottom: -40px;
  left: 30px;
  width: 60px;
  height: 60px;
  border-radius: 20%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  padding: 10px;
  z-index: 1;
}

.logo-text-container {
  position: absolute;
  bottom: -60px;
  left: 130px;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.restaurant-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
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

.restaurant-location,
.restaurant-phone {
  font-size: 0.9em;
  color: #555;
  margin: 0;
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

/* Ensure only one image is visible */
.gallery-container {
  position: relative;
  max-width: 600px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

/* Make images slide horizontally */
.gallery {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.gallery img {
  width: 100%; /* Each image takes full width of container */
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  flex: 0 0 100%; /* Prevents images from stacking */
}

/* Buttons for navigation */
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
</style>

<script>
/* global google */

export default {
  data() {
    return {
      images: [
        '/src/assets/Recipes_2400_Spicy-Pepperoni-Pizza.jpg',
        '/src/assets/Screen-Shot-2020-06-30-at-9.24.59-AM.png',
      ],
      index: 0,
      address: '2360 Ch Ste-Foy, Québec, QC', // Your address
      googleMapsApiKey: 'AIzaSyB46nMuC6KEFC1o1Qv4HJPz66kTdJhoL3c', // Replace with your key
    }
  },
  mounted() {
    // Ensure the gallery width matches the number of images
    this.$refs.gallery.style.width = `${this.images.length * 100}%`
    this.loadGoogleMaps()
  },
  methods: {
    moveSlide(direction) {
      const totalImages = this.images.length
      this.index += direction

      if (this.index >= totalImages) this.index = 0 // Loop to first image
      if (this.index < 0) this.index = totalImages - 1 // Loop to last image

      this.$refs.gallery.style.transform = `translateX(${-this.index * (100 / totalImages)}%)`
    },

    loadGoogleMaps() {
      if (!window.google) {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${this.googleMapsApiKey}&callback=initMap`
        script.defer = true
        script.async = true
        window.initMap = this.getCoordinates // Call getCoordinates when loaded
        document.head.appendChild(script)
      } else {
        this.getCoordinates()
      }
    },

    async getCoordinates() {
      const address = encodeURIComponent(this.address)
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
      const restaurantLocation = { lat, lng } // Use fetched coordinates
      const map = new google.maps.Map(document.getElementById('map'), {
        center: restaurantLocation,
        zoom: 15,
      })

      new google.maps.Marker({
        position: restaurantLocation,
        map: map,
        title: this.address,
      })
    },
  },
}
</script>
