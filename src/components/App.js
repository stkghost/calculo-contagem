import React, {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css'
import firebase from '../firebase.js'
import HomeScreen from './HomeScreen'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import PageNewCalc from './PageNewCalc'


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
        <Switch>
          <Route exact path="/login" component={LoginScreen}/>
          <Route exact path="/register" component={RegisterScreen}/>
          <Route exact path="/home" component={HomeScreen}/>   
          <Route exact path="/newCalc" component={PageNewCalc}/>          
        </Switch>
      </BrowserRouter>
    ) : (
      <h1>Carregando...</h1>
    )
  }
}

export default App;
