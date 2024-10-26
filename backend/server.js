const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todosRouter = require('./routes/Todos');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// API Routes
app.use('/todos', todosRouter);

// Default root route
app.get('/', (req, res) => {
  res.send('Welcome to the Todos API');
});

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
