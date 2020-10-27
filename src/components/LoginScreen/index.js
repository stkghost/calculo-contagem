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
            password: ''
        }

        this.entrar = this.entrar.bind(this);
        this.login = this.login.bind(this);
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

  login = async () => {
    const {email, password} = this.state;

    try{

      await firebase.login(email, password)
      .catch((error)=>{
        if(error.code === 'auth/user-not-found'){
          alert('Este usuario não existe!');
        }else{
          alert('Codigo de erro:' + error.code);
          return null;
        }
      });
      this.props.history.replace('/home');

    }catch(error){
      alert(error.message);
    }

  }

    render() {
        return(
            <div>
                <form onSubmit={this.entrar} id="login">
                    <h3>Digite seu E-mail e Senha</h3>
                    <TextField
                        className="form-input"
                        id="filled-primary"
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
                        id="filled-primary"
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