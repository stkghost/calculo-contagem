module.exports = {
    consultarCliente(Cpf) {
        const mysql = require('mysql');

        //abre a conexao
        const con = mysql.net.createConnection({
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
        con.query('SELECT clienteNome, clienteCpf, clienteSexo, clienteNascimento, clienteId FROM clientes WHERE userCpf =' + Cpf, (err, rows) => {
            if (err) throw err
            rows.forEach(row => {
                <div>
                    <h3>{row.clienteId}</h3>
                    <h3>{row.clienteNome}</h3>
                    <h3>{row.clienteCpf}</h3>
                    <h3>{row.clienteNascimento}</h3>
                    <h3>{row.clienteSexo}</h3>
                </div>

                console.log('|-- ID: ' + row.clienteId + ' Nome: ' + row.clienteNome + ' | CPF: ' + row.clienteCpf + ' | Data de Nascimento: ' + row.clienteNascimento + ' Sexo: ' + row.clienteSexo + ' --|')
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
