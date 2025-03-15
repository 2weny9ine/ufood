<template>
  <div class="restaurant-info">
    <div class="restaurant-header">
      <div class="image-container">
        <img :src="pictures[0]" alt="Restaurant Image" class="restaurant-image" />
        <img :src="pictures[1]" alt="Restaurant logo" class="restaurant-logo" />
        <div class="logo-text-container">
          <div class="restaurant-details">
            <div class="name-category">
              <h2 class="restaurant-name">{{ name }}</h2>
              <p class="restaurant-category">
                <img src="../assets/images/food-restaurant-svgrepo-com.svg" height="15" />
                <span class="genres" id="genres"></span>
              </p>
            </div>
            <div class="contact-info">
              <div class="restaurant-location">
                <img src="../assets/images/location-pin-alt-1-svgrepo-com.svg" height="18" />
                <a
                  :href="`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="map-link"
                >
                  {{ address }}
                </a>
              </div>
              <p class="separator">|</p>
              <div class="restaurant-phone">
                <img src="../assets/images/phone-rounded-svgrepo-com.svg" height="18" />
                <a :href="'tel:' + tel">{{ tel }}</a>
              </div>
              <p class="separator">|</p>
              <div class="rating" id="rating"></div>
              <p class="separator">|</p>
              <div class="price-range">{{ price_range }}</div>
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
        <img v-for="(image, index) in gallery" :key="index" :src="image" alt="Pizza" />
      </div>
      <button class="btn prev" @click="moveSlide(-1)">&#10094;</button>
      <button class="btn next" @click="moveSlide(1)">&#10095;</button>
    </div>

    <div class="opening-hours">
      <h3>Opening Hours</h3>
      <ul>
        <li>Sunday: {{ opening_hours.sunday }}</li>
        <li>Monday: {{ opening_hours.monday }}</li>
        <li>Tuesday: {{ opening_hours.tuesday }}</li>
        <li>Wednesday: {{ opening_hours.wednesday }}</li>
        <li>Thursday: {{ opening_hours.thursday }}</li>
        <li>Friday: {{ opening_hours.friday }}</li>
        <li>Saturday: {{ opening_hours.saturday }}</li>
      </ul>
    </div>
  </div>
</template>

