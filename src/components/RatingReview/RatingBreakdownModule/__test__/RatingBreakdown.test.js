import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ratings } from '../../../../../__mocks__/reviewMetadataMock.js';
import RatingBreakdown from '../RatingBreakdown.jsx'

describe('Rating Breakdown', () => {
  // props: ratings, numOfReviews, sumOfReviews, onFilterClick
  const numOfReviews = 5;
  const sumOfReviews = 11;
  const onFilterClick = jest.fn();

  beforeEach(async() => {
    render(
      <RatingBreakdown
        ratings={ratings}
        numOfReviews={numOfReviews}
        sumOfReviews={sumOfReviews}
      />
    )
  });

  it('renders a tile displaying review numbers for each rating', async () => {
    const ratingTiles = await screen.findAllByTestId('starFilter');
    expect(ratingTiles).toHaveLength(5);
  })
});