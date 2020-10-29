import React, {Component} from 'react'
import firebase from './firebase'
import LoginScreen from './components/LoginScreen'
import HomeScreen from './components/HomeScreen'
import RegisterScreen from './components/RegisterScreen'
import Header from './components/Header'

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

class Routes extends Component {

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
            <Route exatc path="/register" component={RegisterScreen}/>
            <Route exact path="/home" component={HomeScreen}/>          
          </Switch>
        </BrowserRouter>
      ) : (
        <h1>Carregando...</h1>
      )
    }
  }
  
  export default Routes;