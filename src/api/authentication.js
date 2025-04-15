import Cookies from 'js-cookie'
import { API_URL } from './api.config'

export const authenticateUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    body: new URLSearchParams({ email, password }),
  })

  if (!response.ok) {
    let errorMessage = 'Login failed.'
    try {
      const error = await response.json()
      errorMessage = error.message || errorMessage
    } catch {
      const text = await response.text()
      errorMessage = text || errorMessage
    }
    throw new Error(errorMessage)
  }

  const data = await response.json()
  return [data.token, { id: data.id, name: data.name, email: data.email }]
}

export const endSession = async () => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        Authorization: Cookies.get('token'),
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    Cookies.remove('token')
    Cookies.remove('userName')
    Cookies.remove('userEmail')
    Cookies.remove('userId')

    return true
  } catch (error) {
    console.error('Logout failed:', error)
    return false
  }
}

export const registerAccount = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      body: new URLSearchParams({ name, email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    return await response.json()
  } catch (error) {
    console.error('Signup failed:', error)
    throw error
  }
}

export const retrieveSessionInfo = async (token) => {
  try {
    const response = await fetch(`${API_URL}/tokenInfo`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    return await response.json()
  } catch (error) {
    console.error('Token info fetch failed:', error)
    throw error
  }
}
