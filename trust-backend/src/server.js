import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';

import authRoutes from './routes/auth.routes.js';
import studyRoutes from './routes/study.routes.js';
import siteRoutes from './routes/site.routes.js';
import leadRoutes from './routes/lead.routes.js';
import prescreenRoutes from './routes/prescreen.routes.js';
import participantRoutes from './routes/participant.routes.js';

import { errorHandler } from './middleware/error.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.BASE_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 500 }));

app.get('/health', (_, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/studies', studyRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/prescreens', prescreenRoutes);
app.use('/api/participants', participantRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://adetorok:Omoyeni0!@dalento0.ajjfhj5.mongodb.net/trust-clinical-trial';

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`🚀 TRUST API on http://localhost:${PORT}`));
});
