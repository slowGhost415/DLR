import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import interactionRoutes from './routes/interactionRoutes.js';
import systemRoutes from './routes/systemRoutes.js';
import transacaoRoutes from './routes/transacaoRoutes.js';
import metaRoutes from './routes/metaRoutes.js';
import investimentoRoutes from './routes/investimentoRoutes.js';

dotenv.config();

const app = express();
const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL, 'http://localhost:5173']
  : ['http://localhost:5173'];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/system', systemRoutes);
app.use('/api/transacoes', transacaoRoutes);
app.use('/api/metas', metaRoutes);
app.use('/api/investimentos', investimentoRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
