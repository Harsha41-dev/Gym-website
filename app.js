// app.js
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Connect to MongoDB
import './config/database.js';

// Import routes
import indexRoutes from './routes/index.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import trainerRoutes from './routes/trainerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// View engine setup
app.set('view engine', 'ejs');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false
}));

// Mount routes
app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/user', userRoutes);
app.use('/trainer', trainerRoutes);
app.use('/admin', adminRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});