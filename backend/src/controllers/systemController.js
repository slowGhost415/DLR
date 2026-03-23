import prisma from '../services/prismaClient.js';

// Coleta do profile e interações do usuário
export const getSystemDashboard = async (req, res) => {
  const userId = req.user.id;

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, nome: true, email: true, data_criacao: true } });
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

  const interactions = await prisma.interaction.findMany({
    where: { userId },
    orderBy: { data: 'desc' },
  });

  return res.json({ user, interactions });
};

// Registrar ações no sistema (pesquisa, gráfica, simulação, etc.)
export const performAction = async (req, res) => {
  const { tipo_acao, descricao } = req.body;
  if (!tipo_acao || !descricao) return res.status(400).json({ error: 'tipo_acao e descricao são obrigatórios' });

  const interaction = await prisma.interaction.create({
    data: {
      userId: req.user.id,
      tipo_acao,
      descricao,
    },
  });

  return res.status(201).json({ message: 'Ação registrada no sistema', interaction });
};
