import express from 'express';

import { addTag, getTags } from '../controllers/tags';

const router = express.Router();

router.get('/', getTags);
router.post('/', addTag);

export default router;
