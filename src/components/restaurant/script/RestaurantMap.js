import mapboxgl from 'mapbox-gl'

export const MAPBOX_API_KEY =
  'pk.eyJ1IjoieW91cGkwMjE0IiwiYSI6ImNsc2kxZWkxNjFhdHoydnFwbWtvemFrOHIifQ.Pil0AJAwK_TVItQJAWkb9g'

let userLocationMarker = null

export async function drawRouteOnMap(userCoords, destinationCoords, mapInstance) {
  const [userLng, userLat] = userCoords
  const [destLng, destLat] = destinationCoords

  userLocationMarker = new mapboxgl.Marker({ color: 'blue' })
    .setLngLat(userCoords)
    .setPopup(new mapboxgl.Popup().setHTML('<h5>Your Location</h5>'))
    .addTo(mapInstance)

  const response = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${userLng},${userLat};${destLng},${destLat}?steps=true&geometries=geojson&access_token=${MAPBOX_API_KEY}&overview=full`,
    { method: 'GET' },
  )

  const json = await response.json()
  const routeCoords = json.routes?.[0]?.geometry?.coordinates || []

  const routeData = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: routeCoords,
    },
  }

  if (mapInstance.getSource('route')) {
    mapInstance.getSource('route').setData(routeData)
  } else {
    mapInstance.addSource('route', {
      type: 'geojson',
      data: routeData,
    })

    mapInstance.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#ff6600',
        'line-width': 5,
        'line-opacity': 0.75,
      },
    })
  }
}

export async function clearRouteFromMap(centerCoords, mapInstance) {
  userLocationMarker?.remove()

  if (mapInstance.getLayer('route')) mapInstance.removeLayer('route')
  if (mapInstance.getSource('route')) mapInstance.removeSource('route')

  mapInstance.flyTo({
    center: centerCoords,
    zoom: 15,
    essential: true,
    duration: 3000,
  })
}
