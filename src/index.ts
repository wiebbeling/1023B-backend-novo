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

/*use defaultdb;
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    urlfoto VARCHAR(255) NOT NULL,
    descricao TEXT
);
#insertes

INSERT INTO produtos (nome, preco, urlfoto, descricao)
VALUES
('Notebook Dell', 3500.00, 'https://exemplo.com/notebook.jpg', 'Notebook Dell i5 com 8GB RAM e 256GB SSD'),
('Smartphone Samsung', 2200.00, 'https://exemplo.com/smartphone.jpg', 'Celular Samsung Galaxy com câmera de 108MP'),
('Fone de Ouvido JBL', 350.00, 'https://exemplo.com/fone.jpg', 'Fone Bluetooth JBL com cancelamento de ruído');*/