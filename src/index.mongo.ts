import express, { Request, Response } from 'express'
import 'dotenv/config'
import { MongoClient } from 'mongodb'
import cors from "cors";
import rotas from './rotas.js'

const client = new MongoClient(process.env.MONGO_URI!)
await client.connect()
const db = client.db(process.env.MONGO_DB!)

const app = express()
//Esse middleware faz com que o express faça parte do body da requisição para json
app.use(express.json())
app.use(cors());

//Usando as rotas definidas em rotas.ts
app.use('/', rotas)

// Criando o servidor na porta 8000 com express
app.listen(8000, () => {
    console.log('Server is running on port 8000')
})



