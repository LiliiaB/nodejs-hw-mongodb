import { Router } from 'express';

import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactsByIdController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

import { authenticate } from '../middlewares/authenticate.js';

import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:contactId', ctrlWrapper(getContactsByIdController));

router.post(
  '/',
  validateBody(createContactSchema),
  upload.single('photo'),
  ctrlWrapper(createContactController),
);

router.delete('/:contactId', ctrlWrapper(deleteContactController));

router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  upload.single('photo'),
  ctrlWrapper(patchContactController),
);

export default router;
