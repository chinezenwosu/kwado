import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'
import Navbar from './layout/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Signup from './pages/Signup'
import Diary from './pages/Diary'
import Dashboard from './pages/Dashboard'
import { config, routes } from './utils'
import { useAuth } from './hooks/useAuth'
import { AuthContext } from './context/AuthContext'
import './App.css'

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
      path: routes.getLogout(),
      element: <Logout />,
      requiresAuth: true,
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

  const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
    const location = useLocation()

    if (!user) {
      return <Navigate to={routes.getLogin()} replace state={{ from: location }} />
    }
  
    return children
  }

  const PublicRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
    const location = useLocation()

    if (user) {
      return <Navigate to={routes.getDashboard()} replace state={{ from: location }} />
    }
  
    return children
  }

  return (
    <AuthContext.Provider value={{ user, setUser: () => null }}>
      <Router>
        <Navbar isLoggedIn={!!user} />
        <main className="main">
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
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
