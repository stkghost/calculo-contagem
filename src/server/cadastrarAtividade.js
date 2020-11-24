module.exports = {
    cadastrarAtividade(clienteid, empresa, tipoatividade, datainicio, datafim) {
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
        //insere dados no db
        const atividade = { clienteId: clienteid, empresa: empresa, tipoAtividade: tipoatividade, dataInicio: datainicio, dataFim: datafim }
        con.query('INSERT INTO atividade SET ?', atividade, (err, res) => {
            if (err) throw err

            console.log('Dados enviados com sucesso!')
        })

        //encerra conexao com o db
        con.end((err) => {
            if (err) {
                console.log('Erro ao encerrar conexao: ', err)
                return
            }
            console.log('Conexao encerrada com sucesso!')
        })


    }

}