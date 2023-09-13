import { useEffect, ReactElement } from 'react'
import axios from 'axios'
import { BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom'
import Home from './Home'
import routes from './utils/routes'
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'
import Diary from './Diary'
import { config } from './utils/config'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'
import './App.css'

interface RouteWrapperProps {
  children: ReactElement
}

const App = () => {
  const { user, loginWithUser, isAuthInitialized } = useAuth()
  const routesList = [
    {
      path: routes.getHome(),
      element: <Home />,
      requiresAuth: false,
    },
    {
      path: routes.getLogin(),
      element: <Login />,
      requiresAuth: false,
    },
    {
      path: routes.getSignup(),
      element: <Signup />,
      requiresAuth: false,
    },
    {
      path: routes.getDashboard(),
      element: <Dashboard />,
      requiresAuth: true,
    },
    {
      path: routes.getDiary(':slug'),
      element: <Diary />,
      requiresAuth: true,
    },
  ]

  useEffect(() => {
    if (isAuthInitialized && !user) {
      axios.get(`${config.url.api}/users/session`, { withCredentials: true })
        .then(({ data }) => {
          if (data.isLoggedIn) {
            loginWithUser(data.user)
          }
        })
    }
  }, [isAuthInitialized])

  if (!isAuthInitialized) return null

  const ProtectedRoute: React.FC<RouteWrapperProps> = ({ children }) => {
    const location = useLocation()

    if (!user) {
      return <Navigate to={routes.getLogin()} replace state={{ from: location }} />
    }
  
    return children
  }

  const PublicRoute: React.FC<RouteWrapperProps> = ({ children }) => {
    const location = useLocation()

    if (user) {
      return <Navigate to={routes.getDashboard()} replace state={{ from: location }} />
    }
  
    return children
  }

  let nav = (
    <ul>
      <li>
        <Link to={routes.getHome()}>Home</Link>
      </li>
    </ul>
  )

  if (user) {
    nav = (
      <ul>
        <li>
          <Link to={routes.getDashboard()}>Dashboard</Link>
        </li>
      </ul>
    )
  }

  return (
    <AuthContext.Provider value={{ user, setUser: () => null }}>
      <Router>
        <div>
          { nav }
          <Routes>
            {
              routesList.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    route.requiresAuth ? (
                      <ProtectedRoute>
                        { route.element }
                      </ProtectedRoute>
                    ) : (
                      <PublicRoute>
                        { route.element }
                      </PublicRoute>
                    )
                  }
                />
              ))
            }
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
