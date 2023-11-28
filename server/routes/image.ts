import express from 'express';
import path from 'path';
import { addImageController } from '../controllers/image';
import multer from 'multer';

const router = express.Router();

router.get('/:name', (_req, res) => {
  const { name } = _req.params;
  const imagePath = path.join(__dirname, `../images/${name}.png`);
  res.sendFile(imagePath);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});


const upload = multer({ storage: storage });

router.post('/', upload.single, addImageController);

export default router;