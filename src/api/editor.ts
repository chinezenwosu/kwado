import fetch, { Response } from '../lib/fetch'

const createDiary = async() => {
  let response: Response = {}
  const defaultEditorValue = {}
  const defaultHtmlValue = '<p></p>'

  try {
    const documentRes = await fetch.post('kwadocs', {
      content: defaultEditorValue,
      html: defaultHtmlValue,
      slug: `${Date.now()}-${crypto.randomUUID()}`,
    })

    response.data = documentRes.data

    return response
  }
  catch(e) {
    return { error: e }
  }
}

const getDiaries = async() => {
  let response: Response = {}

  try {
    const documentRes = await fetch.get('kwadocs')

    response.data = documentRes.data
    return response
  }
  catch(e) {
    return { error: e }
  }
}

export { createDiary, getDiaries }
