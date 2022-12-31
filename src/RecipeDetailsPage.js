import useSWR from 'swr'
import { useParams } from 'react-router-dom'

import fetcher from './lib/fetcher'
import RecipeDetails from './RecipeDetails'

export default function RecipeDetailsPage() {
  const { id } = useParams()
  const { data, error, isLoading } = useSWR(`/api/recipes/${id}/`, fetcher)
  let content
  if (isLoading) {
    content = <p>Loading recipe...</p>
  } else if (error) {
    content = <p>Error loading recipe. {error.toString()}</p>
  } else if (data.detail) {
    content = <p>Error loading recipe. {data.detail}</p>
  } else {
    content = <RecipeDetails recipe={data}/>
  }
  return (
    <>
      <h2>Recipe details</h2>
      {content}
    </>
  )
}
