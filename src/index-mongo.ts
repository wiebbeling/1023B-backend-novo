import express, { NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import rotasAutenticadas from './rotas/rotas-autenticadas.js'
import rotasNaoAutenticadas from './rotas/rotas-nao-autenticas.js'
import cors from 'cors'
import Auth from './middlewares/auth.js'
const app = express()
app.use(cors())
//Esse middleware faz com que o 
// express faça o parse do body da requisição para json 

//Meu primeiro middleware
app.use(express.json())
//Criar um middleware que bloqueia tudo

// Usando as rotas definidas em rotas.ts-
app.use(rotasNaoAutenticadas)
app.use(Auth)
app.use(rotasAutenticadas)

// Criando o servidor na porta 8000 com o express
app.listen(8000, () => {
    console.log('Server is running on port 8000')
})


