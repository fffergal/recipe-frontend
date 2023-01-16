import { isEmpty } from 'lodash'

const TOKEN = process.env.REACT_APP_TOKEN

class UpdateError extends Error {
  constructor(message, response) {
    super(message)
    this.response = response
  }
}

const update = async (url, data, {method}) => {
  const res = await fetch(
    url,
    {
      method: method || 'PATCH',
      headers: {
        authorization: `Token ${TOKEN}`,
        'content-type': 'application/json',
      },
      body:JSON.stringify(data),
    }
  )
  if (!res.ok) {
    let response
    let errorMessage
    try {
      response = await res.json()
      errorMessage = response.detail
    } catch (e) {
      errorMessage = e.toString()
    }
    if (!errorMessage) {
      if (response && !isEmpty(response)) {
        errorMessage = 'Check errors for each field.'
      } else {
        errorMessage = `Could not update (${res.status} ${res.statusText}).`
      }
    }
    throw new UpdateError(errorMessage, response)
  }
  return await res.json()
}

export { TOKEN, update }

export default function fetcher(...args) {
  let [url, init] = args
  if (init === undefined) {
    init = {}
  }
  if (init.headers === undefined) {
    init.headers = {}
  }
  init.headers.authorization = `Token ${TOKEN}`
  return fetch(url, init).then(res => res.json())
}
