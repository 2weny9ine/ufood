<template>
  <div class="map-view">
    <h3 class="map-title">Restaurant Location</h3>
    <div ref="mapContainer" class="map-box"></div>

    <div v-if="!showDirectionsPanel && !isMapLoading" class="map-controls">
      <button class="maps-button" v-if="!routeShown" @click="displayRoute">Get Directions</button>
      <button class="maps-button alt" v-if="routeShown" @click="clearRoute">Hide Directions</button>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { drawRouteOnMap, clearRouteFromMap, MAPBOX_API_KEY } from './script/RestaurantMap.js'

export default {
  name: 'Map',
  props: {
    restaurantLocation: {
      type: Array,
      required: true,
    },
    userLocation: {
      type: Array,
      required: true,
    },
    showDirectionsPanel: Boolean,
  },
  data() {
    return {
      mapInstance: null,
      routeShown: false,
      isMapLoading: false,
    }
  },
  methods: {
    async initializeMap() {
      mapboxgl.accessToken = MAPBOX_API_KEY
      this.isMapLoading = true

      if (this.$refs.mapContainer) {
        this.$refs.mapContainer.innerHTML = ''
      }

      this.mapInstance = new mapboxgl.Map({
        container: this.$refs.mapContainer,
        style: 'mapbox://styles/mapbox/outdoors-v11?optimize=true',
        center: this.restaurantLocation,
        zoom: 15,
        attributionControl: false,
      })

      this.mapInstance.on('load', () => {
        new mapboxgl.Marker({ color: 'orange' })
          .setLngLat(this.restaurantLocation)
          .setPopup(new mapboxgl.Popup().setHTML('<b>Restaurant</b>'))
          .addTo(this.mapInstance)

        this.mapInstance
          .addControl(new mapboxgl.ScaleControl({ unit: 'metric' }))
          .addControl(new mapboxgl.NavigationControl(), 'bottom-right')

        this.isMapLoading = false
      })
    },
    async displayRoute() {
      this.routeShown = true
      await drawRouteOnMap(this.userLocation, this.restaurantLocation, this.mapInstance)

      const bounds = new mapboxgl.LngLatBounds()
      bounds.extend(this.userLocation).extend(this.restaurantLocation)
      this.mapInstance.fitBounds(bounds, { padding: 40, duration: 2000 })
    },
    async clearRoute() {
      this.routeShown = false
      await clearRouteFromMap(this.restaurantLocation, this.mapInstance)
    },
  },
  mounted() {
    this.initializeMap()
  },
}
</script>

<style scoped>
.map-view {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

.map-title {
  margin-top: 20px;
  margin-bottom: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.map-box {
  width: 100%;
  max-width: 800px;
  height: 400px;
  min-height: 400px;
  margin: 10px auto;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.map-controls {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
}

.maps-button {
  background-color: #ff6600;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
  min-width: 180px;
  text-align: center;
}

.maps-button:hover {
  background-color: #cc5200;
}

.maps-button.alt {
  background-color: white;
  color: #ff6600;
  border: 2px solid #ff6600;
}

.maps-button.alt:hover {
  background-color: #f5f5f5;
}
</style>
