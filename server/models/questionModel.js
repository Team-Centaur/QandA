const fs = require('fs');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: 'localhost',
  port: 3000,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

function convertCsv(csvFilePath, callback) {
  fs.readFile(csvFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const rows = data.split('\n');
    const header = rows[0];
    const rowsWithoutHeader = rows.slice(1);

    const convertedRows = rowsWithoutHeader.map(row => {
      const values = row.split(',');

      const unixTimestamp = parseFloat(values[3]) * 1000;
      const dateObject = isNaN(unixTimestamp) ? null : new Date(unixTimestamp);
      const formattedDate = dateObject ? dateObject.toISOString() : '';
      values[3] = formattedDate;

      return values.join(',');
    });

    const convertedData = [header, ...convertedRows].join('\n');
    callback(convertedData);
  });
}

function copyDataToDatabase(convertedData) {
  const copyQuery = `COPY questions(question_id, product_id, question_body, question_date, asker_name, asker_email, question_helpfulness, reported) FROM STDIN DELIMITER ',' CSV HEADER;`;

  pool.query(copyQuery, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Copying data from CSV...');

    const stream = pool.query(copyFrom(copyQuery));
    const csvStream = fs.createReadStream(convertedData);

    csvStream.on('error', (error) => {
      console.error(error);
      return;
    });

    csvStream.pipe(stream).on('finish', () => {
      console.log('Data copied successfully.');
      pool.end();
    });
  });
}

// Call the conversion function from convertCsv.js
convertCsv('/Users/mac/Desktop/fec-uranus/Data/Question.csv', (convertedData) => {
  copyDataToDatabase(convertedData);
});
