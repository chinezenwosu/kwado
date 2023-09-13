import { Node } from 'slate'
import { useNavigate } from 'react-router-dom'
import { Button } from "./Components"
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import routes from './utils/routes'
import { config } from './utils/config'
import { useAuth } from './hooks/useAuth'

const Dashboard = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const onClick = async () => {
    const defaultValue: Node[] = [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Dear Diary,'
          }
        ]
      }
    ]

    try {
      const documentRes = await axios.post(`${config.url.api}/kwadocs`, {
        content: defaultValue,
        slug: `${Date.now()}-${uuid()}`,
      }, {
        withCredentials: true,
      })

      navigate(routes.getDiary(documentRes.data.slug))
    }
    catch(e) {
      console.log('Document load error', e)
    }
  }

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

  return (
    <div>
      <Button type="button" onClick={onClick}>
        Write something
      </Button>
      <Button type="button" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}

export default Dashboard
