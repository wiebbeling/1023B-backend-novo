import {Router} from 'express'

import carrinhoController from '../carrinho/carrinho.controller.js'
import produtosController from '../produtos/produtos.controller.js'
import usuariosController from '../usuarios/usuarios.controller.js'

const rotas = Router()

// Rotas do Carrinho
//rotas.get('/carrinho',carrinhoController.listar)
rotas.post('/adicionarItem',carrinhoController.adicionarItem)

// Rotas dos produtos
rotas.get('/produtos',produtosController.listar)

rotas.post('/adicionarUsuario',usuariosController.adicionar)
rotas.post('/login',usuariosController.login)


export default rotas