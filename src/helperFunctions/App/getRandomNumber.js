// Gets a random number from between and including min, max

const getRandomNumber = (min, max) => {
  const newMin = Math.ceil(min);
  const newMax = Math.ceil(max);
  return Math.floor(Math.random() * (newMax - newMin) + newMin);
};

export default getRandomNumber;
