import { check } from 'express-validator';
import SalinTempel from '../model/salinTempel';

export const createSalinTempeValidator = [
  check('title').not().isEmpty().withMessage('First name is required'),
  check('content').not().isEmpty().withMessage('Last name is required'),
  // check if title is already taken
  check('title').custom(async (value) => {
    const salinTempel = await SalinTempel.findOne({ title: value });
    if (salinTempel) {
      return Promise.reject('Title is already taken');
    }
  }),
  // check if content is already taken
  check('content').custom(async (value) => {
    const salinTempel = await SalinTempel.findOne({ content: value });
    if (salinTempel) {
      return Promise.reject('Content is already taken');
    }
  }),
];
