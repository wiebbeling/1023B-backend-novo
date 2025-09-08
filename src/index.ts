import express from 'express'
import mysql from 'mysql2/promise'
import 'dotenv/config'

const app = express()

// Rota de teste de conexão
app.get('/', async (req, res) => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DBHOST!,
      user: process.env.DBUSER!,
      password: process.env.DBPASSWORD!,
      database: process.env.DBDATABASE!,
      port: Number(process.env.DBPORT)!,
      ssl: {
        rejectUnauthorized: true
      }
    })
    res.send(' Conectado ao banco de dados com sucesso')
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send('Erro ao conectar ao banco de dados: ' + err.message)
    } else {
      res.status(500).send('Erro desconhecido ao conectar ao banco de dados')
    }
  }
})

// Rota que retorna todos os produtos em JSON
app.get('/produtos', async (req, res) => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DBHOST!,
      user: process.env.DBUSER!,
      password: process.env.DBPASSWORD!,
      database: process.env.DBDATABASE!,
      port: Number(process.env.DBPORT!),
      ssl: {
        rejectUnauthorized: true
      }
    })

    const [rows] = await conn.query('SELECT * FROM produtos')
    res.json(rows)
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send('Erro ao buscar produtos: ' + err.message)
    } else {
      res.status(500).send('Erro desconhecido ao buscar produtos')
    }
  }
})

app.listen(8000, () => {
  console.log('Servidor rodando na porta 8000')
})
