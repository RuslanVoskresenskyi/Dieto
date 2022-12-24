import foodPlug from 'image/food-list/food-plug.svg'

import styles from './FoodItem.module.scss'

const FoodItem = ({ name, image, calories, proteins, fats, carbohydrates, onClick }) => {
  return (
    <div className={styles['food-item']} onClick={onClick}>
      <div className={styles['food-item-img']}>
        {image ? (
          <img className={styles['food-item-img-main']} src={image} alt='food-img'/>
        ) : (
          <img className={styles['food-item-img-plug']} src={foodPlug} alt='food-icon'/>
        )}
      </div>
      <div className={styles['food-item-content']}>
        <p className={styles['food-item-content-name']}>{name}</p>
        <div className={styles['food-item-content-text']}>
          <p className={styles['food-item-content-text-item']}>
            <span>Калорії:</span> {calories}
          </p>
          <p className={styles['food-item-content-text-item']}>
            <span>Білки:</span> {proteins}
          </p>
          <p className={styles['food-item-content-text-item']}>
            <span>Жири:</span> {fats}
          </p>
          <p className={styles['food-item-content-text-item']}>
            <span>Углеводи:</span> {carbohydrates}
          </p>
        </div>
      </div>

    </div>
  )
}

export default FoodItem