import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/login/Login';
import Home from './components/Home';
import axios from 'axios';

function App() {

  useEffect(() => {
    isAuthenticated()
  }, [])

  const isAuthenticated = () => {
    const data = { clientId: "test", clientSecret: "PeY@@Tr1v1@943" }
    const url = `http://stg-api.pedidosya.com/public/v1/tokens?clientId=${data.clientId}&clientSecret=${data.clientSecret}`
    const corsProblem = 'https://cors-anywhere.herokuapp.com/'

    axios.get(corsProblem + url)
      .then(res => {
        if (res.status === 200){
          console.log("res" , res.data.access_token)
          localStorage.setItem('app-token', res.data.access_token)
        }  
      })
      .catch(() => {
        console.log('ERROR')
      })

}

  return (
    <Router>
      <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/home" component={ Home } />
      </Switch>
    </Router>
  );
}

export default App;
