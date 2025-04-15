import { API_URL, paramsToStr } from './api.config'
import Cookies from 'js-cookie'

export const fetchAllUsers = async (filters = []) => {
  const query = paramsToStr(filters)

  try {
    const response = await fetch(`${API_URL}/users${query}`, {
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

    const result = await response.json()
    return [result.items, result.total]
  } catch (error) {
    console.error('Error fetching users:', error)
    return [[], 0]
  }
}

export const fetchUserDetails = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching user details:', error)
    return null
  }
}

export const follow = async (targetId) => {
  try {
    const response = await fetch(`${API_URL}/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Cookies.get('token'),
      },
      body: JSON.stringify({ id: targetId }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    const data = await response.json()
    return data[0]
  } catch (error) {
    console.error('Error following user:', error)
    throw error
  }
}

export const unfollow = async (targetId) => {
  try {
    const response = await fetch(`${API_URL}/follow/${targetId}`, {
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
    return data[0]
  } catch (error) {
    console.error('Error unfollowing user:', error)
    return null
  }
}

export const fetchUserLists = async (userId, filters = []) => {
  const query = paramsToStr(filters)

  try {
    const response = await fetch(`${API_URL}/users/${userId}/favorites${query}`, {
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

    const result = await response.json()
    return [result.items, result.total]
  } catch (error) {
    console.error('Error fetching user favorite lists:', error)
    return [[], 0]
  }
}
