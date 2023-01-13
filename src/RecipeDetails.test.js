import { render, screen } from '@testing-library/react'

import RecipeDetails from './RecipeDetails'

test('renders field terms', () => {
  render(<RecipeDetails recipe={{title: 'Recipe 1', ingredients: []}}/>)
  expect(screen.getAllByRole('term')).toHaveLength(6)
})

test('renders field definitions', () => {
  render(<RecipeDetails recipe={{title: 'Recipe 1', ingredients: []}}/>)
  expect(screen.getAllByRole('definition')).toHaveLength(6)
})

test('handles no ingredients', () => {
  render(<RecipeDetails recipe={{title: 'Recipe 1', ingredients: []}}/>)
  expect(screen.getByText('No ingredients')).toBeInTheDocument()
})

test('renders ingredients', () => {
  render(
    <RecipeDetails
      recipe={{title: 'Recipe 1', ingredients: [{name: 'Ingredient 1'}]}}
    />
  )
  expect(screen.getByText('Ingredient 1')).toBeInTheDocument()
})
