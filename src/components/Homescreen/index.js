import React, {Component} from 'react'
import Header from '../Header'
import firebase from '../../firebase'

export default class HomeScreen extends Component {
    
    componentDidMount(){
        //Verificar se tem algum usuario logado!
        if(!firebase.getCurrent()){
          return this.props.history.replace('/login');
        }
      }
    render() {
        return(
            <div>
                <Header />
                <h1>Tela principal</h1>
            </div>
        )
    }
}