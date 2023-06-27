const makeDatePretty = (date) => {
  // ACCEPTS DATE IN ISO 8601 FORMAT AND RETURNS 'month DD, YYYY'

  const months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  }
  let year = date.slice(0, 4)
  let month = date.slice(5, 7)
  let day = (date[8] !== '0') ? date.slice(8, 10) : date[9];
  return `${months[month]} ${day}, ${year}`;
}

export default makeDatePretty;