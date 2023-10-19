import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../utils'
import { LogoutOutlined, GridView, SubjectRounded } from '@mui/icons-material'
import styles from './SideNavbar.module.css'

const SideNavbar = () => {
  const navLinks = [
    {
      path: routes.getDashboard(),
      label: 'Dashboard',
      Icon: GridView,
    },
    {
      path: '#',
      label: 'Notes',
      Icon: SubjectRounded,
    },
    {
      path: routes.getLogout(),
      label: 'Log out',
      Icon: LogoutOutlined,
    },
  ]

  return (
    <div className={styles.sideNav}>
      <ul className={styles.sideNavLinks}>
        {
          navLinks.map((item) => {
            let linkClass = styles.sideMenuLink
            if (item.path === window.location.pathname) {
              linkClass += ` ${styles.active}`
            }

            return (
              <li key={item.path}>
                <Link to={item.path} className={linkClass}>
                  <span className={styles.sideMenuIcon}>
                    <item.Icon />
                  </span>
                  <span className={styles.sideMenuLabel}>{item.label}</span>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default SideNavbar
