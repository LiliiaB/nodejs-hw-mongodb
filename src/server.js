import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './utils/env.js';


import contactsRouter from './routers/contacts.js';

import { getAllContacts, getContactsById } from './services/contacts.js';
import notFoundMiddleware from './middlewares/notFoundHandler.js';
import errorHandlerMiddleware from './middlewares/errorHandler.js';
 hw3-crud
  app.use(contactsRouter);


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


