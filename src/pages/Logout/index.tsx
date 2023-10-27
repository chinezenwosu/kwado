import { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'

const Login = () => {
  const { logout } = useAuth()

  const handleLogout = async () => {
    const { error } = await logout()

    if (error) {
      console.log('Logout error', error)
    } else {
      window.location.reload()
    }
  }

  useEffect(() => {
    handleLogout()
  }, [])

  return <div>Logging out</div>
}

export default Login
