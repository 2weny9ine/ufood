export async function getCurrentPositionOnce() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Geolocation not supported.'))
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => resolve([pos.coords.longitude, pos.coords.latitude]),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    )
  })
}

export async function getCurrentPositionWithRetry() {
  let coords = null
  while (!coords) {
    try {
      coords = await getCurrentPositionOnce()
    } catch (err) {
      console.error('Retrying location fetch:', err)
      await new Promise((res) => setTimeout(res, 500))
    }
  }
  return coords
}
