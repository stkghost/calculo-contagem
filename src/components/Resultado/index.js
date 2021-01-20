import React, {Component} from 'react'
import Header from '../Header'
import firebase from '../../firebase'
import './Resultado.css'
import Axios from 'axios'

export default class Resultado extends Component {

    constructor(props){
        super(props)
        this.state = {
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

        // let state = this.state
        // await Axios.post('http://localhost:3001/api/get/resultados', {
        //     userCpf: state.userCpf,
        // }) 
        // .then ((response)  => {
        //     console.log(response)
        //     const datas = {renderList: response.data}
        //     this.setState(datas)
            
        // })
      }
      
    render() {
        return(
            <div>
                <Header />
                <h5>Olá {this.state.name}</h5>
                <h5>{this.state.userCpf}</h5>
                <div className="resultados-container"> 
                    <h2>Aposentadoria por tempo de contribuição</h2>
                    <p>......................</p>
                    <h5>Idade: 65 anos</h5>
                    <h5>Tempo de contribuição: 16,5 anos</h5>
                    <h3 style={{color: 'green'}}>Apto</h3>
                </div>
            </div>
        )
    }
}