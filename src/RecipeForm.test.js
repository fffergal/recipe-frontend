import { cloneDeep } from 'lodash'
import { act, fireEvent, render, screen } from '@testing-library/react'

import RecipeForm from './RecipeForm'

test('init used as values', () => {
  render(
    <RecipeForm
      init={
        {
          title: 'Title 1',
          time_minutes: 35,
          price: '5.00',
          ingredients: [{'name': 'Ingredient 1'}],
        }
      }
    />
  )
  expect(screen.getByLabelText('Title').form)
    .toHaveFormValues(
      {
        title: 'Title 1',
        time_minutes: '35',
        price: '5.00',
        ingredient_1: 'Ingredient 1',
      }
    )
})

test('button adds ingredient', async () => {
  render(<RecipeForm init={{ingredients: []}}/>)
  act(() => { screen.getByRole('button', {name: 'Add ingredient'}).click() })
  const textbox = await screen.findByRole('textbox', {name: 'Ingredient 1'})
  textbox.value = 'Beef'
  expect(screen.getByLabelText('Title').form)
    .toHaveFormValues({ ingredient_1: 'Beef'})
})

test('onSave calls with updated data', async () => {
  let updatedData
  const onSave = data => {
    updatedData = cloneDeep(data)
  }
  render(<RecipeForm init={{ingredients: []}} onSave={onSave}/>)
  const title = screen.getByLabelText('Title')
  fireEvent.change(title, {target: {value: 'Title 1'}})
  act(() => {
    screen.getByRole('button', {name: 'Save'}).click()
  })
  await screen.findByText('Saved')
  expect(updatedData).toEqual({title: 'Title 1', ingredients: []})
})
