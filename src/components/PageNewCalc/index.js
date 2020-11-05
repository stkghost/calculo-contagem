import React, { Component } from 'react';
import './styles.css'
import Header from '../Header'
import TextField from '@material-ui/core/TextField';
import dayjs from 'dayjs'
import Button  from '@material-ui/core/Button';
import firebase from '../../firebase'
import CadastroManual from './CadastroManual'


export default class PageNewCalc extends Component {

constructor(props){
    super(props)
    this.state = {
        clienteName: '',
        clienteCpf: '',
        dataNascimentoCliente: '',
        isOpen: false,
    }
    this.startCalc = this.startCalc.bind(this)
}

componentDidMount(){
  //Verificar se tem algum usuario logado!
  if(!firebase.getCurrent()){
    return this.props.history.replace('/login');
  }
}

toggleModal = () => {
    this.setState({
        isOpen: !this.state.isOpen
    })
}

startCalc(e) {
    e.preventDefault();

}

render() {
return (
        <div>
            <Header />
            <span className="text">Para cadastrar novo cálculo digite o nome, CPF e data de Nascimento da pessoa</span>
            <div className="inputs-container">
            
                <div  className="new-calc-select">
                    <TextField
                        value={this.state.nameCliente}
                        label="Nome da pessoa"
                        type="text"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => this.setState({nameCliente: e.target.value})}
                        />
                </div>
                <div className="new-calc-select">
                    <TextField
                        value={this.state.cpfCliente}
                        label="CPF da pessoa"
                        type="Number"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => this.setState({cpfCliente: e.target.value})}
                    />
                </div>
                <div className="new-calc-select">
                    <TextField
                        className="data-picker"
                        value={this.state.dataNascimentoCliente}
                        id="date"
                        label="Data Fim"
                        type="date"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => this.setState({dataNascimentoCliente: e.target.value})}
                    />
                </div>
                    {this.state.isOpen && (
                        <CadastroManual />
                    )}
                    <Button onClick={this.toggleModal}>Começar</Button>

                    
            </div>
        </div>
    );
}
}