import { getResource } from './index'

const baseUrl = 'https://0n7fmvtstf.execute-api.eu-west-3.amazonaws.com/dev'

export const getAllFoods = async (
  page,
  search = '',
  caloriesLte = '',
  caloriesGte = '',
  proteinsLte = '',
  proteinsGte = '',
  fatsLte = '',
  fatsGte = '',
  carbohydratesLte = '',
  carbohydratesGte = '',
)=> {
  return await getResource(
    `${baseUrl}/products/?calories__lte=${caloriesLte}&calories__gte=${caloriesGte}&proteins__lte=${proteinsLte}&proteins__gte=${proteinsGte}&fats__lte=${fatsLte}&fats__gte=${fatsGte}&carbohydrates__lte=${carbohydratesLte}&carbohydrates__gte=${carbohydratesGte}&search=${search}&page=${page}&size=30`
  )
}

export const getFood = async ( foodId ) => {
  return await getResource(
    `${baseUrl}/products/${foodId}`
  )
}

export const addFood = async ( body ) => {
  return await getResource(
    `${baseUrl}/products/`,
    'POST',
    body
  )
}