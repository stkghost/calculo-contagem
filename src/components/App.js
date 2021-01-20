import React, {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css'
import firebase from '../firebase.js'
import HomeScreen from './HomeScreen'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import PageNewCalc from './PageNewCalc'
import Calculos from './Calculos'
import Resultado from './Resultado'
import EditarCalculo from './EditarCalculo'

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
          <Route path="/register" component={RegisterScreen}/>
          <Route path="/home" component={HomeScreen}/>   
          <Route path="/newCalc" component={PageNewCalc}/>
          <Route path="/calculos" component={Calculos}/>   
          <Route path="/resultado" component={Resultado}/>  
          <Route path="/editar/:clienteId" render={(props) => <EditarCalculo/>}/>          
        </Switch>
      </BrowserRouter>
    ) : (
      <h1>Carregando...</h1>
    )
  }
}

export default App;
