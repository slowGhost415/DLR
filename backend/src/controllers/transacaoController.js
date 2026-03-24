import prisma from '../services/prismaClient.js';

export const listarTransacoes = async (req, res) => {
  try {
    const { tipo, categoria, mes } = req.query;
    const where = { userId: req.user.id };
    if (tipo) where.tipo = tipo;
    if (categoria) where.categoria = categoria;
    if (mes) {
      const inicio = new Date(`${mes}-01T00:00:00.000Z`);
      const fim = new Date(inicio);
      fim.setMonth(fim.getMonth() + 1);
      where.data = { gte: inicio, lt: fim };
    }
    const transacoes = await prisma.transacao.findMany({ where, orderBy: { data: 'desc' } });
    return res.json(transacoes);
  } catch (err) {
    console.error('listarTransacoes error:', err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const criarTransacao = async (req, res) => {
  try {
    const { tipo, categoria, descricao, valor, data } = req.body;
    if (!tipo || !categoria || !descricao || valor === undefined) {
      return res.status(400).json({ error: 'tipo, categoria, descricao e valor são obrigatórios' });
    }
    if (!['receita', 'despesa'].includes(tipo)) {
      return res.status(400).json({ error: 'tipo deve ser receita ou despesa' });
    }
    const transacao = await prisma.transacao.create({
      data: {
        userId: req.user.id,
        tipo,
        categoria,
        descricao,
        valor: parseFloat(valor),
        data: data ? new Date(data) : new Date(),
      },
    });
    return res.status(201).json(transacao);
  } catch (err) {
    console.error('criarTransacao error:', err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const deletarTransacao = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existente = await prisma.transacao.findFirst({ where: { id, userId: req.user.id } });
    if (!existente) return res.status(404).json({ error: 'Transação não encontrada' });
    await prisma.transacao.delete({ where: { id } });
    return res.json({ message: 'Transação removida' });
  } catch (err) {
    console.error('deletarTransacao error:', err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const resumoFinanceiro = async (req, res) => {
  try {
    const transacoes = await prisma.transacao.findMany({ where: { userId: req.user.id } });
    const receitas = transacoes.filter(t => t.tipo === 'receita').reduce((s, t) => s + t.valor, 0);
    const despesas = transacoes.filter(t => t.tipo === 'despesa').reduce((s, t) => s + t.valor, 0);
    const saldo = receitas - despesas;

    const gastosPorCategoria = {};
    transacoes.filter(t => t.tipo === 'despesa').forEach(t => {
      gastosPorCategoria[t.categoria] = (gastosPorCategoria[t.categoria] || 0) + t.valor;
    });

    const alertas = [];
    Object.entries(gastosPorCategoria).forEach(([cat, val]) => {
      if (val > receitas * 0.4) alertas.push(`Gastos elevados em "${cat}": R$ ${val.toFixed(2)}`);
    });

    return res.json({ receitas, despesas, saldo, gastosPorCategoria, alertas, total: transacoes.length });
  } catch (err) {
    console.error('resumoFinanceiro error:', err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};
