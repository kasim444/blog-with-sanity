import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { Posts, Post } from './components'
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path='/:slug'>
            <Post />
          </Route>
          <Route path='/'>
            <Posts />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
