import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom'

import Home from './Home'
import RecipeDetailsPage from './RecipeDetailsPage'
import RecipeCreatePage from './RecipeCreatePage'
import RecipeDeletePage from './RecipeDeletePage'
import RecipeEditPage from './RecipeEditPage'
import RecipesPage from './RecipesPage'

function App() {
  return (
    <Router forceRefresh={true}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/recipes">Recipes</Link></li>
      </ul>
      <Switch>
        <Route path="/recipes/create">
          <RecipeCreatePage/>
        </Route>
        <Route path="/recipes/:id/delete">
          <RecipeDeletePage/>
        </Route>
        <Route path="/recipes/:id/edit">
          <RecipeEditPage/>
        </Route>
        <Route path="/recipes/:id">
          <RecipeDetailsPage/>
        </Route>
        <Route path="/recipes">
          <RecipesPage/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
