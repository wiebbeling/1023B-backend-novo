import {Router} from 'express'

import CarrinhoController from './carrinho/carrinho.controller'
import ProdutosController from './produtos/produtos.controller'

const carrinhoController = new CarrinhoController()

const rotas = Router()
rotas.get('/carrinho', carrinhoController.listar)
rotas.post('/carrinho', carrinhoController.adicionar)

export default rotas