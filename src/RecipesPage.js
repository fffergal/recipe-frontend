import useSWR from 'swr'
import { Link } from 'react-router-dom'

import fetcher from './lib/fetcher'

export default function RecipesPage() {
  const { data, error, isLoading } = useSWR('/api/recipes/', fetcher)
  let content
  if (isLoading) {
    content = <p>Loading recipes...</p>
  } else if (error) {
    content = <p>Error loading recipes. {error.toString()}</p>
  } else if (data.details) {
    content = <p>Error loading recipes. {data.details}</p>
  } else if (data.length === 0) {
    content = <p>No recipes yet.</p>
  } else {
    content = (
      <ul>
        {data.map(recipe => (
          <li><Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link></li>
        ))}
      </ul>
    )
  }
  return (
    <>
      <h2>Recipes</h2>
      {content}
      <Link to="/recipes/create"><button>Create new recipe</button></Link>
    </>
  )
}
