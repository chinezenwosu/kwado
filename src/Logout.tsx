import { useEffect } from 'react'
import axios from 'axios'
import { useAuth } from './hooks/useAuth'
import { config } from './utils'

const Login = () => {
  const { logout } = useAuth()
  
  const handleLogout = async () => {
    try {
      await axios.post(`${config.url.api}/users/logout`, {}, { withCredentials: true })
      logout()
      window.location.reload()
    }
    catch(e) {
      console.log('Logout error', e)
    }
  }

  useEffect(() => {
    handleLogout()
  }, [])

  return (
    <div>
      Logging out
    </div>
  )
}

export default Login
