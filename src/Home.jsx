import BackendCheck from './BackendCheck'
import { TOKEN } from './lib/fetcher'

export default function Home() {
  if (TOKEN) {
    return <BackendCheck/>
  } else {
    return <>
      <h2>Setup instructions</h2>
      <p>In another directory, clone <a href="https://github.com/fffergal/recipe-app-api">the backend</a> and follow the instructions in the README for making a user and starting the server.</p>
      <p>In order to connect to the backend you need a token for authorization entered as an environment variable when starting the dev server.</p>
      <p>Go to <a href="http://localhost:8001/api/docs/">http://localhost:8001/api/docs/</a> and scroll down to and select the <code>POST /api/users/token/</code> endpoint. Press the "Try it now" button, enter the same email and password for the newly created user, and press "Execute". Copy just the token value from the JSON response body.</p>
      <p>Stop the dev server if it is still running, then set the REACT_APP_TOKEN environment variable and start the dev server again.</p>
      <p><code>REACT_APP_TOKEN=the-copied-token npm start</code></p>
    </>
  }
}
