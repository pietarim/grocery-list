import multer from 'multer';
import { Request, Response } from 'express';

export const getImageByName = async (name: string) => {
};

export const addImageController = async (req: Request, res: Response) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images');
    },
    filename: function (_req, file, cb) {
      cb(null, file.originalname);
    }
  });

  const upload = multer({ storage }).single('image');

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      throw new Error('Multer error');
      /* res.status(500).send('Something went wrong'); */
    } else if (err) {
      console.log(err);
      /* res.status(500).send('Something went wrong'); */
      throw new Error('Something went wrong');
    } else {
      res.status(201).send('Image uploaded');
    }
  });
};
