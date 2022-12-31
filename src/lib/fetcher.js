const TOKEN = process.env.REACT_APP_TOKEN
export { TOKEN }

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
