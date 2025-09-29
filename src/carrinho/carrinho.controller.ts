import { Request, Response } from "express";
import { db } from "../database/banco-mongo.js";

class CarrinhoController {
  // Adicionar item ao carrinho
  async adicionarItem(req: Request, res: Response) {
    try {
      const { usuarioId, produtoId, quantidade } = req.body;

      if (!usuarioId || !produtoId || !quantidade) {
        return res.status(400).json({ erro: "usuarioId, produtoId e quantidade são obrigatórios" });
      }

      // Buscar produto
      const produto = await db.collection("produtos").findOne({ _id: produtoId });
      if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
      }

      // Verificar se carrinho já existe
      let carrinho = await db.collection("carrinho").findOne({ usuarioId });

      if (!carrinho) {
        // Criar novo carrinho
        const novoCarrinho = {
          usuarioId,
          itens: [
            {
              produtoId,
              quantidade,
              precoUnitario: produto.preco,
              nome: produto.nome,
            },
          ],
          total: produto.preco * quantidade,
          dataAtualizacao: new Date(),
        };

        const resultado = await db.collection("carrinho").insertOne(novoCarrinho);
        return res.status(201).json({ ...novoCarrinho, _id: resultado.insertedId });
      } else {
        // Se já existe carrinho → atualizar
        const itemExistente = carrinho.itens.find((i: any) => i.produtoId === produtoId);

        if (itemExistente) {
          itemExistente.quantidade += quantidade;
        } else {
          carrinho.itens.push({
            produtoId,
            quantidade,
            precoUnitario: produto.preco,
            nome: produto.nome,
          });
        }

        // Recalcular total
        carrinho.total = carrinho.itens.reduce(
          (soma: number, item: any) => soma + item.quantidade * item.precoUnitario,
          0
        );
        carrinho.dataAtualizacao = new Date();

        await db.collection("carrinho").updateOne(
          { usuarioId },
          { $set: carrinho }
        );

        return res.json(carrinho);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao adicionar item no carrinho" });
    }
  }

  // Listar carrinho de um usuário
  async listar(req: Request, res: Response) {
    try {
      const { usuarioId } = req.params;
      const carrinho = await db.collection("carrinho").findOne({ usuarioId });

      if (!carrinho) {
        return res.status(404).json({ erro: "Carrinho não encontrado" });
      }

      return res.json(carrinho);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao listar carrinho" });
    }
  }

  // Remover item específico
  async removerItem(req: Request, res: Response) {
    try {
      const { usuarioId, produtoId } = req.body;

      let carrinho = await db.collection("carrinho").findOne({ usuarioId });
      if (!carrinho) {
        return res.status(404).json({ erro: "Carrinho não encontrado" });
      }

      carrinho.itens = carrinho.itens.filter((item: any) => item.produtoId !== produtoId);

      carrinho.total = carrinho.itens.reduce(
        (soma: number, item: any) => soma + item.quantidade * item.precoUnitario,
        0
      );
      carrinho.dataAtualizacao = new Date();

      await db.collection("carrinho").updateOne({ usuarioId }, { $set: carrinho });

      return res.json(carrinho);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao remover item" });
    }
  }

  // Atualizar quantidade
  async atualizarQuantidade(req: Request, res: Response) {
    try {
      const { usuarioId, produtoId, quantidade } = req.body;

      let carrinho = await db.collection("carrinho").findOne({ usuarioId });
      if (!carrinho) {
        return res.status(404).json({ erro: "Carrinho não encontrado" });
      }

      const item = carrinho.itens.find((i: any) => i.produtoId === produtoId);
      if (!item) {
        return res.status(404).json({ erro: "Item não encontrado no carrinho" });
      }

      item.quantidade = quantidade;

      carrinho.total = carrinho.itens.reduce(
        (soma: number, i: any) => soma + i.quantidade * i.precoUnitario,
        0
      );
      carrinho.dataAtualizacao = new Date();

      await db.collection("carrinho").updateOne({ usuarioId }, { $set: carrinho });

      return res.json(carrinho);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao atualizar quantidade" });
    }
  }

  // Remover carrinho inteiro
  async remover(req: Request, res: Response) {
    try {
      const { usuarioId } = req.params;

      const resultado = await db.collection("carrinho").deleteOne({ usuarioId });
      if (resultado.deletedCount === 0) {
        return res.status(404).json({ erro: "Carrinho não encontrado" });
      }

      return res.json({ mensagem: "Carrinho removido com sucesso" });
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao remover carrinho" });
    }
  }
}

export default new CarrinhoController();
