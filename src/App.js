import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Starred from './pages/Starred';
import Home from './pages/Home';


function App() {
  return (
    <Switch>

      <Route exact path="/"><Home /></Route>

      <Route exact path="/starred"><Starred /></Route>

      <Route>
        This is a 404 page
      </Route>
    </Switch>
  );
}

export default App;
