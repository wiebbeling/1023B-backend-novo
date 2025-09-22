import { Request, Response } from 'express'
import { db } from '../database/banco-mongo'
import bcrypt from 'bcrypt'
class UsuarioController {
   async adicionar(req: Request, res: Response) {
        const { nome, idade, email, senha } = req.body
        if (!nome || !idade || !email || !senha)
            return res.status(400).json({ error: 'Nome, idade, email e senha são obrigatórios!' })
        if(senha.length < 6)
            return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres!' })
        if(email.includes('@') ||!email.includes('.'))
            return res.status(400).json({ error: 'Email inválido!' })

        const senhaCripitografada = await bcrypt.hash(senha, 10)
        const usuario = { nome, idade, email, senha: senhaCripitografada }

        const resultado = await db.collection('produtos').insertOne(usuario)
        res.status(201).json({ nome, idade,email, id: resultado.insertedId })
    }
    async listar(req: Request, res: Response) {
        const usuarios = await db.collection('usuarios').find().toArray()
        const usuariosSemSenha = usuarios.map(({ senha, ...resto }) => resto)
        res.json(usuarios)
    }
}
export default new UsuarioController()