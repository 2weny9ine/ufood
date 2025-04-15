import { restaurantParams } from '@/api/api.config'

export class UserProfile {
  constructor({ id, name, email, followers = [], following = [] }) {
    this.id = id
    this.name = name
    this.email = email
    this.followers = followers
    this.following = following
  }
}

export const filterUniqueByKey = (list, key) => {
  return list.reduce((unique, item) => {
    const exists = unique.find((el) => el[key] === item[key])
    if (!exists) unique.push(item)
    return unique
  }, [])
}

export const retrieveAllPaginatedUserData = async (apiFn, parameters, pageSize) => {
  let completeList = []
  const [, total] = await apiFn(...parameters)
  const pageCount = Math.ceil(total / pageSize)

  for (let page = 0; page < pageCount; page++) {
    const queryParams = [
      [restaurantParams.LIMIT, pageSize],
      [restaurantParams.PAGE, page],
    ]
    const [results] = await apiFn(...parameters, queryParams)
    completeList.push(...results)
  }

  return [completeList, total]
}
