import { each } from 'underscore';
const getAvgRating = (ratingsObj) => {
  let totalVotes = 0;
  let totalRating = 0;
  console.log('START EACH');
  each(ratingsObj, (votes, key) => {
    console.log('IN EACH: ', votes, key);
    votes = Number.parseInt(votes);
    key = Number.parseInt(key);
    const keyTotal = key * votes;
    totalVotes += votes;
    totalRating += keyTotal;
  });

  console.log(totalRating, totalVotes);

  return (totalRating / totalVotes).toFixed(2);
};

export default getAvgRating;
