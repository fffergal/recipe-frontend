import { render, screen } from '@testing-library/react';

import FieldErrors from './FieldErrors'

test('renders nothing if no errors', () => {
  render(<div role="tree"><FieldErrors/></div>)
  expect(screen.getByRole('tree')).toBeEmptyDOMElement()
})

test('renders one error', () => {
  render(<div role="tree"><FieldErrors errors={["Error 1."]}/></div>)
  expect(screen.getByRole('tree')).toHaveTextContent('Error 1.')
})

test('renders all errors', () => {
  render(
    <div role="tree"><FieldErrors errors={['Error 1.', 'Error 2.']}/></div>
  )
  expect(screen.getByRole('tree'))
    .toHaveTextContent('Error 1. Error 2.')
})

test('uses error styling', () => {
  render(
    <div role="tree"><FieldErrors errors={['Error 1.']}/></div>
  )
  expect(screen.getByText('Error 1.')).toHaveClass('error')
})
