// controllers/questionController.js

const questionModel = require('../models/questionModel');

module.exports = {
  getAllQuestions: (req, res) => {
    questionModel.getAllQuestions()
      .then(result => res.json(result.rows))
      .catch(err => {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  },
  createQuestion: (req, res) => {
    console.log("This is a request body", req.body)
    console.log("This is a req", req)
    questionModel.createQuestion(req.body.text)
      .then(result => res.json(result.rows[0]))
      .catch(err => {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  },
  updateQuestion: (req, res) => {
    questionModel.updateQuestion(req.body.text, req.params.questionId)
      .then(result => {
        if (result.rows.length === 0) {
          res.status(404).json({ error: 'Question not found' });
        } else {
          res.json(result.rows[0]);
        }
      })
      .catch(err => {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  },
};



