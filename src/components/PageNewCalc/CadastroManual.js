import React, { Component } from 'react';
import './styles.css'
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import dayjs from 'dayjs'
import {Button, MenuItem, FormControl, InputLabel, Select }  from '@material-ui/core';
import firebase from '../../firebase'
import { Link } from 'react-router-dom';

export default class CadastroManual extends Component {

constructor(props){
    super(props)
    this.state = {
        dataInicio: '',
        dataFim: '',
        ContriTotal: '',
        userName: '',
        empresa: '',
        tipoAtividade: '',
        messege: '',
        clienteCpf: localStorage.clienteCpf
    }
    this.calcular = this.calcular.bind(this)
}
componentDidMount(){
  //Verificar se tem algum usuario logado!
  if(!firebase.getCurrent()){
    return this.props.history.replace('/login');
  }
}

calcular = async () => {
    let state = this.state
    //Recebe duas váriaveis, uma para data Fim e data Inicio
    var Inicio = dayjs(this.state.dataInicio) //.format('DD-MM-YYYY')
    var Fim = dayjs(this.state.dataFim) //.format('DD-MM-YYYY');

    //Faz o cálculo da diferente entre data Inicio e data Fim
    var PeriodoContriTotal = Fim.diff(Inicio, 'year', 'month','day')
    console.log( PeriodoContriTotal)

    //Verifica se o perído total de contribuição é valor inteiro
    if(PeriodoContriTotal % 1 === 0  ){
        console.log('Período exato em anos', PeriodoContriTotal)
    }
    //Se o periodo de diferença for decimal irá pegar o valor decimal e multiplicar por 12
    //Para descobrir quantos meses tem nesse período
    //Meses = valor após a 'virgula' X 12
    if(PeriodoContriTotal % 1 !== 0  ){
        
        // Aqui ele pega somente o valor decimal do total  e joga na variavel PeriodoMensalDecimal 
        var PeriodoMesesDecimal = PeriodoContriTotal % 1
        console.log(PeriodoMesesDecimal)

        //Multiplica esse valor decimal por 12 e gerar  o valor total de veses
        var PeriodoMesesTotal = PeriodoMesesDecimal * 12
        console.log(PeriodoMesesTotal)
        
        //Caso esse valor total também seja decimal irá multiplicar por 30
        if (PeriodoMesesTotal % 1 !== 0 ){

            //pega o valor decimal e joga na variavem periodoDiasDecimal
            var periodoDiasDecimal = PeriodoMesesTotal % 1

            //Multiplica por 30 pra saber o valor total de dias
            var periodoDiasTotal = periodoDiasDecimal * 30
            console.log(periodoDiasTotal)

            PeriodoContriTotal = parseInt(PeriodoContriTotal)
            console.log(PeriodoContriTotal)
            PeriodoMesesTotal = parseInt(PeriodoMesesTotal)
            console.log(PeriodoMesesTotal)
            periodoDiasTotal = parseInt(periodoDiasTotal)
            console.log(periodoDiasTotal)

            if(this.state.empresa === '') {
                alert('Preencha os campos')    
            } else if (this.state.dataInicio === '') {
                alert('Preencha os campos')    
            } else if (this.state.dataFim === '') {
                alert('Preencha os campos')    
            } else if (this.state.tipoAtividade === ''){
                alert('Preencha os campos')
            } else {
            let state = this.state
            state.ContriTotal = PeriodoContriTotal + PeriodoMesesTotal + periodoDiasTotal  
            this.setState(state)
            console.log(state.ContriTotal)
            }
        
        }
    }

    Axios.post("http://localhost:3001/api/insert/vinculo", {
            empresa: state.empresa,
            tipoAtividade: state.tipoAtividade,
            dataFim: state.dataFim,
            dataInicio: state.dataInicio,
            userCpf: localStorage.userCpf,
            clienteCpf: localStorage.clienteCpf,
            clienteId: localStorage.clienteCpf+''+localStorage.userCpf,
            
        }).then(() => {
        })
        this.setState({
            empresa: '',
            tipoAtividade: '',
            dataFim: '',
            dataInicio: ''
        })
        state.messege = 'Vínculo adicionado!'
}
render() {
return (
            <div className="manual-container"> 

                <form className="data-inputs">
                <div className="inputs">
                    <TextField
                        value={this.state.empresa}
                        id="Vinculo"
                        label="Vínculo"
                        type="text"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => this.setState({empresa: e.target.value})}
                    />
                  </div>
                  <div className="inputs">
                    <TextField
                        value={this.state.dataInicio}
                        id="dateInicio"
                        label="Data início"
                        type="date"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => this.setState({dataInicio: e.target.value})}
                    />
                    </div>
                    <div className="inputs">
                        <TextField
                            className="data-picker"
                            value={this.state.dataFim}
                            id="dateFim"
                            label="Data Fim"
                            type="date"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            onChange={(e) => this.setState({dataFim: e.target.value})}
                        />
                    </div>
                    <div className="inputs">
                        <FormControl >
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">Atividade</InputLabel>
                            <Select
                            displayEmpty
                            labelId="demo-simple-select-placeholder-label"
                            id="demo-simple-select-placeholder-label"
                            value={this.state.tipoAtividade}
                            onChange={(e) => this.setState({tipoAtividade: e.target.value})}
                            >
                                <MenuItem value={'Normal'}>Normal</MenuItem>
                                <MenuItem value={'Rural'}>Rural</MenuItem>
                                <MenuItem value={'EspecialQuinze'}>Especial 15</MenuItem>
                                <MenuItem value={'EspecialVinte'}>Especial 20</MenuItem>
                                <MenuItem value={'EspecialVinteCinco'}>Especial 25</MenuItem>
                                <MenuItem value={'Professor'}>Professor</MenuItem>
                            </Select>
                        </FormControl>
                        </div>
                    <div className="inputs"><Button variant="contained" color="primary" onClick={this.calcular}>Adicionar</Button></div>
                </form>
                    <h6>{this.state.messege}</h6>
                    <Link className='finalizar-button'color="primary" to="/resultado">Finalizar</Link>
            </div>
            
    );
}
}