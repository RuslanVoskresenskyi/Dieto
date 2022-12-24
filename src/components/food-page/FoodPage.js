import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FoodItem } from 'components'

import foodPlug from 'image/food-list/food-plug.svg'

import { getFood } from '../../services/FoodService'

import styles from './FoodPage.module.scss'

const FoodPage = () => {
  const { foodId } = useParams()
  const [foodDate, setFoodDate] = useState(null)

  const navigator = useNavigate()
  
  useEffect(() => {
    getFood(foodId).then((data) => {
      setFoodDate(data)
    })
  }, [foodId])

  if (!foodDate) return <div>Oops....</div>
  return (
    <div className={styles['food-page']}>
      <div className={styles['food-page-content']}>
        <div className={styles['food-page-content-img']}>
          {foodDate.image ? (
            <img className={styles['food-page-content-img-main']} src={foodDate.image} alt='food-img'/>
          ) : (
            <img className={styles['food-page-content-img-plug']} src={foodPlug} alt='food-icon'/>
          )}
        </div>
        <div className={styles['food-page-content-block']}>
          <p className={styles['food-page-content-block-name']}>{foodDate.name}</p>
          <div className={styles['food-page-content-block-text']}>
            <p className={styles['food-page-content-block-text-item']}>
              <span>Калорії:</span> {foodDate.calories}
            </p>
            <p className={styles['food-page-content-block-text-item']}>
              <span>Білки:</span> {foodDate.proteins}
            </p>
            <p className={styles['food-page-content-block-text-item']}>
              <span>Жири:</span> {foodDate.fats}
            </p>
            <p className={styles['food-page-content-block-text-item']}>
              <span>Углеводи:</span> {foodDate.carbohydrates}
            </p>
          </div>
        </div>
      </div>
      {foodDate.is_dish ? (
        <>
          <p className={styles['food-page-content-description']} dangerouslySetInnerHTML={{ __html: foodDate.recipes[0].text }}/>
          <h3 className={styles['food-page-components-title']}>Інгрідієнти</h3>
          <div className={styles['food-page-components']}>
            {foodDate.recipes[0].components.map((item, index) => (
              <FoodItem
                key={index}
                name={item.name}
                image={item.image}
                calories={item.calories}
                proteins={item.proteins}
                fats={item.fats}
                carbohydrates={item.carbohydrates}
                onClick={() => {navigator(`/${item.id}`)}}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}

export default FoodPage