import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './components/Home';
import Hostings from './components/Hostings';
import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Register';

class App extends Component {
    render() {
      return (
        <Fragment>
          <Nav />
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/hostings" component={Hostings} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </Router>
        </Fragment>
      );
    }
  }
  
  export default App;