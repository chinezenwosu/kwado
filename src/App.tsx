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
import Client from './Client'
import routes from './utils/routes'
import Login from './Login'
import Signup from './Signup'
import { config } from './utils/config'
import Dashboard from './Dashboard'
import './App.css'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'
interface RouteWrapperProps {
  children: ReactElement
}

const App = () => {
  const { user, loginWithUser, isAuthInitialized } = useAuth()

  const ProtectedRoute: React.FC<RouteWrapperProps> = ({ children }) => {
    const location = useLocation()

    if (isAuthInitialized && !user) {
      return <Navigate to={routes.getLogin()} replace state={{ from: location }} />
    }
  
    return children
  }

  const PublicRoute: React.FC<RouteWrapperProps> = ({ children }) => {
    const location = useLocation()

    if (isAuthInitialized && user) {
      return <Navigate to={routes.getDashboard()} replace state={{ from: location }} />
    }
  
    return children
  }

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

  return (
    <AuthContext.Provider value={{ user, setUser: () => null }}>
      <Router>
        <div>
          <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
          </ul>
          <Routes>
            <Route
              path={routes.getHome()}
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              }
            />
            <Route
              path={routes.getLogin()}
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path={routes.getSignup()}
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path={routes.getDashboard()}
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path={routes.getDiary(':slug')}
              element={
                <ProtectedRoute>
                  <Client />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App