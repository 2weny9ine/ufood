import { restaurantParams } from '@/api/api.config'
export function buildQueryParams(selectedGenres, selectedPrice, pageNumber) {
  const priceMap = {
    $: 1,
    $$: 2,
    $$$: 3,
    $$$$: 4,
    $$$$$: 5,
  }

  const params = []

  params.push([restaurantParams.PAGE, pageNumber])

  if (selectedGenres && selectedGenres.trim() !== '') {
    const genreArray = selectedGenres.split(',').map((g) => g.trim())
    if (genreArray.length > 0) {
      params.push([restaurantParams.GENRES, genreArray])
    }
  }

  if (selectedPrice && selectedPrice.trim() !== '') {
    const priceArray = selectedPrice.split(',').map((p) => p.trim())
    const mappedPrices = priceArray.map((p) => priceMap[p])
    if (mappedPrices.length > 0) {
      params.push([restaurantParams.PRICE_RANGE, mappedPrices])
    }
  }

  return params
}
