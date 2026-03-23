import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import interactionRoutes from './routes/interactionRoutes.js';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

import systemRoutes from './routes/systemRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/system', systemRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
