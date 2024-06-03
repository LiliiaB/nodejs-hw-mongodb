import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './utils/env.js';

import { getAllContacts, getContactsById } from './services/contacts.js';
import notFoundMiddleware from './middlewares/notFoundHandler.js';
import errorHandlerMiddleware from './middlewares/errorHandler.js';

const PORT = Number(env('PORT', '3000'));

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

  app.get('/contacts', async (req, res, next) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        data: contacts,
        message: 'Successfully found contacts!',
      });
    } catch (error) {
      next(error);
    }
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactsById(contactId);

      if (!contact) {
        return res.status(404).json({
          status: 404,
          message: `Contact with id ${contactId} not found!`,
        });
      }

      res.status(200).json({
        status: 200,
        data: contact,
        message: `Successfully found contact with id ${contactId}!`,
      });
    } catch (error) {
      next(error);
    }
  });

  app.use('*', notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
