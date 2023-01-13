import { MemoryRouter, Route } from 'react-router-dom'
import { SWRConfig } from 'swr'
import { render, screen } from '@testing-library/react'

import RecipeDetailsPage from './RecipeDetailsPage'

test('render after fetch', async () => {
  const fakeFetcher = () => {
    return {title: 'Title 1', ingredients: []}
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
      <MemoryRouter initialEntries={['/recipes/1']}>
        <Route path="/recipes/:id" render={() => <RecipeDetailsPage/>}/>
      </MemoryRouter>
    </SWRConfig>
  )
  expect(await screen.findByText('Title 1')).toBeInTheDocument()
})
