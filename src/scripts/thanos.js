import { PATH_DB } from '../constants/contacts.js';
import fs from 'fs/promises';

export const thanos = async () => {
  try {
    const data = await fs.readFile(PATH_DB, 'utf-8');
    let contacts = JSON.parse(data);

    contacts = contacts.map((contact) => {
      const random = Math.random();
      return random < 0.5 ? contact : null;
    });

    contacts = contacts.filter((contact) => contact !== null);

    await fs.writeFile(PATH_DB, JSON.stringify(contacts, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error thanos:', error);
  }
};

await thanos();
