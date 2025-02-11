import express from 'express';
import { companionDelete } from '../middleware/companions/companions';
import { companionUpdate } from '../middleware/companions/companions';
import { companionCreate } from '../middleware/companions/companions';
import { companionList } from '../middleware/companions/companions';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });


// CRUD
router.post('/create', upload.single('file'), companionCreate);
router.get('/list', companionList);
router.put('/update', companionUpdate);
router.delete('/delete', companionDelete);

export default router;

