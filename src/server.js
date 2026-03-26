const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const contactsRoutes = require('./routes/contacts.routes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Allow cross-origin requests from the React frontend.
app.use(cors());

// Parse incoming JSON.
app.use(express.json());

app.get('/health', (req, res) => {
  return res.status(200).json({ ok: true });
});

// REST API: /api/contacts
app.use('/api/contacts', contactsRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  return res.status(404).json({ message: 'Route not found' });
});

// Error handler for API errors
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in environment variables.');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

