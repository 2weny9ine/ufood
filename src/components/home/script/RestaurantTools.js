import { restaurantParams } from '@/api/api.config'

export function buildQueryParams(selectedGenres, selectedPrice, pageNumber, limit = 50) {
  const priceMap = {
    $: 1,
    $$: 2,
    $$$: 3,
    $$$$: 4,
    $$$$$: 5,
  }

  const params = []

  params.push([restaurantParams.PAGE, pageNumber])
  params.push([restaurantParams.LIMIT, limit])

  if (selectedGenres) {
    let genreArray
    if (Array.isArray(selectedGenres)) {
      genreArray = selectedGenres.filter((g) => g && typeof g === 'string' && g.trim() !== '')
    } else if (typeof selectedGenres === 'string' && selectedGenres.trim() !== '') {
      genreArray = selectedGenres.split(',').map((g) => g.trim())
    }
    if (genreArray && genreArray.length > 0) {
      params.push([restaurantParams.GENRES, genreArray])
    }
  }

  if (selectedPrice !== '' && selectedPrice !== null && selectedPrice !== undefined) {
    let priceArray
    if (typeof selectedPrice === 'string' && selectedPrice.trim() !== '') {
      priceArray = selectedPrice.split(',').map((p) => p.trim())
    } else if (typeof selectedPrice === 'number') {
      priceArray = [selectedPrice.toString()]
    }
    const mappedPrices = priceArray?.map((p) => priceMap[p] || p).filter((p) => p !== undefined)
    if (mappedPrices?.length > 0) {
      params.push([restaurantParams.PRICE_RANGE, mappedPrices])
    }
  }

  return params
}
