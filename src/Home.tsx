import { Node } from 'slate'
import { useNavigate } from 'react-router-dom'
import { Button } from "./Components"
import { v4 as uuid } from 'uuid'
import routes from './utils/routes'

const Home = () => {
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

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: defaultValue,
        slug: `${Date.now()}-${uuid()}`
      }),
    }

    try {
      const documentRes = await fetch('http://localhost:8000/api/kwadocs', options)
      const document = await documentRes.json()

      navigate(routes.getDiary(document.slug))
    }
    catch(e) {
      console.log('Document load error', e)
    }
  }

  return (
    <div>
      <Button type="button" onClick={onClick}>
        Write something
      </Button>
    </div>
  )
}

export default Home;