<style>
.restaurant-info {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
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
  bottom: -80px;
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

.restaurant-phone {
  display: flex; /* Make icon and text inline */
  align-items: center; /* Align vertically */
  gap: 5px; /* Add spacing between icon and text */
  font-size: 0.9em;
  color: #555;
}

.restaurant-location {
  display: block; /* Makes the address take the full width */
  width: 100%;
  margin-top: 5px;
  text-align: left; /* Adjust to left if needed */
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

.gallery-container {
  position: relative;
  max-width: 50%;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.gallery {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.gallery img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  flex: 0 0 100%;
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
  width: 100%;
  max-width: 50%;
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

/* Style the custom Google Maps button */
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
    flex-wrap: nowrap;
    white-space: nowrap;
    align-items: center;
    gap: 5px;
    line-height: 1.2;
    margin: 2px 0;
  }

  .price-range {
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    align-items: center;
    gap: 5px;
    line-height: 1.2;
    margin: 2px 0;
  }

  .separator {
    display: none; /* Hide | separators on small screens */
  }
  .restaurant-name {
    font-size: 1rem; /* Reduce font size */
  }

  .restaurant-category {
    font-size: 0.7rem;
  }

  .restaurant-location,
  .restaurant-phone,
  .rating-text,
  .price-range {
    font-size: 0.5rem; /* Make text smaller */
  }

  .logo-text-container {
    bottom: -70px;
  }

  .gallery-container {
    position: relative;
    max-width: 90%;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
}
</style>

<script>
/* global google */

// Get the full URL
const urlParams = new URLSearchParams(window.location.search)
// Get specific parameters
const idRestaurant = urlParams.get('id')

export default {
  data() {
    return {
      index: 0,
      googleMapsApiKey: 'AIzaSyB46nMuC6KEFC1o1Qv4HJPz66kTdJhoL3c',
      opening_hours: '',
      pictures: '',
      name: '',
      place_id: '',
      tel: '',
      address: '',
      price_range: '',
      rating: '',
      genres: '',
      location: '',
      gallery: [],
    }
  },
  async mounted() {
    // Ensure the gallery width matches the number of images
    this.$refs.gallery.style.width = `${100}%`
    await this.fetchRestaurant(idRestaurant)
    await this.getUserLocation()
    await this.loadGoogleMaps()
  },
  methods: {
    moveSlide(direction) {
      const totalImages = this.gallery.length
      this.index += direction

      if (this.index >= totalImages) this.index = 0 // Loop to first image
      if (this.index < 0) this.index = totalImages - 1 // Loop to last image

      this.$refs.gallery.style.transform = `translateX(${-this.index * 100}%)`
    },
    async fetchRestaurant(idRestaurant) {
      try {
        const response = await fetch(
          `https://ufoodapi.herokuapp.com/unsecure/restaurants/${idRestaurant}`,
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const restaurantData = await response.json()

        if (restaurantData) {
          this.opening_hours = restaurantData.opening_hours
          this.pictures = restaurantData.pictures
          this.name = restaurantData.name
          this.place_id = restaurantData.place_id
          this.tel = restaurantData.tel
          this.address = restaurantData.address
          this.price_range = '$'.repeat(restaurantData.price_range)
          this.rating = restaurantData.rating.toFixed(1)
          this.genres = restaurantData.genres
          this.location = restaurantData.location
          this.gallery = restaurantData.pictures
          // this.id = restaurantData.id

          document.getElementById('rating').innerHTML = generateStarRating(this.rating)
          document.getElementById('genres').innerHTML = this.genres.join(', ')
        } else {
          console.error('Restaurant not found!')
        }
      } catch (error) {
        console.error('Error fetching JSON:', error)
      }
    },

    async loadGoogleMaps() {
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
          this.restaurantLat = location.lat
          this.restaurantLng = location.lng
          this.getUserLocation()
        } else {
          console.error('Geocoding error:', data.status)
        }
      } catch (error) {
        console.error('Error fetching geocode:', error)
      }
    },

    async getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.userLat = position.coords.latitude
            this.userLng = position.coords.longitude
            this.initMapWithDirections()
          },
          (error) => {
            console.error('Error getting location:', error)
          },
        )
      } else {
        console.error('Geolocation is not supported by this browser.')
      }
    },

    async initMapWithDirections() {
      const restaurantLocation = { lat: this.restaurantLat, lng: this.restaurantLng }
      const userLocation = { lat: this.userLat, lng: this.userLng }

      const map = new google.maps.Map(document.getElementById('map'), {
        center: restaurantLocation,
        zoom: 15,
      })

      const directionsService = new google.maps.DirectionsService()
      const directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: {
          strokeColor: '#FF0000', // Change to your preferred color (Hex, RGB, or named color)
          strokeOpacity: 0.8, // Adjust transparency (0.0 to 1.0)
          strokeWeight: 6, // Thickness of the line
        },
      })
      directionsRenderer.setMap(map)

      const request = {
        origin: userLocation,
        destination: restaurantLocation,
        travelMode: google.maps.TravelMode.DRIVING, // Change to WALKING, BICYCLING, or TRANSIT if needed
      }

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result)
        } else {
          console.error('Directions request failed due to ' + status)
        }
      })

      // Create "Get Directions" Button
      const button = document.createElement('button')
      button.textContent = '📍 Get Directions'
      button.classList.add('maps-button')
      button.onclick = () => {
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${this.userLat},${this.userLng}&destination=${this.restaurantLat},${this.restaurantLng}`
        window.open(googleMapsUrl, '_blank')
      }

      // Add Button to Google Maps UI
      const customControlDiv = document.createElement('div')
      customControlDiv.appendChild(button)
      map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(customControlDiv)
    },
  },
}
function generateStarRating(rating, totalStars = 5) {
  let starsHtml = ''
  for (let i = 0; i < totalStars; i++) {
    if (i < rating) {
      starsHtml += '<span class="star">&#9733;</span>'
    } else {
      starsHtml += '<span class="star-empty">&#9734;</span>'
    }
  }
  starsHtml += '<span class="rating-text">' + rating + '</span>'
  return starsHtml
}
</script>
