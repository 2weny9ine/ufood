const BASE_URL = 'https://ufoodapi.herokuapp.com/unsecure'

export const getUserVisits = async (userId, params = {}) => {
  const queryString = new URLSearchParams(params).toString()
  const response = await fetch(`${BASE_URL}/users/${userId}/restaurants/visits?${queryString}`)
  if (!response.ok) throw new Error('Failed to fetch user visits')
  return response.json()
}

export const getRestaurantVisits = async (userId, restaurantId, params = {}) => {
  const queryString = new URLSearchParams(params).toString()
  const response = await fetch(
    `${BASE_URL}/users/${userId}/restaurants/${restaurantId}/visits?${queryString}`,
  )
  if (!response.ok) throw new Error('Failed to fetch restaurant visits')
  return response.json()
}

export const getVisitById = async (userId, visitId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/restaurants/visits/${visitId}`)
  if (!response.ok) throw new Error('Failed to fetch visit details')
  return response.json()
}

export const postVisit = async (userId, visitData) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/restaurants/visits`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(visitData),
  })

  if (!response.ok) throw new Error('Failed to register visit')
  return response.json()
}
