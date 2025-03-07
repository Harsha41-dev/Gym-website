import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/home');
});

router.get('/about', (req, res) => {
  res.render('pages/about');
});

router.get('/contact', (req, res) => {
  res.render('pages/contact');
});

router.get('/gallery', (req, res) => {
  res.render('pages/gallery');
});

export default router;