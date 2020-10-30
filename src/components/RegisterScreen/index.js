import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import { TextField, Button } from '@material-ui/core'
import './Register.css'
import firebase from '../../firebase'
import {validate} from 'gerador-validador-cpf';

class RegisterScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            cpf: '',
            name: '',
            messegeError: '',
        }
        this.register = this.register.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.EmailAlreadyExist = this.EmailAlreadyExist.bind(this);
        this.InternalError = this.InternalError.bind(this);
        this.InvalidPassword = this.InvalidPassword.bind(this);
        this.validateCpf = this.validateCpf.bind(this)
        this.InvalidName = this.InvalidName.bind(this)
    }

    componentDidMount(){
        //Verificar se tem algum usuario logado!
        if(firebase.getCurrent()){
          return this.props.history.replace('home');
        }
      }

    validateCpf = () => {
        let state = this.state
        let isValid = validate(state.cpf)
        if (isValid !== true){
            state.messegeError = "CPF inválido"
            this.setState(state)
            console.log("CPF Invalido")
        }
    }

    register(e){
        e.preventDefault()
        this.onRegister();
    }
    InvalidName = () => {
        let state = this.state
        state.messegeError = 'Preencha seu nome'
        this.setState(state)
    }

    EmailAlreadyExist = () => {
        let state = this.state
        state.messegeError =  'E-mail já está cadastrado'
        this.setState(state)
      }
      InternalError = () => {
        let state = this.state
        state.messegeError =  'Erro!'
        this.setState(state)
      }
      InvalidPassword = () => {
        let state = this.state
        state.messegeError =  'Senha precisa conter no mínimo 6 caracteres'
        this.setState(state)
      }

    onRegister = async () => {
        const { name, email, password, cpf} = this.state
        try{
            
            await firebase.register(name, email, password, cpf)
            this.props.history.replace('home')
            console.log("Registrado")

        }catch(error) {
            const errorCode = error.code;
            // const errorMessage = error.message;

            
          if (errorCode === 'auth/weak-password') {
            this.InvalidPassword()
            setTimeout(this.InvalidPassword(), 3000)
          } else if(errorCode === 'auth/email-already-in-use') {
            this.EmailAlreadyExist()
          } else if (this.state.cpf){
            this.validateCpf()
          } else if (this.state.name === '') {
            this.InvalidName()
            setTimeout(this.InvalidName, 3000)
          } else if(errorCode === 'auth/internal-error') {
            this.InternalError()
          } 
        };
    }
    render() {
        return(
            <div>
                <form  id="login" onSubmit={this.register}>
                <h3>Crie sua conta</h3>
                    <h3 style={{color: '#ff0000'}}>{this.state.messegeError}</h3>
                    <TextField
                        className="form-input"
                        type="Name"
                        id="filled-primary-name"
                        label="Nome Completo"
                        variant="filled"
                        color="primary"
                        autoFocus
                        autoComplete="off"
                        value={this.state.name}
                        onChange={(e) => this.setState({name: e.target.value})}
                    />
                    <TextField
                        className="form-input"
                        id="filled-primary-cpf"
                        label="CPF"
                        type="Number"
                        variant="filled"
                        color="primary"
                        autoComplete="off"
                        value={this.state.cpf}
                        onChange={(e) => this.setState({cpf: e.target.value})}
                    />
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
                    <Button type="submit" > Registrar-se</Button>

                    <Link to="/login" className="possui-conta">Já possui uma conta? Entrar</Link>
                </form>
            </div>
        )
    }
}

export default withRouter(RegisterScreen)