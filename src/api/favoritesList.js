import { API_URL, paramsToStr } from './api.config'
import Cookies from 'js-cookie'

export const getFavoriteLists = async (options = []) => {
  const query = paramsToStr(options)

  try {
    const response = await fetch(`${API_URL}/favorites${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    const data = await response.json()
    return [data.items, data.total]
  } catch (error) {
    console.error('Failed to fetch favorite lists:', error)
    return [[], 0]
  }
}

export const getFavoriteListById = async (listId) => {
  try {
    const response = await fetch(`${API_URL}/favorites/${listId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    const data = await response.json()
    return [data.id, data.name, data.restaurants, data.owner]
  } catch (error) {
    console.error('Failed to get favorite list:', error)
    return null
  }
}

export const createFavoriteList = async (name) => {
  try {
    const response = await fetch(`${API_URL}/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
      },
      body: JSON.stringify({ name }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    const data = await response.json()
    return [data.id, data.name, data.restaurants]
  } catch (error) {
    console.error('Failed to create favorite list:', error)
    return null
  }
}

export const deleteFavoriteList = async (listId) => {
  try {
    const response = await fetch(`${API_URL}/favorites/${listId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    return true
  } catch (error) {
    console.error('Failed to delete favorite list:', error)
    return false
  }
}

export const addRestaurantToList = async (listId, restaurantId) => {
  try {
    const response = await fetch(`${API_URL}/favorites/${listId}/restaurants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
      },
      body: JSON.stringify({ id: restaurantId }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    const data = await response.json()
    return [data.id, data.name, data.restaurants]
  } catch (error) {
    console.error('Failed to add restaurant to list:', error)
    return null
  }
}

export const updateListName = async (listId, newName) => {
  try {
    const response = await fetch(`${API_URL}/favorites/${listId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
      },
      body: JSON.stringify({ name: newName }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    const data = await response.json()
    return [data.id, data.name, data.restaurants]
  } catch (error) {
    console.error('Failed to update favorite list name:', error)
    return null
  }
}

export const removeRestaurantFromList = async (listId, restaurantId) => {
  try {
    const response = await fetch(`${API_URL}/favorites/${listId}/restaurants/${restaurantId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    const data = await response.json()
    return [data.id, data.name, data.restaurants]
  } catch (error) {
    console.error('Failed to remove restaurant from list:', error)
    return null
  }
}
