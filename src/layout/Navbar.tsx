import { Link } from 'react-router-dom'
import { routes } from '../utils'
import Logo from '../assets/images/logo.svg'
import styles from './Navbar.module.css'

const authKeys = {
  LOGGED_OUT: 'LOGGED_OUT',
  LOGGED_IN: 'LOGGED_IN',
}

const Navbar = ({ isLoggedIn }: { isLoggedIn: Boolean }) => {
  const authStatus = isLoggedIn ? authKeys.LOGGED_IN : authKeys.LOGGED_OUT
  const navMap = {
    [authKeys.LOGGED_IN]: [
      {
        path: routes.getDashboard(),
        label: 'Dashboard',
      },
      {
        path: routes.getLogout(),
        label: 'Log out',
      },
    ],
    [authKeys.LOGGED_OUT]: [
      {
        path: routes.getLogin(),
        label: 'Log in',
      },
      {
        path: routes.getSignup(),
        label: 'Sign up',
      },
    ]
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.navHead}>
        <div className={styles.logoContainer}>
          <a href={routes.getHome()}>
            <img src={Logo} className={styles.logo} />
          </a>
        </div>
        <label htmlFor="menu-toggle">
          <div className={styles.toggleIcon}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </label>
      </div>
      <input type="checkbox" id="menu-toggle" className={styles.menuToggle} />
      <ul className={styles.navLinks}>
        {
          navMap[authStatus].map((item) => (
            <li key={item.path}>
              <Link to={item.path} className={styles.navLink}>{item.label}</Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Navbar
