        const bodyParser = require('body-parser')
        const mysql = require('mysql');
        const express = require('express')
        const app = express();
        const cors = require('cors')

        //abre a conexao
        const con = mysql.createPool({
            host: 'localhost', // host
            user: 'root', // user
            password: 'leaocomeGamba', // password
            database: 'contagem' // banco de dados
        });

        app.use(cors())
        app.use(express.json())
        app.use(bodyParser.urlencoded({extended: true}))

        app.post("/api/insert", (req, res) => {

            const clienteName = req.body.clienteName
            const clienteCpf = req.body.clienteCpf
            const clienteNascimento = req.body.clienteNascimento
            const clienteSexo = req.body.clienteSexo

            const sqlInsert = 'INSERT INTO (clienteNome, clienteCpf, clienteNascimento, clienteSexo) VALUES (?,?)'
            con.query(sqlInsert, [clienteName, clienteCpf, clienteNascimento, clienteSexo], (err, result) => {
                console.log(result)
            })
        })

        app.listen(3001, () => {
            console.log("Running on port 3306")
        })
