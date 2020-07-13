import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/login/Login';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/home" component={ Home } />
          <Route path="/home" component={ Home } />
      </Switch>
    </Router>
  );
}

export default App;
