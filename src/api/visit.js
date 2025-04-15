import { API_URL, paramsToStr } from './api.config'
import Cookies from 'js-cookie'

export const fetchVisitById = async (userId, visitId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/restaurants/visits/${visitId}`, {
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

    const data = await response.json()
    return [data.items, data.total]
  } catch (error) {
    console.error('Error fetching visit by ID:', error)
    return [[], 0]
  }
}

export const fetchVisitsForRestaurant = async (userId, restaurantId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/restaurants/${restaurantId}/visits`, {
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

    const data = await response.json()
    return [data.items, data.total]
  } catch (error) {
    console.error('Error fetching visits for restaurant:', error)
    return [[], 0]
  }
}

export const fetchUserVisits = async (userId, filters = []) => {
  const query = paramsToStr(filters)

  try {
    const response = await fetch(`${API_URL}/users/${userId}/restaurants/visits${query}`, {
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

    const data = await response.json()
    return [data.items, data.total]
  } catch (error) {
    console.error('Error fetching user visits:', error)
    return [[], 0]
  }
}

export const registerVisit = async (userId, Data) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/restaurants/visits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
      },
      body: JSON.stringify(Data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message)
    }

    return await response.json()
  } catch (error) {
    console.error('Error registering restaurant visit:', error)
    return null
  }
}
