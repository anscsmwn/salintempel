import express from 'express';

import {
  createSalinTempel,
  getRandomSalinTempel,
  getSalinTempels,
  deleteSalinTempel,
  likeSalinTempel,
  getMyFavoriteSalinTempels,
  getMySalinTempels,
} from '../controllers/salinTemple';
import { createSalinTempeValidator } from '../lib/validator';

const router = express.Router();

router.get('/', getSalinTempels);
router.get('/random', getRandomSalinTempel);
router.get('/my-favorite/:userId', getMyFavoriteSalinTempels);
router.get('/my/:userId', getMySalinTempels);
router.post('/', createSalinTempeValidator, createSalinTempel);
router.delete('/:id', deleteSalinTempel);
router.put('/:id/like/:userId', likeSalinTempel);

export default router;
