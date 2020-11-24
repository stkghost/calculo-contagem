module.exports = {
    cadastrarUser(nome, cpf, email) {
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

        //dados a serem inseridos
        const user = { userNome: nome, userCpf: cpf, userEmail: email }

        //insere dados no db
        con.query('INSERT INTO usuarios SET ?', user, (err, res) => {
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