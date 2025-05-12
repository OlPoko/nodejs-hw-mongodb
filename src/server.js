// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import contactsRouter from './routers/contacts.js';
import { getEnvVar } from './utils/getEnvVar.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: `Server is running on port ${PORT}`,
    });
  });

  // ==== Роутер контактів ====
  app.use('/contacts', contactsRouter);

  // ==== 404 Middleware ====
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // ==== Обробка помилок ====
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  // ==== Запуск сервера ====
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
