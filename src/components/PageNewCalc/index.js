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
        clientes: [],
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

    //Verificar se tem algum usuario logado!
    if(!firebase.getCurrent()){
        return this.props.history.replace('/login');
      }


    firebase.app.ref('clientes').on('value', (snapshot) => {
        let state = this.state;
        state.clientes = []
        snapshot.forEach((childItem) => {
            state.clientes.push({
                key: childItem.key,
                clienteName: childItem.val().clienteName,
                cpfCliente: childItem.val().cpfCliente,
                dataNascimentoCliente: childItem.val().dataNascimentoCliente
            })
        })
        this.setState(state)
    })
  
 
}
closeModal() {
    let state = this.state
    this.setState({
        isOpen: !this.state.isOpen
    })
}

toggleModal = async () => {
    let state = this.state

    let isValid = validate(state.cpfCliente)
    // if (this.state.clienteName === ''){
    //     alert('Digite o nome do cliente')
    // } else if (!isValid == true ){
    //     alert('CPF Inválido')
    // } else if (this.state.dataNascimentoCliente === ''){
    //     alert('Digite a data de nascimento do cliente')
    // } else if (this.state.sexoCliente === ''){
    //     alert('Selecione o gênero')
    // } else {   

    var now = dayjs()
    var nascimento = dayjs(this.state.dataNascimentoCliente)

    var calcIdade = now.diff(nascimento, 'year', 'month', 'day')
    calcIdade = parseInt(calcIdade)
    this.setState({idadeTotal: calcIdade})
    console.log(state.idadeTotal)

    this.setState({
        isOpen: !this.state.isOpen
    })
    document.getElementById('infos').style.display="block"
    document.getElementById('form-cliente').style.display="none"

    
    //Cria no banco de dados uma tabela dentro do usuário chamada cálculos onde irá salvar cada contribuição salva
    //pegar o id do usuário para referenciar no banco de dados
    var clientes = firebase.app.ref('clientes');
    var chave = calculos.push().key;
    await calculos.child(chave).set({
        nomeCliente: this.state.clienteName,
        nascimentoCliente: this.state.dataNascimentoCliente,
        sexo: this.state.sexoCliente,
        clienteCpf: this.state.cpfCliente,
    })

    }
// }
render() {
return (
        <div>
            <Header />
            
            <div className="cliente-container">
                <div id="infos" style={{display: "none", margin: '25px', alignSelf: 'start'}}>
                    <span>Cliente: {this.state.clienteName}</span><br/>
                    <span>CPF: {this.state.cpfCliente}</span><br/>
                    <span>Idade: {this.state.idadeTotal}</span><br/>

                    <span>Vínculo</span>
                </div>
                <div id="form-cliente" className="inputs-container">
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