import express, {Request, Response} from 'express'
import 'dotenv/config'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_URI!)
await client.connect()
const db = client.db(process.env.MONGO_DB!) 

const app = express()
// Middleware faz com que o express entenda JSON
app.use(express.json())

// Rota de acesso pelo navegador
app.get('/produtos', async (req:Request, res:Response) => {
 const produtos = await db.collection('produtos').find().toArray()
 res.json(produtos)
})

app.post('/produtos', async (req:Request, res:Response) => {
 const { nome, preco, urlfoto, descricao } = req.body
 if (!nome || !preco || !urlfoto || !descricao) 
   return res.status(400).json({ error: 'Nome, preço, urlfoto e descrição são obrigatórios!' })
 
 const produto = { nome, preco, urlfoto, descricao }
 const resultado = await db.collection('produtos').insertOne(produto)
 res.status(201).json({ nome, preco, urlfoto, descricao, id:resultado.insertedId })
})

// criando o servidor na porta 8000 com o express
app.listen(8000, () => {
  console.log('Servidor rodando na porta 8000')
})