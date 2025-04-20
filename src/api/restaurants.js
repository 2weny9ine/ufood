import { API_URL, paramsToStr } from './api.config'
import Cookies from 'js-cookie'

export const fetchRestaurantDetails = async (restaurantId) => {
  try {
    const response = await fetch(`${API_URL}/restaurants/${restaurantId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
      },
    })

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch {
    return null
  }
}

export const fetchRestaurants = async (filters = []) => {
  const query = paramsToStr(filters)

  try {
    const response = await fetch(`${API_URL}/restaurants${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
      },
    })

    if (!response.ok) {
      return [[], 0]
    }

    const result = await response.json()
    return [result.items, result.total]
  } catch {
    return [[], 0]
  }
}

export const fetchSimilarRestaurants = async (
  genres,
  priceRange,
  currentRestaurantId,
  limit = 4,
) => {
  const filters = []
  if (genres?.length) filters.push({ key: 'genres', value: genres.join(',') })
  if (priceRange) filters.push({ key: 'price_range', value: priceRange })
  if (limit) filters.push({ key: 'limit', value: limit })

  try {
    const [restaurants] = await fetchRestaurants(filters)
    return restaurants.filter((restaurant) => restaurant.id !== currentRestaurantId) || []
  } catch {
    return []
  }
}
