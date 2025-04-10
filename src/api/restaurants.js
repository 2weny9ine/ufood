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
      const errorData = await response.json()
      throw new Error(errorData.message)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching restaurant details:', error)
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
      const errorData = await response.json()
      throw new Error(errorData.message)
    }

    const result = await response.json()
    return [result.items, result.total]
  } catch (error) {
    console.error('Error fetching restaurants:', error)
    return [[], 0]
  }
}

export const loadVisits = async (restaurantId, filters = []) => {
  const query = paramsToStr(filters)

  try {
    const response = await fetch(`${API_URL}/restaurants/${restaurantId}/visits${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message)
    }

    const result = await response.json()
    return [result.items, result.total]
  } catch (error) {
    console.error('Error loading restaurant visits:', error)
    return [[], 0]
  }
}

export const fetchNearbyRestaurants = async (locationParams = []) => {
  const query = paramsToStr(locationParams)

  try {
    const response = await fetch(`${API_URL}/restaurants${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch restaurants near location')
    }

    const nearby = await response.json()
    return [nearby.items, nearby.total]
  } catch (error) {
    console.error('Error fetching nearby restaurants:', error)
    return [[], 0]
  }
}
