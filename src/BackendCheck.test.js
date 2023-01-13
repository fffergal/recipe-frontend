import { SWRConfig } from 'swr'
import { render, screen } from '@testing-library/react'

import BackendCheck from './BackendCheck'

test('connected', async () => {
  const fakeFetcher = () => {
    return {email: 'admin@example.com'}
  }
  const middleware = useSWRNext => {
    return (key, fetcher, config) => {
      const swr = useSWRNext(key, fakeFetcher, config)
      return swr
    }
  }
  const options = {use: [middleware], provider: () => new Map()}
  render(
    <SWRConfig value={options}>
      <BackendCheck/>
    </SWRConfig>
  )
  expect(await screen.findByText(/admin@example.com/)).toBeInTheDocument()
})

test('connection errors', async () => {
  const fakeFetcher = () => {
    throw new Error('Big error.')
  }
  const middleware = useSWRNext => {
    return (key, fetcher, config) => {
      const swr = useSWRNext(key, fakeFetcher, config)
      return swr
    }
  }
  const options = {use: [middleware], provider: () => new Map()}
  render(
    <SWRConfig value={options}>
      <BackendCheck/>
    </SWRConfig>
  )
  const findError = screen.findByText(
    'Error when connecting to backend. Error: Big error.'
  )
  expect(await findError).toBeInTheDocument()
})
