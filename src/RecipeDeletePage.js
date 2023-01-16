import { useState } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom'
import useSWR from 'swr'

import fetcher, { update } from './lib/fetcher'
import RecipeDetails from './RecipeDetails'

export default function RecipeDeletePage() {
  const { id } = useParams()
  const { data, error, isLoading } = useSWR(`/api/recipes/${id}/`, fetcher)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const [deleted, setDeleted] = useState(false)
  const doDelete = async evt => {
    setDeleting(true)
    try {
      await update(`/api/recipes/${id}/`, '', {method: 'DELETE'})
    } catch (e) {
      setDeleteError(e.toString())
      setDeleting(false)
    }
    setDeleted(true)
  }
  let deleteErrorMessage
  if (deleteError) {
    deleteErrorMessage = <p><span className="error">{deleteError}</span></p>
  }
  let content
  if (deleted) {
    content = <Redirect to="/recipes"/>
  } else if (isLoading) {
    content = <p>Loading recipe...</p>
  } else if (error) {
    content = <p>Error loading recipe. {error.toString()}</p>
  } else if (data.detail) {
    content = <p>Error loading recipe. {data.detail}</p>
  } else {
    content = (
      <>
        {deleteErrorMessage}
        <p>Are you sure you want to delete this recipe?</p>
        <p>
          <button onClick={doDelete} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </p>
        <p><Link to={`/recipes/${id}`}>Go back</Link></p>
        <RecipeDetails recipe={data}/>
      </>
    )
  }
  return (
    <>
      <h2>Delete recipe</h2>
      {content}
    </>
  )
}
