export const getRestaurantById = async (id) => {
  const url = `https://ufoodapi.herokuapp.com/unsecure/restaurants/${id}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching restaurant with ID ${id}:`, error)
    return null
  }
}
