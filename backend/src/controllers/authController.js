import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../services/prismaClient.js';
import dotenv from 'dotenv';

dotenv.config();

const signToken = (user) => {
  return jwt.sign({ id: user.id, nome: user.nome, email: user.email }, process.env.JWT_SECRET, { expiresIn: '8h' });
};

export const signup = async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) return res.status(400).json({ error: 'Preencha todos os campos' });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: 'Email já cadastrado' });

  const hashed = await bcrypt.hash(senha, 10);
  const user = await prisma.user.create({ data: { nome, email, senha: hashed } });

  const token = signToken(user);
  return res.status(201).json({ message: 'Usuário criado', user: { id: user.id, nome: user.nome, email: user.email }, token });
};

export const login = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ error: 'Preencha todos os campos' });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

  const isValid = await bcrypt.compare(senha, user.senha);
  if (!isValid) return res.status(401).json({ error: 'Credenciais inválidas' });

  const token = signToken(user);
  return res.json({ message: 'Login bem-sucedido', user: { id: user.id, nome: user.nome, email: user.email }, token });
};

export const profile = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

  return res.json({ id: user.id, nome: user.nome, email: user.email, data_criacao: user.data_criacao });
};
