export const getRestaurants = async (filters = {}) => {
  const url = new URL('https://ufoodapi.herokuapp.com/unsecure/restaurants')

  if (filters.limit) url.searchParams.append('limit', filters.limit)
  if (filters.page) url.searchParams.append('page', filters.page)
  if (filters.q) url.searchParams.append('q', filters.q)
  if (filters.genres?.length) url.searchParams.append('genres', filters.genres.join(','))
  if (filters.price_range?.length)
    url.searchParams.append('price_range', filters.price_range.join(','))

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error('Error fetching restaurants:', error)
    return { items: [] }
  }
}
