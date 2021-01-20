import React, { Component } from 'react';
import './styles.css'
import Axios from 'axios';
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
        clienteNome: '',
        cpfCliente: '',
        clienteCpf: '',
        dataNascimentoCliente: '',
        idadeCliente: '',
        isOpen: false,
        idadeTotal: '',
        sexoCliente: '',
        messegeError: '',
        userCpf: localStorage.userCpf,
        currentClientId: localStorage.currentClientId,
        renderList: [],
        }
    this.closeModal = this.closeModal.bind(this)
}

    
componentDidMount(){

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

toggleModal = () => {
        var state = this.state

        let isValid = validate(state.cpfCliente)
        // if (this.state.clienteNome === ''){
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

        this.setState({
            isOpen: !this.state.isOpen
        })

        document.getElementById('infos').style.display="block"
        document.getElementById('form-cliente').style.display="none"

        //Cria no banco de dados uma tabela dentro do usuário chamada cálculos onde irá salvar cada contribuição salva
        //pegar o id do usuário para referenciar no banco de dados
        Axios.post("http://localhost:3001/api/clientes", {
            clienteNome: state.clienteNome,
            clienteCpf: state.cpfCliente,
            clienteNascimento: state.dataNascimentoCliente,
            clienteSexo: state.sexoCliente,
            userCpf: state.userCpf,
            clienteId: state.cpfCliente+''+state.userCpf,

        }).then(() => {
            console.log('Cliente cadastrado')
        })
        localStorage.clienteNome = state.clienteNome
        localStorage.clienteCpf = state.cpfCliente
        console.log(localStorage.clienteCpf)
    }
// }
render() {
return (
        <div>
            <Header />
            
            <div className="cliente-container">
                <div id="infos" style={{display: "none", margin: '25px', alignSelf: 'start'}}>
                    <span>Cliente: {this.state.clienteNome}</span><br/>
                    <span>CPF: {this.state.cpfCliente}</span><br/>
                    <span>Idade: {this.state.idadeTotal}</span><br/>
                    <span>Vínculo</span>
                </div>
                <div id="form-cliente" className="inputs-container">
                    <div  className="new-calc-select">
                        <TextField
                            value={this.state.clienteNome}
                            label="Nome Cliente"
                            type="text"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            onChange={(e) => this.setState({clienteNome: e.target.value})}
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
                                <MenuItem value={'m'}>Masculino</MenuItem>
                                <MenuItem value={'f'}>Feminino</MenuItem>
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