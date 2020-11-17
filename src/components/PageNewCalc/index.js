import React, { Component } from 'react';
import './styles.css'
import Header from '../Header'
import dayjs from 'dayjs'
import Modal from 'react-modal'
import firebase from '../../firebase'
import CadastroManual from './CadastroManual'
import {Button, TextField, InputLabel, IconButton, MenuItem, FormControl, Select }  from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {validate} from 'gerador-validador-cpf';


export default class PageNewCalc extends Component {

constructor(props){
    super(props)
    this.state = {
        calculos: [],
        clienteName: '',
        cpfCliente: '',
        dataNascimentoCliente: '',
        idadeCliente: '',
        isOpen: false,
        idadeTotal: '',
        sexoCliente: '',
        messegeError: '',
    }
    this.closeModal = this.closeModal.bind(this)
}

componentDidMount(){

    firebase.app.ref('calculos').on('value', (snapshot) => {
        let state = this.state;
        state.calculos = []
        snapshot.forEach((childItem) => {
            state.calculos.push({
                key: childItem.key,
                clienteName: childItem.val().clienteName,
                cpfCliente: childItem.val().cpfCliente,
                dataNascimentoCliente: childItem.val().dataNascimentoCliente
            })
        })
        this.setState(state)
    })
  //Verificar se tem algum usuario logado!
  if(!firebase.getCurrent()){
    return this.props.history.replace('/login');
  }
}
closeModal() {
    let state = this.state
    this.setState({
        isOpen: !this.state.isOpen
    })
}


// handleSexo = () => {
//     let state = this.state
//     if(state.cpfCliente === '')
// }

toggleModal = async () => {
    let state = this.state

    let isValid = validate(state.cpfCliente)
    if (this.state.clienteName === ''){
        alert('Digite o nome do cliente')
    } else if (isValid !== true ){
        alert('CPF Inválido')
    } else if (this.state.dataNascimentoCliente === ''){
        alert('Digite a data de nascimento do cliente')
    } else if (this.state.sexoCliente === ''){
        alert('Selecione o gênero')
    } else {   

    var now = dayjs()
    var nascimento = dayjs(this.state.dataNascimentoCliente)

    var calcIdade = now.diff(nascimento, 'year', 'month', 'day')
    calcIdade = parseInt(calcIdade)
    this.setState({idadeTotal: calcIdade})
    console.log(state.idadeTotal)

    this.setState({
        isOpen: !this.state.isOpen
    })
    //Cria no banco de dados uma tabela dentro do usuário chamada cálculos onde irá salvar cada contribuição salva
    //pegar o id do usuário para referenciar no banco de dados
    const uid = firebase.auth().currentUser.uid

    //retornar um novo usuário na database criando tabela com nome e cpf do usuário
    return firebase.database().ref('usuarios/clientes').child(uid).set({
        clienteName: this.state.clienteName,
        cpfCliente: this.state.cpfCliente,
        dataNascimentoCliente: this.state.dataNascimentoCliente,
        sexoCliente: this.state.sexoCliente
    })
    }
}

render() {
return (
        <div>
            <Header />
            <h3 style={{ color: '#000'}}>{this.state.messegeError}</h3>
            <div className="inputs-container">
                <div  className="new-calc-select">
                    <TextField
                        value={this.state.clienteName}
                        label="Nome Cliente"
                        type="text"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => this.setState({clienteName: e.target.value})}
                        />
                </div>
                <div className="new-calc-select">
                    <TextField
                        value={this.state.cpfCliente}
                        label="CPF Cliente"
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
                        id="date-nascimento"
                        label="Data de Nascimento"
                        type="date"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => this.setState({dataNascimentoCliente: e.target.value})}
                    />
                </div>
                <div className="new-calc-select">
                <FormControl>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    Sexo
                    </InputLabel>
                        <Select
                            displayEmpty
                            labelId="demo-simple-select-placeholder-label"
                            id="demo-simple-select-placeholder-label"
                            value={this.state.sexoCliente}
                            onChange={(e) => this.setState({sexoCliente: e.target.value})}
                        >
                        <MenuItem value={'masculino'}>Masculino</MenuItem>
                        <MenuItem value={'feminino'}>Feminino</MenuItem>
                        </Select>
                </FormControl>  
                </div>
                <div className="new-calc-select">
                    <Button onClick={this.toggleModal}>Começar</Button>
                </div>
                    <Modal 
                        style={{
                            overlay: {
                                top: '90px',
                                left: '90px',
                                right: '90px',
                                bottom: '60px',
                                borderColor: '#fff',
                                background: '#fff',
                            }, 
                            content: {
                                margin: '-40px'
                            }
                        }}
                        isOpen={this.state.isOpen}>
                        {/* <sapn>Nome: {this.state.clienteName}</sapn><br></br>
                        <sapn>CPF: {this.state.cpfCliente}</sapn><br></br>
                        <sapn>Idade: {this.state.idadeTotal}</sapn><br></br>
                        <sapn>{this.state.sexoCliente}</sapn><br></br> */}
                        <IconButton onClick={this.closeModal}>
                            <CloseIcon />
                        </IconButton>
                        <CadastroManual />
                    </Modal>
            </div>
        </div>
    );
}
}