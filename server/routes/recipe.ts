import express from 'express';
import recipeService from '../controllers/recipeService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('fetch all recipes');
});