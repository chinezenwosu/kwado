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
      icon: <GridView />,
    },
    {
      path: '#',
      label: 'Notes',
      icon: <SubjectRounded />,
    },
    {
      path: routes.getLogout(),
      label: 'Log out',
      icon: <LogoutOutlined />,
    },
  ]

  return (
    <div className={styles.sideNav}>
      <ul className={styles.sideNavLinks}>
        {
          navLinks.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className={styles.navLink}>
                <span className={styles.sideMenuIcon}>
                  {item.icon}
                </span>
                <span className={styles.sideMenuLink}>{item.label}</span>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default SideNavbar
