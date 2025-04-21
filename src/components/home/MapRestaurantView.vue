<template>
  <div class="map-container" ref="mapContainer"></div>
</template>

<script setup>
import mapboxgl from 'mapbox-gl'
import { onMounted, ref, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  restaurants: {
    type: Array,
    required: true,
  },
  userLocation: {
    type: Array,
    default: null,
  },
})

const emit = defineEmits(['visit'])
const router = useRouter()

const mapContainer = ref(null)
let mapInstance = null
let markers = []
let userMarker = null

const initMap = () => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoieW91cGkwMjE0IiwiYSI6ImNsc2kxZWkxNjFhdHoydnFwbWtvemFrOHIifQ.Pil0AJAwK_TVItQJAWkb9g'

  const center = props.userLocation || [-122.4194, 37.7749]
  mapInstance = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: center,
    zoom: 13,
  })

  mapInstance.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
  mapInstance.addControl(new mapboxgl.ScaleControl({ unit: 'metric' }))

  mapInstance.scrollZoom.enable()
  mapInstance.dragPan.enable()

  if (props.userLocation) {
    userMarker = new mapboxgl.Marker({ color: 'blue' })
      .setLngLat(props.userLocation)
      .setPopup(new mapboxgl.Popup().setHTML('<h5>Your Location</h5>'))
      .addTo(mapInstance)
  }

  addMarkers()
}

const addMarkers = async () => {
  markers.forEach((m) => m.remove())
  markers = []

  await nextTick()

  props.restaurants.forEach((r) => {
    if (r.location?.coordinates?.length === 2) {
      const coords = [r.location.coordinates[0], r.location.coordinates[1]]
      const marker = new mapboxgl.Marker({ color: 'orange' })
        .setLngLat(coords)
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <div>
              <strong>${r.name}</strong><br/>
              ${'$'.repeat(r.price_range)} | ${r.genres?.join(', ') || ''}<br/>
              Rating: ${r.rating.toFixed(1)} ★<br/>
              <button class="popup-btn" id="visit-${r.id}">Visiter</button>
              <button class="popup-btn details-btn" id="details-${r.id}">Voir les détails</button>
            </div>
          `),
        )
        .addTo(mapInstance)

      markers.push(marker)

      marker.getElement().addEventListener('click', () => {
        setTimeout(() => {
          // Handle "Visit" button
          const visitBtn = document.getElementById(`visit-${r.id}`)
          if (visitBtn) {
            visitBtn.addEventListener('click', () => emit('visit', r))
          }

          // Handle "View Details" button
          const detailsBtn = document.getElementById(`details-${r.id}`)
          if (detailsBtn) {
            detailsBtn.addEventListener('click', () => {
              router.push({ name: 'Restaurant', params: { id: r.id } })
            })
          }
        }, 0)
      })
    }
  })

  if (props.restaurants.length > 0) {
    const bounds = new mapboxgl.LngLatBounds()
    props.restaurants.forEach((r) => {
      if (r.location?.coordinates?.length === 2) {
        bounds.extend([r.location.coordinates[0], r.location.coordinates[1]])
      }
    })
    if (!bounds.isEmpty()) {
      mapInstance.fitBounds(bounds, { padding: 50, maxZoom: 15 })
    }
  }
}

onMounted(() => {
  initMap()
})

watch(
  () => props.restaurants,
  async () => {
    if (mapInstance) {
      await addMarkers()
    }
  },
  { deep: true },
)

watch(
  () => props.userLocation,
  (newLocation) => {
    if (newLocation && mapInstance) {
      if (userMarker) {
        userMarker.remove()
      }
      userMarker = new mapboxgl.Marker({ color: 'blue' })
        .setLngLat(newLocation)
        .setPopup(new mapboxgl.Popup().setHTML('<h5>Your Location</h5>'))
        .addTo(mapInstance)
      mapInstance.setCenter(newLocation)
    }
  },
)
</script>

<style scoped>
.map-container {
  height: 600px;
  width: 100%;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.popup-btn {
  margin-top: 6px;
  padding: 6px 12px;
  background-color: #ff6600;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.popup-btn:hover {
  background-color: #cc5200;
}

.details-btn {
  margin-left: 8px;
  background-color: #4a90e2;
}

.details-btn:hover {
  background-color: #357abd;
}

@media (max-width: 920px) {
  .map-container {
    height: 400px;
  }
}
</style>
