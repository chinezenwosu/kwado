import { Node } from 'slate'
import { redirect } from 'react-router-dom'
import { Button } from "./Components"

const Home = () => {
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
      body: JSON.stringify({ content: defaultValue }),
    }

    try {
      const documentRes = await fetch('http://localhost:8000/api/kwadocs', options)
      const document = await documentRes.json()

      console.log('new document ---------------------------', document)
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
