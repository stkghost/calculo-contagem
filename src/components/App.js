import React, {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css'
import firebase from '../firebase'
import HomeScreen from './HomeScreen'
import LoginScreen from './LoginScreen'
import Header from './Header'
import RegisterScreen from './RegisterScreen'


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
          <Route exact path="/login" component={LoginScreen}/>
          <Route  path="/register" component={RegisterScreen}/>
          <Route  path="/home" component={HomeScreen}/>          
        </Switch>
      </BrowserRouter>
    ) : (
      <h1>Carregando...</h1>
    )
  }
}

export default App;
