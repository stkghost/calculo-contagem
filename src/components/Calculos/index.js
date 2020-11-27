import React, {Component} from 'react'
import Header from '../Header'
import firebase from '../../firebase'
import './Calculos.css'
import Axios from 'axios'
import {Link} from 'react-router-dom'

export default class HomeScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: localStorage.name,
            userCpf: localStorage.userCpf,
            cpfUser: '',
            renderList: []
        }
    }
    
    async componentDidMount(){
        //Verificar se tem algum usuario logado!
        if(!firebase.getCurrent()){
            this.props.history.replace('/login');
            return null;
        }
        let state = this.state
        
        
        Axios.post("http://localhost:3001/api/clientes", {
            cpfUser: state.userCpf
        })
        console.log('CPF: ',state.cpfUser)
        

        Axios.get("http://localhost:3001/api/clientes").then((response) => {
                this.setState({renderList: response.data})
            
            console.log(response)

        })

        firebase.getUserName((info) => {
            localStorage.name = info.val().name
            localStorage.userCpf = info.val().cpf
            this.setState({name: localStorage.name, userCpf: localStorage.userCpf})
        })
      }

    render() {
        return(
            <div>
                <Header />
                    <h3>Olá {this.state.name}</h3>
                    <h3>{this.state.userCpf}</h3>

                {/* {this.state.renderList.map((value, key) => { */}
                   <div className="show-container"> 
                        {/* <h3>{value.clienteNome}</h3>
                        <h3>{value.clienteCpf}</h3> */}
                        <Link className='finalizar-button'color="primary" to="/resultado">Editar</Link>
                        <Link className='finalizar-button'color="primary" to="/resultado">Finalziar</Link>     
                    </div>
                {/* })} */}
            </div>
        )
    }
}