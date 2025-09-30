const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Load config
const config = require('./_config');

// Determine environment (default: development)
const env = process.env.NODE_ENV || 'development';
const mongoURI = config.mongoURI[env];

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(`✅ MongoDB connected to ${env} database`))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Initialize the app
const app = express();

// View Engine
app.set('view engine', 'ejs');

// Set up the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser (modern Express has this built-in)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', index);
app.use('/image', image);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});