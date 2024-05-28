import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs/promises';

export const removeAllContacts = async () => {
  try {
    await fs.writeFile(PATH_DB, JSON.stringify([], null, 2), 'utf-8');
  } catch (error) {
    console.error('Error removing all contacts:', error);
  }
};

await removeAllContacts();
