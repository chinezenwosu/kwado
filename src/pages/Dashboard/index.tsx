import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { config, routes } from '../../utils'
import Button from '../../components/Button'
import styles from './Dashboard.module.css'

const Diary = () => {
  const navigate = useNavigate()

  const createDiary = async () => {
    const defaultValue = [
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
        slug: `${Date.now()}-${crypto.randomUUID()}`,
      }, {
        withCredentials: true,
      })

      navigate(routes.getDiary(documentRes.data.slug))
    }
    catch(e) {
      console.log('Document load error', e)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <Button label="Create new diary" onClick={() => createDiary()} />
      </div>
    </div>
  )
}

export default Diary
