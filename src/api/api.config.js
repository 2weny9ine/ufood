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
  let queryStr = ''
  let index = 0

  if (!Array.isArray(params)) {
    params = Object.entries(params)
  }

  params.forEach((param) => {
    const key = param[QUERY_KEY]
    const value = param[QUERY_VALUE]

    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          queryStr += index === 0 ? '?' : '&'
          queryStr += `${key}=${encodeURIComponent(v)}`
          index++
        })
      } else {
        queryStr += index === 0 ? '?' : '&'
        queryStr += `${key}=${encodeURIComponent(value)}`
        index++
      }
    }
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
