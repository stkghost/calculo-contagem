import React, {Component} from 'react'
import Header from '../Header'
import firebase from '../../firebase'
import './Calculos.css'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit'
import {IconButton} from '@material-ui/core'

export default class Calculos extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: localStorage.name,
            userCpf: localStorage.userCpf,
            renderList: [],
            isOpen: false,
            clienteNome: localStorage.clienteNome,
            clienteCpf: localStorage.clienteCpf,
        }
    }

        async componentDidMount () {
                
        firebase.getUserName((info) => {
            localStorage.name = info.val().name
            localStorage.userCpf = info.val().cpf
            this.setState({name: localStorage.name, userCpf: localStorage.userCpf})
        })
        console.log(this.state.userCpf)
        //Verificar se tem algum usuario logado!
        if(!firebase.getCurrent()){
            this.props.history.replace('/login');
            return null;
        }

        let state = this.state
        await Axios.post('http://localhost:3001/api/get/clientes', {
            userCpf: state.userCpf,
        }) 
        .then ((response)  => {
            console.log(response)
            const datas = {renderList: response.data}
            this.setState(datas)
        })
    }
    render() {
        return(
            <div>
                <Header />
                    <h3>Olá {this.state.name}</h3>
                    <h3>{this.state.userCpf}</h3>

                {this.state.renderList.map((value, key) => {
                    return (
                   <div className="show-container"> 
                        <h3>{value.clienteNome}</h3>
                        <h3>--------------------{value.clienteId}</h3>
                        <IconButton   onClick={() => {this.props.history.replace(`/editar/${value.clienteId}`)}}>
                            <EditIcon/>
                        </IconButton>
                        <Link className='finalizar-button'color="primary" to="/resultado">Finalizar</Link>     
                    </div>
                )})} 
            </div>
        )
    }
}