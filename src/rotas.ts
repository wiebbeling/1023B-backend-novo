import { Router } from "express";
import carrinhoController from "./carrinho/carrinho.controller.js";
import produtosController from "./produtos/produtos.controller.js";

const rotas = Router();

// Rotas do Carrinho
rotas.get("/carrinho/:usuarioId", carrinhoController.listar);       // listar carrinho do usuário
rotas.post("/carrinho", carrinhoController.adicionarItem);          // adicionar item ao carrinho
rotas.put("/carrinho", carrinhoController.atualizarQuantidade);     // atualizar quantidade (recebe no body)
rotas.delete("/carrinho/item", carrinhoController.removerItem);     // remover item específico (recebe no body)
rotas.delete("/carrinho/:usuarioId", carrinhoController.remover);   // remover carrinho inteiro

// Rotas dos produtos
rotas.get("/produtos", produtosController.listar);
rotas.post("/produtos", produtosController.adicionar);

export default rotas;
