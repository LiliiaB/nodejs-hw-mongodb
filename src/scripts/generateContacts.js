import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs';

import { createFakeContact } from '../utils/createFakeContact.js';

const generateContacts = async (number) => {
  try {
    const data = fs.readFileSync(PATH_DB, 'utf-8');
    const contacts = JSON.parse(data);

    let newContacts = [];
    for (let i = 0; i < number; i++) {
      newContacts.push(createFakeContact());
    }

    const updatedContacts = [...contacts, ...newContacts];

    fs.writeFileSync(
      PATH_DB,
      JSON.stringify(updatedContacts, null, 2),
      'utf-8',
    );

    console.log(`Successfully added ${number} new contacts.`);
  } catch (error) {
    console.error('Error generating contacts:', error);
  }
};

await generateContacts(5);
