import React, {Component} from 'react'
import Header from '../Header'
import firebase from '../../firebase'

export default class HomeScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: localStorage.name,
            userCpf: localStorage.userCpf
        }
    }
    
    async componentDidMount(){
        //Verificar se tem algum usuario logado!
        if(!firebase.getCurrent()){
            this.props.history.replace('/login');
            return null;
        }
        
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
                <h1>Tela principal</h1>
            </div>
        )
    }
}