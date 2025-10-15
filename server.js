// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
require('dotenv').config(); // Load .env variables

// Routes
const index = require('./routes/index');
const image = require('./routes/image');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');

// Build MongoDB URI from environment variables
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_CLUSTER,
  MONGO_DB,
  MONGO_DB_DEV,
  MONGO_DB_TEST
} = process.env;

// Use development DB by default, can switch based on NODE_ENV
const dbName = process.env.NODE_ENV === 'test'
  ? MONGO_DB_TEST
  : process.env.NODE_ENV === 'development'
  ? MONGO_DB_DEV
  : MONGO_DB;

const MONGO_URI = `mongodb+srv://${encodeURIComponent(MONGO_USERNAME)}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_CLUSTER}/${dbName}?retryWrites=true&w=majority`;

// Silence deprecation warning
mongoose.set('strictQuery', true);

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4 // Force IPv4 DNS lookup to avoid ETIMEOUT
})
  .then(() => console.log(` Connected to MongoDB database: ${dbName}`))
  .catch(err => {
    console.error(' MongoDB connection error:', err);
    process.exit(1); 
  });

// Routes
app.use('/', index);
app.use('/image', image);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server is running at http://localhost:${PORT}`);
});

module.exports = app;
