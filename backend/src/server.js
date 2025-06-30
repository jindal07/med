import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from '../config/env.js';
import authRoutes from './routes/auth.js';
import reportRoutes from './routes/report.js';
import aiRoutes from './routes/ai.js';
import path from 'path';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
if (config.server.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Static file serving for uploaded files
app.use('/uploads', express.static(path.resolve(config.upload.uploadPath)));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api', reportRoutes);
app.use('/api', aiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API route not found.' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// Start server
const PORT = config.server.port || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}); 