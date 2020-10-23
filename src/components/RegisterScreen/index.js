import React, {Component} from 'react'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import './Register.css'

export default class RegisterScreen extends Component{
    
    render() {
        return(
            <div>
                
                <form  id="login">
                <h3>Digite seus dados para registrar-se</h3>
                    <TextField
                        className="form-input"
                        id="filled-primary"
                        label="Nome Completo"
                        variant="filled"
                        color="primary"
                    />
                    <TextField
                        className="form-input"
                        id="filled-primary"
                        label="CPF"
                        variant="filled"
                        color="primary"
                    />
                    <TextField
                        className="form-input"
                        id="filled-primary"
                        label="E-mail"
                        type="Email"
                        variant="filled"
                        color="primary"
                    />
                    <TextField
                        className="form-input"
                        id="filled-primary"
                        label="Senha"
                        type="Password"
                        variant="filled"
                        color="primary"
                    />
                    <Button type="submit"> Registra-se</Button>

                </form>
            </div>
        )
    }
}