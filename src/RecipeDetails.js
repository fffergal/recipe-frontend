export default function RecipeDetails({ recipe }) {
  return (
    <dl>
      <dt>Title</dt>
      <dd>{recipe.title}</dd>
      <dt>Time</dt>
      <dd>{recipe.time_minutes} minutes</dd>
      <dt>Price</dt>
      <dd>{recipe.price}</dd>
      <dt>Link</dt>
      <dd>{recipe.link || "No link"}</dd>
      <dt>Ingredients</dt>
      <dd>{
        recipe.ingredients.length > 0 ? (
          <ul>
            {
              recipe.ingredients.map(
                ingredient => <li>{ingredient.name}</li>
              )
            }
          </ul>
        ) : "No igredients"
      }</dd>
      <dt>Description</dt>
      <dd>{recipe.description || "No description"}</dd>
    </dl>
  )
}
