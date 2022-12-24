import logo from 'image/header/logo.png'

import { useNavigate } from 'react-router-dom'

import styles from './Header.module.scss'

const Header = () => {

  return (
    <div className={styles.header}>
      <a href='/'>
        <img src={logo} alt='logo'/>
        <h3>Dieto</h3>
      </a>
    </div>
  )
}

export default Header