import React, { Component } from 'react';
import './styles.css'
import TextField from '@material-ui/core/TextField';
import dayjs from 'dayjs'
import {Button, MenuItem, FormControl, InputLabel, Select }  from '@material-ui/core';
import firebase from '../../firebase'

export default class CadastroManual extends Component {

constructor(props){
    super(props)
    this.state = {
        dataInicio: '',
        dataFim: '',
        ContriTotal: '',
        userName: '',
        empregoCliente: '',
        tipoAposentadoria: '',
        messege: '',
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

            if(this.state.empregoCliente === '') {
                alert('Preencha os campos')    
            } else if (this.state.dataInicio === '') {
                alert('Preencha os campos')    
            } else if (this.state.dataFim === '') {
                alert('Preencha os campos')    
            } else if (this.state.tipoAposentadoria === ''){
                alert('Preencha os campos')
            } else {

            let state = this.state
            state.ContriTotal = PeriodoContriTotal + PeriodoMesesTotal + periodoDiasTotal  
            // state.ContriTotal = `Contribuição Total: ${PeriodoContriTotal} Anos ${PeriodoMesesTotal} meses e ${periodoDiasTotal} dias`
            this.setState(state)
            console.log(state.ContriTotal)
            state.messege = 'Vínculo adicionado!'
            }
            // alert(`Contribuição total: ${PeriodoContriTotal} Anos ${PeriodoMesesTotal} Meses e ${periodoDiasTotal} dias`)
        }
    }
}
render() {
return (
            <div className="manual-container"> 
                
                <h3>Nova Contribuição</h3>
                <form className="data-inputs">
                <div className="inputs">
                    <TextField
                        value={this.state.empregoCliente}
                        id="Vinculo"
                        label="Vínculo"
                        type="text"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => this.setState({empregoCliente: e.target.value})}
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
                            value={this.state.tipoAposentadoria}
                            onChange={(e) => this.setState({tipoAposentadoria: e.target.value})}
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
                    <div className="inputs"><Button variant="contained" color="primary" onClick={this.calcular}>Somar </Button></div>
                </form>
                    <h6>{this.state.messege}</h6>
            </div>
            
    );
}
}