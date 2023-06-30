import { each } from 'underscore';
const getAvgRating = (ratingsObj) => {
  let totalVotes = 0;
  let totalRating = 0;

  each(ratingsObj, (votes, key) => {
    votes = Number.parseInt(votes);
    key = Number.parseInt(key);
    const keyTotal = key * votes;
    totalVotes += votes;
    totalRating += keyTotal;
  });

  return (totalRating / totalVotes).toFixed(2);
};

export default getAvgRating;
