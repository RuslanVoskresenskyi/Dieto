import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { addFood } from '../../services/FoodService'

import styles from './FoodPopup.module.scss'

const mainData = [
  { label: 'Назва', name: 'name' },
  { label: 'Зображення', name: 'image' },
  { label: 'Калорії', name: 'calories' },
  { label: 'Білки', name: 'proteins' },
  { label: 'Жири', name: 'fats' },
  { label: 'Углеводи', name: 'carbohydrates' },
]

const FoodPopup = ({ setShowPopup }) => {
  const { register, handleSubmit } = useForm()
  const [isDish, setIsDish] = useState(false)
  const [foodComponents, setFoodComponents] = useState([])
  const [componentSize, setComponentSize] = useState(0)

  const onSubmit = data => {
    const components = []

    for (let i = 0; i < componentSize + 1; i++){
      components.push({
        name: data[`component${i}name`],
        calories: data[`component${i}calories`],
        proteins: data[`component${i}proteins`],
        fats: data[`component${i}fats`],
        carbohydrates: data[`component${i}carbohydrates`],
        image: data[`component${i}image`],
        is_dish: false
      })
    }

    const body = JSON.stringify({
      name: data.name,
      is_dish: data.is_dish,
      recipes: data.is_dish ?
        [{
          text: data.text,
          components
        }]
        : [],
      calories: data.calories,
      proteins: data.proteins,
      fats: data.fats,
      carbohydrates: data.carbohydrates,
      image: data.image
    })

    addFood(body).then(data => console.log(data))
  }
  
  const renderFoodComponent = (name) => {
    return (
      <div className={styles['food-popup-item']}>
        {mainData.map((item, index) => (
          <label key={index}>
            {item.label}:
            <input {...register(name + item.name)} />
          </label>
        ))}
      </div>
    )
  }

  return (
    <div className={styles['food-popup-overlay']}>
      <div className={styles['food-popup']}>
        <div className={styles['food-popup-close']} onClick={() => setShowPopup(false)}><span>x</span></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {mainData.map((item, index) => (
            <label key={index}>
              {item.label}:
              <input {...register(item.name)} />
            </label>
          ))}
          <label>
            Це страва:
            <input
              {...register('is_dish')}
              type='checkbox'
              checked={isDish}
              onChange={(e) => {setIsDish(e.target.checked)}}
            />
          </label>
          {isDish && (
            <div  className={styles['food-popup-items']}>
              <label>
                Рецепт:
                <input {...register('text')}/>
              </label>
              {foodComponents.map((item, index) => renderFoodComponent(item))}
              <div
                className={styles['button']}
                onClick={() => {
                  setFoodComponents([...foodComponents, 'component' + foodComponents.length])
                  setComponentSize(foodComponents.length)
                }}
              >
                Додати інгрідієнт
              </div>
            </div>
          )}
          <input type='submit' />
        </form>
      </div>
    </div>
  )
}

export default FoodPopup