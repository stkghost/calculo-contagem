import React, {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css'
import firebase from '../firebase.js'
import Homescreen from './Homescreen'
import Loginscreen from './LoginScreen'
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
          <Route exact path="/" component={Homescreen}/>
          <Route exact path="/" component={Loginscreen}/>

        </Switch>
      </BrowserRouter>
    ) : (
      <h1>Carregando...</h1>
    )
  }
}

export default App;
