import { Header } from 'components'

import vectorFruits from 'image/wrapper/vector-fruits.jpg'

import styles from './Wrapper.module.scss'

const Wrapper = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <img className={styles['wrapper-back']} src={vectorFruits} alt='vector-fruits'/>
      <Header/>
      <div className='container'>
        <div className={styles['wrapper-main']}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Wrapper