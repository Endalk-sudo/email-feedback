// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/waitingList', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model for the submissions
const submissionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  feedback: { type: String, required: true },
});

const Submission = mongoose.model('Submission', submissionSchema);

// Route to handle form submissions
app.post('/api/submit-email', async (req, res) => {
  const { email, feedback } = req.body;

  try {
    const newSubmission = new Submission({ email, feedback });
    await newSubmission.save();
    res.status(201).json({ message: 'Submission received', data: newSubmission });
  } catch (error) {
    res.status(500).json({ message: 'Error saving submission', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});