import useSWR from 'swr'

import fetcher from './lib/fetcher'

export default function BackendCheck() {
    const  { data, error, isLoading } = useSWR('/api/users/me/', fetcher)
    if (isLoading) {
      return <p>Checking connection to backend...</p>
    } else if (error) {
      return <p>Error when connecting to backend. {error.toString()}</p>
    } else if (!data.email) {
      return <p>Could not connect to backend, invalid token.</p>
    } else {
      return (
        <p>You are connected to the backend as user {data.email}, you can interact with recipes.</p>
      )
    }
}
