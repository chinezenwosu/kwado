import React from 'react'
import { Link, useLocation, useMatch } from 'react-router-dom'
import { routes } from '../utils'
import { LogoutOutlined, GridView, SubjectRounded } from '@mui/icons-material'
import { User } from '../types/User'
import styles from './SideNavbar.module.css'

const SideNavbar = ({ loggedInUser }: { loggedInUser: User | null }) => {
  if (!loggedInUser) return null

  const location = useLocation()
  const navLinks = [
    {
      path: routes.getDashboard(),
      label: 'Dashboard',
      Icon: GridView,
    },
    {
      path: routes.getDiaries(),
      match: routes.getDiary('*'),
      label: 'Diaries',
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
        {navLinks.map((item) => {
          let linkClass = styles.sideMenuLink
          const match = useMatch(item.match || item.path)

          if (match?.pathname === location.pathname) {
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
        })}
      </ul>
    </div>
  )
}

export default SideNavbar
