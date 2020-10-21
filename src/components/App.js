import React, {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import firebase from '../firebase.js'
import LoginScreen from './LoginPage'
import Header from './Header'
class App extends Component {

  state = {
    firebaseInitialized: false
  }

  componentDidMount() {
    firebase.isInitialized().then(resultado => {

      //devolve o usuário
      this.setState({firebaseInitialized: resultado})
    })
  }
  render(){
    return this.state.firebaseInitialized !== false ? (
      <BrowserRouter>
        <Header/>
        <Switch>
        <Route exact path="/" component={LoginScreen}/>
        </Switch>
      </BrowserRouter>
    ) : (
      <h1>Carregando...</h1>
    )
  }
}

export default App;
