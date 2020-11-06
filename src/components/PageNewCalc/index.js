import React, { Component } from 'react';
import './styles.css'
import Header from '../Header'
import dayjs from 'dayjs'
import Modal from 'react-modal'
import firebase from '../../firebase'
import CadastroManual from './CadastroManual'
import { IconButton, Button, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default class PageNewCalc extends Component {

constructor(props){
    super(props)
    this.state = {
        clienteName: '',
        cpfCliente: '',
        dataNascimentoCliente: '',
        idadeCliente: '',
        isOpen: false,
    }
}

componentDidMount(){
  //Verificar se tem algum usuario logado!
  if(!firebase.getCurrent()){
    return this.props.history.replace('/login');
  }
}


toggleModal = () => {

    var now = dayjs()
    var nascimento = dayjs(this.state.dataNascimentoCliente)

    var idadeTotal = nascimento.diff(now, 'year', 'month', 'day')
    console.log(idadeTotal)

    this.setState({
        isOpen: !this.state.isOpen
    })
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
                        label="Data de Nascimento"
                        type="date"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => this.setState({dataNascimentoCliente: e.target.value})}
                    />
                </div>
                    <Button onClick={this.toggleModal}>Começar</Button>
                    <Modal 
                        style={{
                            overlay: {
                                top: '90px',
                                left: '90px',
                                right: '90px',
                                bottom: '90px',
                                background: '#fff',
                            }, 
                            content: {
                                margin: '-40px'
                            }
                        }}
                        isOpen={this.state.isOpen}>
                        <sapn>{this.state.nameCliente}</sapn>
                        <sapn>{this.state.cpfCliente}</sapn>
                        <sapn>{this.state.dataNascimentoCliente}</sapn>
                        <CadastroManual />
                        <IconButton onClick={this.toggleModal}>
                            <CloseIcon />
                        </IconButton>
                    </Modal>
            </div>

        </div>
    );
}
}