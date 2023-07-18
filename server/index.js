require('dotenv').config();
const express = require('express');
const compression = require('compression');
const path = require('path');
const morgan = require('morgan');

const questionController = require('./controllers/questionController'); // Add this line to import the controller

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 4000;

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

app.get('/tacos', (req, res) => {
  res.send('you got tacos')
})


app.get('/api/questions', questionController.getAllQuestions);
app.post('/api/questions', questionController.createQuestion);
app.put('/api/questions/:questionId', questionController.updateQuestion);

app.use(morgan('dev'));
app.use(compression({ filter: shouldCompress }));
app.use(express.static(path.join(__dirname, '../dist')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
