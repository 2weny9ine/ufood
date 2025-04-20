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
    console.error('Error in fetchRestaurants')
    return [[], 0]
  }
}

export const fetchSimilarRestaurants = async (
  genres,
  priceRange,
  currentRestaurantId,
  limit = 50,
) => {
  const filters = []
  if (genres?.length) filters.push({ key: 'genres', value: genres.join(',') })
  if (limit) filters.push({ key: 'limit', value: limit })

  try {
    let [restaurants] = await fetchRestaurants(filters)

    if (restaurants.length === 0) {
      ;[restaurants] = await fetchRestaurants([{ key: 'limit', value: limit }])
    }

    const similarRestaurants = restaurants
      .filter((restaurant) => {
        if (!restaurant || !restaurant.id) {
          return false
        }

        if (restaurant.id === currentRestaurantId) {
          return false
        }

        const restaurantGenres = Array.isArray(restaurant.genres)
          ? restaurant.genres
              .map((g) => (typeof g === 'string' ? g.toLowerCase().trim() : ''))
              .filter((g) => g)
          : []
        const normalizedGenres = Array.isArray(genres)
          ? genres
              .map((g) => (typeof g === 'string' ? g.toLowerCase().trim() : ''))
              .filter((g) => g)
          : []

        const hasCommonGenre =
          normalizedGenres.length > 0 && restaurantGenres.length > 0
            ? normalizedGenres.some((genre) => restaurantGenres.includes(genre))
            : normalizedGenres.length === 0 && restaurantGenres.length === 0

        console.log(
          `Restaurant ${restaurant.name}: hasCommonGenre=${hasCommonGenre}, normalizedGenres=${normalizedGenres}, restaurantGenres=${restaurantGenres}`,
        )
        return hasCommonGenre
      })
      .sort((a, b) => {
        const aGenres = Array.isArray(a.genres)
          ? a.genres
              .map((g) => (typeof g === 'string' ? g.toLowerCase().trim() : ''))
              .filter((g) => g)
          : []
        const bGenres = Array.isArray(b.genres)
          ? b.genres
              .map((g) => (typeof g === 'string' ? g.toLowerCase().trim() : ''))
              .filter((g) => g)
          : []
        const aCommonGenres = genres.filter((genre) =>
          aGenres.includes(typeof genre === 'string' ? genre.toLowerCase().trim() : ''),
        ).length
        const bCommonGenres = genres.filter((genre) =>
          bGenres.includes(typeof genre === 'string' ? genre.toLowerCase().trim() : ''),
        ).length
        return bCommonGenres - aCommonGenres
      })
      .slice(0, 10)

    console.log('Similar restaurants after filtering:', similarRestaurants)
    return similarRestaurants || []
  } catch {
    console.error('Error fetching similar restaurants')
    return []
  }
}
