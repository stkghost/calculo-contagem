import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import { TextField, Button } from '@material-ui/core'
import './Register.css'
import firebase from '../../firebase'

class RegisterScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            cpf: '',
            name: '',
        }
        this.register = this.register.bind(this);
        this.onRegister = this.onRegister.bind(this);

    }

    register(e){
        e.preventdefault()

        this.onRegister();
    }

    onRegister = async() => {
        try{
            const { name, email, password} = this.state
            
            await firebase.register(name, email, password)
            this.props.history.replace('/home')
        }catch(error){
            alert(error.messege)
        }
    }
    render() {
        return(
            <div>
                <form  id="login" onSubmit={this.register}>
                <h3>Crie sua conta</h3>
                    <TextField
                        className="form-input"
                        type="Name"
                        id="filled-primary"
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
                        id="filled-primary"
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
                    <Button type="submit" > Registra-se</Button>

                    <Link to="/login" className="possui-conta">Já possui uma conta? Entrar</Link>
                </form>
            </div>
        )
    }
}

export default withRouter(RegisterScreen)