import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {TextField, Button } from '@material-ui/core'
import firebase from '../../firebase'
import './Login.css'


class LoginScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            messegeError: '',
        }

        this.entrar = this.entrar.bind(this);
        this.login = this.login.bind(this);
        this.UserNotFound = this.UserNotFound.bind(this);
        this.wrongEmail = this.wrongEmail.bind(this);
        this.wrongPassword = this.wrongPassword.bind(this);
  }

  componentDidMount(){
    //Verificar se tem algum usuario logado!
    if(firebase.getCurrent()){
      return this.props.history.replace('home');
    }
  }
  entrar(e){
    e.preventDefault();
    this.login();
  }

  //metódos para tratamento de erro de login
  UserNotFound = () => {
    let state = this.state
    state.messegeError =  'Usuário não encontrado'
    this.setState(state)
    
  }
  wrongEmail = () => {
    let state = this.state
    state.messegeError =  'E-mail incorreto'
    this.setState(state)
  }
  wrongPassword = () => {
    let state = this.state
    state.messegeError =  'Senha incorreta'
    this.setState(state)
  }

  login = async () => {
    const {email, password} = this.state;

    try{

      await firebase.login(email, password)
      this.props.history.replace('home');
      console.log('logado')

    }catch(error) {
      const errorCode = error.code;
      // const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        this.wrongPassword()
      } else if(errorCode === 'auth/invalid-email') {
        this.wrongEmail()
      } else if(errorCode === 'auth/user-not-found') {
        this.UserNotFound()
      }
    };
  }
    render() {
        return(
            <div>
                <form onSubmit={this.entrar} id="login">
                    <h3>Digite seu E-mail e Senha</h3>
                    <h3 style={{color:'#ff0000'}}>{this.state.messegeError}</h3>
                    <TextField
                        className="form-input"
                        id="filled-primary-email"
                        label="E-mail"
                        type="Email"
                        variant="filled"
                        color="primary"
                        autoComplete="off"
                        value={this.state.email}
                        onChange={(e) => this.setState({email: e.target.value})}
                    />
                    <TextField
                        className="form-input"
                        id="filled-primary-password"
                        label="Senha"
                        type="Password"
                        variant="filled"
                        color="primary"
                        autoComplete="off"
                        value={this.state.password}
                        onChange={(e) => this.setState({password: e.target.value})}
                    />
                    <Button type="submit" > Entrar</Button>
                    
                    <div className="form-links">
                        <Link to="/register">Não possui uma conta? Registrar-se</Link>
                        <Link to="/newPassord">Esqueci minha senha</Link>
                    </div>

                </form>
            </div>
        )
    }
}
export default withRouter(LoginScreen)