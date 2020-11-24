module.exports = {
    consultarAtividade(clienteid) {
        const mysql = require('mysql');

        //abre a conexao
        const con = mysql.createConnection({
            host: 'localhost', // host
            user: 'root', // user
            password: 'leaocomeGamba', // Pass
            database: 'contagem' // banco de dados
        });
        con.connect((err) => {
            if (err) {
                console.log('Erro ao conectar: ', err)
                return
            }
            console.log('Conexao feita com sucesso!')
        })


        //faz a consulta no db
        con.query('SELECT empresa, tipoAtividade, dataFim, DataInicio FROM atividade WHERE clienteId =' + clienteid, (err, rows) => {
            if (err) throw err
            rows.forEach(row => {
                console.log('|-- Empresa: ' + row.empresa + ' | Tipo Atividade: ' + row.tipoAtividade + ' | Inicio: ' + row.dataInicio + ' | Fim: ' + row.dataFim + ' --|')
            })
        });

        //encerra conexao
        con.end((err) => {
            if (err) {
                console.log('Erro ao encerrar conexao: ', err)
                return
            }
            console.log('Conexao encerrada com sucesso!')
        })
    }
}