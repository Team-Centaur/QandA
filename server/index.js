require('dotenv').config();
const express = require('express');
const compression = require('compression');
const path = require('path');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

app.use(morgan('dev'));
app.use(compression({ filter: shouldCompress }));
app.use(express.static(path.join(__dirname, '../dist')));

app.listen(PORT);
