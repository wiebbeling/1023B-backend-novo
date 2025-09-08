import express from 'express'
import mysql from 'mysql2/promise'
import 'dotenv/config'

const app = express()

// Rota de teste de conexão
app.get('/', async (req, res) => {
  if (process.env.DBHOST === undefined) {
    res.status(500).send('DBHOST is not defined')
    return
  }
  if (process.env.DBUSER === undefined) {
    res.status(500).send('DBUSER is not defined')
    return
  }
  if (process.env.DBPASSWORD === undefined) {
    res.status(500).send('DBPASSWORD is not defined')
    return
  }
  if (process.env.DBDATABASE === undefined) {
    res.status(500).send('DBDATABASE is not defined')
    return
  }
  if (process.env.DBPORT === undefined) {
    res.status(500).send('DBPORT is not defined')
    return
  }

  try {
    const conn = await mysql.createConnection({
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DBDATABASE,
      port: Number(process.env.DBPORT),
    })
    res.send('Conectado ao banco de dados com sucesso')
  } catch (err) {
    if (err instanceof Error === false) {
      res.status(500).send('Erro desconhecido ao conectar ao banco de dados')
      return
    }
    const error = err as Error
    res.status(500).send('Erro ao conectar ao banco de dados: ' + error.message)
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
    })

    const [rows] = await conn.query('SELECT * FROM produtos')
    res.json(rows) // devolve a lista de produtos como JSON
  } catch (err) {
    if (err instanceof Error === false) {
      res.status(500).send('Erro desconhecido ao buscar produtos')
      return
    }
    const error = err as Error
    res.status(500).send('Erro ao buscar produtos: ' + error.message)
  }
})

app.listen(8000, () => {
  console.log('Servidor rodando na porta 8000')
})
