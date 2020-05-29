import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// import { Provider } from 'react-redux'

import HomePage from './HomePage'

// import configureStore from '../configureStore'
// const store = configureStore();

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => ("Home!")} />
          <Route path="/home" render={() => <HomePage tagline="Welcome Home!"/>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App