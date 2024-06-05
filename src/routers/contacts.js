import { Router } from 'express';

import {
  getAllContactsController,
  getContactsByIdController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', getAllContactsController);

router.get('/contacts/:contactId', getContactsByIdController);
