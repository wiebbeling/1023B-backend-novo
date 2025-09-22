import { Request, Response } from 'express'

class CarrinhoController {
 adicionar(req:Request, res:Response) {
    res.send('Produto adicionado ao carrinho')
 }
 listar(req:Request, res:Response) {
    res.send('Lista de produtos no carrinho')
 }
}
 export default CarrinhoController
