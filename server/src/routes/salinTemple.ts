import express from 'express';

import {
  createSalinTempel,
  getRandomSalinTempel,
  getSalinTempels,
  deleteSalinTempel,
  likeSalinTempel,
} from '../controllers/salinTemple';

const router = express.Router();

router.get('/', getSalinTempels);
router.get('/random', getRandomSalinTempel);
router.post('/', createSalinTempel);
router.delete('/:id', deleteSalinTempel);
router.put('/:id/like/:userId', likeSalinTempel);

export default router;
