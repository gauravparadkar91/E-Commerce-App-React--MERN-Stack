// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());

//Cors
app.use(cors()); 

// Routes
app.use('/api/auth', authRouter);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
