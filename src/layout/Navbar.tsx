import { Link } from "react-router-dom"
import { routes } from "../utils"

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
    <ul>
      {
        navMap[authStatus].map((item) => (
          <li key={item.path}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))
      }
    </ul>
  )
}

export default Navbar
