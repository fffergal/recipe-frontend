import { useState } from 'react'
import { Redirect } from 'react-router-dom'

import RecipeForm from './RecipeForm'
import { update } from './lib/fetcher'

export default function RecipeCreatePage() {
  const [newId, setNewId] = useState(null)
  const onSave = async data => {
    const response = await update('/api/recipes/', data, {method: 'POST'})
    if (response.id) {
      setNewId(response.id)
    }
  }
  let content
  if (newId) {
    content = <Redirect to={`/recipes/${newId}`}/>
  } else {
    content = (
      <>
        <h2>Create recipe</h2>
        <RecipeForm init={{ingredients: []}} onSave={onSave}/>
      </>
    )
  }
  return content
}
