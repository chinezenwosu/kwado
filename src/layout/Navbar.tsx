import React from 'react'
import { Link } from 'react-router-dom'
import { formatString, routes } from '../utils'
import { MenuRounded } from '@mui/icons-material'
import Logo from '../assets/images/logo.svg'
import styles from './Navbar.module.css'
import sideNavStyles from './SideNavbar.module.css'
import { User } from '../types/User'

const authKeys = {
	LOGGED_OUT: 'LOGGED_OUT',
	LOGGED_IN: 'LOGGED_IN',
}

const Navbar = ({ loggedInUser }: { loggedInUser: User | null }) => {
	const sideNavToggleId = 'sideNavToggle'
	const mobileNavToggleId = 'mobileNavToggle'
	const authStatus = loggedInUser ? authKeys.LOGGED_IN : authKeys.LOGGED_OUT
	const name = formatString.getUserFullName(loggedInUser)
	const navMap = {
		[authKeys.LOGGED_IN]: [
			{
				path: '#',
				label: name,
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
		],
	}

	return (
		<>
			<nav className={styles.nav}>
				<div className={styles.navHead}>
					<div className={styles.logoContainer}>
						<a href={routes.getHome()}>
							<img src={Logo} className={styles.logo} />
						</a>
						{loggedInUser && (
							<label
								className={sideNavStyles.sideNavTrigger}
								htmlFor={sideNavToggleId}
							>
								<MenuRounded />
							</label>
						)}
					</div>
					<label htmlFor={mobileNavToggleId}>
						<div className={styles.toggleIcon}>
							<MenuRounded />
						</div>
					</label>
				</div>
				<input
					type="checkbox"
					id={mobileNavToggleId}
					className={styles.menuToggle}
				/>
				<ul className={styles.navLinks}>
					{navMap[authStatus].map((item) => (
						<li key={item.path}>
							<Link to={item.path} className={styles.navLink}>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			{loggedInUser && (
				<input
					id={sideNavToggleId}
					className={sideNavStyles.sideNavCheckbox}
					type="checkbox"
				/>
			)}
		</>
	)
}

export default Navbar
