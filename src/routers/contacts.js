
import { Router } from 'express';
import { getAllContacts, getContactsById } from './services/contacts.js';

const router = Router();

router.get('/contacts', async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    data: contacts,
    message: 'Successfully found contacts!',
  });
});

router.get('/contacts/:contactId', async (req, res, next) => {
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

