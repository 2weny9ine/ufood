const unsecureApi = false

export const API_URL = 'https://ufoodapi.herokuapp.com' + (unsecureApi ? '/unsecure' : '')

export const restaurantParams = {
  LIMIT: 'limit',
  PAGE: 'page',
  Q: 'q',
  GENRES: 'genres',
  PRICE_RANGE: 'price_range',
  LONGITUDE: 'lon',
  LATITUDE: 'lat',
}

const QUERY_KEY = 0
const QUERY_VALUE = 1

export function paramsToStr(params) {
  let index = 0
  let queryStr = ''

  params.forEach((param) => {
    if (param !== null && param && param !== 'undefined') {
      queryStr += index === 0 ? '?' : '&'
      queryStr += `${param[QUERY_KEY]}=${param[QUERY_VALUE]}`
    }
    index++
  })

  return queryStr
}

export class UserSession {
  constructor(id, name, email, token) {
    this.id = id
    this.name = name
    this.email = email
    this.token = token
  }
}
