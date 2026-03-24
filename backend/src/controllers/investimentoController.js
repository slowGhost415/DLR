import prisma from '../services/prismaClient.js';

export const listarInvestimentos = async (req, res) => {
  try {
    const investimentos = await prisma.investimento.findMany({ where: { userId: req.user.id }, orderBy: { data_inicio: 'desc' } });
    return res.json(investimentos);
  } catch (err) {
    console.error('listarInvestimentos error:', err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const criarInvestimento = async (req, res) => {
  try {
    const { nome, tipo, valor, taxa } = req.body;
    if (!nome || !tipo || valor === undefined || taxa === undefined) {
      return res.status(400).json({ error: 'nome, tipo, valor e taxa são obrigatórios' });
    }
    const inv = await prisma.investimento.create({
      data: { userId: req.user.id, nome, tipo, valor: parseFloat(valor), taxa: parseFloat(taxa) },
    });
    return res.status(201).json(inv);
  } catch (err) {
    console.error('criarInvestimento error:', err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const deletarInvestimento = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existente = await prisma.investimento.findFirst({ where: { id, userId: req.user.id } });
    if (!existente) return res.status(404).json({ error: 'Investimento não encontrado' });
    await prisma.investimento.delete({ where: { id } });
    return res.json({ message: 'Investimento removido' });
  } catch (err) {
    console.error('deletarInvestimento error:', err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};
