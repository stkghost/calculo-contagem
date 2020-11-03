import React, { Component } from 'react';
import './styles.css'
import Header from '../Header'
import TextField from '@material-ui/core/TextField';
import dayjs from 'dayjs'
import Button  from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';


export default class PageNewCalc extends Component {

constructor(props){
    super(props)
    this.state = {
        dataInicio: '',
        dataFim: ''
    }
    this.calcular = this.calcular.bind(this)
}
    calcular(e){
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
                alert(`Contribuição total: ${PeriodoContriTotal} Anos ${PeriodoMesesTotal} Meses e ${periodoDiasTotal} dias`)
            }
        }
        //função para o navegador não atualizar após o calculo
        e.preventDefault()
    }

render() {
    return (
            <div>
            <Header />
                <div className="manual-container"> 
                    <form className="data-inputs">
                        <h3>Nova Contribuição</h3>
                    <TextField
                        value={this.state.dataInicio}
                        id="date"
                        label="Data início"
                        type="date"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => this.setState({dataInicio: e.target.value})}
                    />
                    <h3>{this.state.dataInicio}</h3>
                    <TextField
                        value={this.state.dataFim}
                        id="date"
                        label="Data Fim"
                        type="date"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => this.setState({dataFim: e.target.value})}
                    />
                    <h3>{this.state.dataFim}</h3>
                        {/* <button type="submit" onClick={this.calcular}>calcular</button> */}
                        <Button variant="contained" color="primary" onClick={this.calcular}>Salvar </Button>
                    <h3>{}</h3>
                    </form>
                </div>
            </div>
        );
    }
}