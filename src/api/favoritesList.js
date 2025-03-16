import { getRestaurants } from './restaurants.js'
export const getFavoriteLists = () => {
  return JSON.parse(localStorage.getItem('favoriteLists') || '[]')
}

export const fetchAllRestaurants = async () => {
  try {
    const response = await getRestaurants({ limit: 50, page: 1 })
    return response.items || []
  } catch (error) {
    console.error('Error fetching restaurants:', error)
    return []
  }
}

export const createFavoriteList = (name, ownerId = '6569767db55a58e85c543213') => {
  const lists = getFavoriteLists()
  const newList = {
    id: Date.now().toString(),
    name,
    restaurants: [],
    owner: ownerId,
  }
  lists.push(newList)
  localStorage.setItem('favoriteLists', JSON.stringify(lists))
  return newList
}

export const updateFavoriteListName = (listId, newName) => {
  const lists = getFavoriteLists()
  const list = lists.find((l) => l.id === listId)
  if (list) {
    list.name = newName
    localStorage.setItem('favoriteLists', JSON.stringify(lists))
    return list
  }
  return null
}

export const deleteFavoriteList = (listId) => {
  const lists = getFavoriteLists().filter((l) => l.id !== listId)
  localStorage.setItem('favoriteLists', JSON.stringify(lists))
  return lists
}

export const addRestaurantToList = (listId, restaurantId, allRestaurants) => {
  const lists = getFavoriteLists()
  const list = lists.find((l) => l.id === listId)
  const restaurant = allRestaurants.find((r) => r.id === restaurantId)
  if (list && restaurant && !list.restaurants.some((r) => r.id === restaurantId)) {
    list.restaurants.push({
      id: restaurant.id,
      name: restaurant.name,
      price_range: restaurant.price_range,
      genres: restaurant.genres,
      rating: restaurant.rating,
    })
    localStorage.setItem('favoriteLists', JSON.stringify(lists))
    return list
  }
  return null
}

export const removeRestaurantFromList = (listId, restaurantId) => {
  const lists = getFavoriteLists()
  const list = lists.find((l) => l.id === listId)
  if (list) {
    list.restaurants = list.restaurants.filter((r) => r.id !== restaurantId)
    localStorage.setItem('favoriteLists', JSON.stringify(lists))
    return list
  }
  return null
}
