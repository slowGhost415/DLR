import prisma from '../services/prismaClient.js';

export const listarMetas = async (req, res) => {
  try {
    const metas = await prisma.meta.findMany({ where: { userId: req.user.id }, orderBy: { prazo: 'asc' } });
    return res.json(metas);
  } catch (err) {
    console.error('listarMetas error:', err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const criarMeta = async (req, res) => {
  try {
    const { nome, valorAlvo, prazo } = req.body;
    if (!nome || !valorAlvo || !prazo) {
      return res.status(400).json({ error: 'nome, valorAlvo e prazo são obrigatórios' });
    }
    const meta = await prisma.meta.create({
      data: { userId: req.user.id, nome, valorAlvo: parseFloat(valorAlvo), prazo: new Date(prazo) },
    });
    return res.status(201).json(meta);
  } catch (err) {
    console.error('criarMeta error:', err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const atualizarMeta = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existente = await prisma.meta.findFirst({ where: { id, userId: req.user.id } });
    if (!existente) return res.status(404).json({ error: 'Meta não encontrada' });
    const { valorAtual } = req.body;
    const meta = await prisma.meta.update({ where: { id }, data: { valorAtual: parseFloat(valorAtual) } });
    return res.json(meta);
  } catch (err) {
    console.error('atualizarMeta error:', err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

export const deletarMeta = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existente = await prisma.meta.findFirst({ where: { id, userId: req.user.id } });
    if (!existente) return res.status(404).json({ error: 'Meta não encontrada' });
    await prisma.meta.delete({ where: { id } });
    return res.json({ message: 'Meta removida' });
  } catch (err) {
    console.error('deletarMeta error:', err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
};
