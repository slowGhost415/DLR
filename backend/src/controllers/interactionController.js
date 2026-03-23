import prisma from '../services/prismaClient.js';

export const logInteraction = async (req, res) => {
  const { tipo_acao, descricao } = req.body;
  if (!tipo_acao || !descricao) return res.status(400).json({ error: 'tipo_acao e descricao são obrigatórios' });

  const interaction = await prisma.interaction.create({
    data: {
      userId: req.user.id,
      tipo_acao,
      descricao,
    },
  });

  return res.status(201).json({ message: 'Ação registrada', interaction });
};

export const getHistory = async (req, res) => {
  const interactions = await prisma.interaction.findMany({
    where: { userId: req.user.id },
    orderBy: { data: 'desc' },
  });
  return res.json(interactions);
};
