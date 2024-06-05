import { Router } from 'express';

import {
  createContactController,
  getAllContactsController,
  getContactsByIdController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));

router.post('/students', ctrlWrapper(createContactController));

export default router;
