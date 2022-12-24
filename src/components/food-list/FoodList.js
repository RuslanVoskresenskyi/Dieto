import { useEffect, useState } from 'react'
import { FoodItem, FoodPopup } from 'components'
import { useNavigate } from 'react-router-dom'

import { getAllFoods } from '../../services/FoodService'
import { useDebounce } from '../../hooks/useDebounce'

import styles from './FoodList.module.scss'

const FoodList = () => {
  const [foodDate, setFoodDate] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [search, setSearch] = useState('')
  const [caloriesLte, setCaloriesLte] = useState('')
  const [caloriesGte, setCaloriesGte] = useState('')
  const [proteinsLte, setProteinsLte] = useState('')
  const [proteinsGte, setProteinsGte] = useState('')
  const [fatsLte, setFatsLte] = useState('')
  const [fatsGte, setFatsGte] = useState('')
  const [carbohydratesLte, setCarbohydratesLte] = useState('')
  const [carbohydratesGte, setCarbohydratesGte] = useState('')

  const debounceSearch = useDebounce(search, 500)
  const debounceCaloriesLte = useDebounce(caloriesLte, 500)
  const debounceCaloriesGte = useDebounce(caloriesGte, 500)
  const debounceProteinsLte = useDebounce(proteinsLte, 500)
  const debounceProteinsGte = useDebounce(proteinsGte, 500)
  const debounceFatsLte = useDebounce(fatsLte, 500)
  const debounceFatsGte = useDebounce(fatsGte, 500)
  const debounceCarbohydratesLte = useDebounce(carbohydratesLte, 500)
  const debounceCarbohydratesGte = useDebounce(carbohydratesGte, 500)

  const navigator = useNavigate()

  useEffect(() => {
    getAllFoods(
      1,
      debounceSearch,
      debounceCaloriesLte,
      debounceCaloriesGte,
      debounceProteinsLte,
      debounceProteinsGte,
      debounceFatsLte,
      debounceFatsGte,
      debounceCarbohydratesLte,
      debounceCarbohydratesGte
    ).then((data) => {
      setFoodDate(data.items)
    })
  }, [debounceSearch, debounceCaloriesLte, debounceCaloriesGte, debounceProteinsLte, debounceProteinsGte, debounceFatsLte, debounceFatsGte, debounceCarbohydratesLte, debounceCarbohydratesGte])

  return (
    <>
      {showPopup && <FoodPopup setShowPopup={setShowPopup}/>}
      <div className={styles['food-list-top']}>
        <div className={styles['food-list-filters']}>
          <div className={styles['food-list-filters-item']}>
            <label>Назва</label>
            <div>
              <input type='text' placeholder='Назва' value={search} onChange={(e) => {
                setSearch(e.target.value)
              }}/>
            </div>
          </div>
          <div className={styles['food-list-filters-item']}>
            <label>Калорії</label>
            <div>
              <input type='text' placeholder='від' value={caloriesGte} onChange={(e) => {
                setCaloriesGte(e.target.value)
              }}/>
              <input type='text' placeholder='до' value={caloriesLte} onChange={(e) => {
                setCaloriesLte(e.target.value)
              }}/>
            </div>
          </div>
          <div className={styles['food-list-filters-item']}>
            <label>Білки</label>
            <div>
              <input type='text' placeholder='від' value={proteinsGte} onChange={(e) => {
                setProteinsGte(e.target.value)
              }}/>
              <input type='text' placeholder='до' value={proteinsLte} onChange={(e) => {
                setProteinsLte(e.target.value)
              }}/>
            </div>
          </div>
          <div className={styles['food-list-filters-item']}>
            <label>Жири</label>
            <div>
              <input type='text' placeholder='від' value={fatsGte} onChange={(e) => {
                setFatsGte(e.target.value)
              }}/>
              <input type='text' placeholder='до' value={fatsLte} onChange={(e) => {
                setFatsLte(e.target.value)
              }}/>
            </div>
          </div>
          <div className={styles['food-list-filters-item']}>
            <label>Углеводи</label>
            <div>
              <input type='text' placeholder='від' value={carbohydratesGte} onChange={(e) => {
                setCarbohydratesGte(e.target.value)
              }}/>
              <input type='text' placeholder='до' value={carbohydratesLte} onChange={(e) => {
                setCarbohydratesLte(e.target.value)
              }}/>
            </div>
          </div>
        </div>
        <button onClick={() => setShowPopup(true)}>Додати страву</button>
      </div>
      <div className={styles['food-list']}>
        {foodDate ? (
          foodDate.map((item, index) => (
            <FoodItem
              key={index}
              name={item.name}
              image={item.image}
              calories={item.calories}
              proteins={item.proteins}
              fats={item.fats}
              carbohydrates={item.carbohydrates}
              onClick={() => {
                navigator(`/${item.id}`)
              }}
            />
          ))
        ) : (
          <p>Foods don`t found</p>
        )}
      </div>
    </>
  )
}

export default FoodList