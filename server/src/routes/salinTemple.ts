import express from 'express';

import {
  createSalinTempel,
  getRandomSalinTempel,
  getSalinTempels,
  deleteSalinTempel,
} from '../controllers/salinTemple';

const router = express.Router();

router.get('/', getSalinTempels);
router.get('/random', getRandomSalinTempel);
router.post('/', createSalinTempel);
router.delete('/:id', deleteSalinTempel);

export default router;
