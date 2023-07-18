const fs = require('fs');

// Read the CSV file

module.exports = function () { fs.readFile('../../Data/Question.csv', 'utf8', (err, data) => {
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
    const dateObject = new Date(unixTimestamp);
    const formattedDate = dateObject.toISOString();
    values[3] = formattedDate;

    return values.join(',');
  });

  const convertedData = [header, ...convertedRows].join('\n');


  fs.writeFile('/QuestionConverted.csv', convertedData, 'utf8', err => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Conversion completed successfully.');
  });

});
};
