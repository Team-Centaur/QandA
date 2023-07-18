// const { Pool } = require('pg');


// const pool = new Pool({
//   host: 'localhost',
//   port: 3000,
//   user: 'your_username',
//   password: 'your_password',
//   database: 'your_database_name',
// });


// app.get('/api/questions', (req, res) => {
//   pool.query('SELECT * FROM questions', (err, result) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       res.json(result.rows);
//     }
//   });
// });


// app.post('/api/questions', (req, res) => {
//   const text = req.body.text;

//   pool.query('INSERT INTO questions (text) VALUES ($1) RETURNING *', [text], (err, result) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       res.json(result.rows[0]);
//     }
//   });
// });


// app.put('/api/questions/:questionId', (req, res) => {
//   const questionId = req.params.questionId;
//   const text = req.body.text;

//   pool.query('UPDATE questions SET text = $1 WHERE id = $2 RETURNING *', [text, questionId], (err, result) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else if (result.rows.length === 0) {
//       res.status(404).json({ error: 'Question not found' });
//     } else {
//       res.json(result.rows[0]);
//     }
//   });
// });


// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ error: 'Internal Server Error' });
// });


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
