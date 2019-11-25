import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HealthCheck from './HealthCheck';
import Report from './Report';
import Movie from './Movie';
import Movies from './Movies';

/* Router -> Creates url based navigation functionality, it is a React component. 
  You can create a navigable path by using the Route path attribute.
  If the browser url matches then we can serve the React component we want. */
class App extends Component {
  render(){
    return (
      <Router>
        <Switch>
            <Route path="/healthcheck">
              <HealthCheck />
            </Route>
            <Route path="/movies/:movie_id" component={Movie} />
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/report">
              <Report />
            </Route>
          </Switch>
      </Router>
    );
  }
}

export default App;
