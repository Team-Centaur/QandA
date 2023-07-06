import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ReviewsList from '../ReviewsList';

import * as metadataObjMock from '../../../../../__mocks__/reviewMetadataMock.js';
import * as reviewsObjMock from '../../../../../__mocks__/reviewsMock.js';


describe('Reviews list', () => {
  // props: reviews, page, loadMoreReviews(), allReviewsLoaded, changeSortOrder
  const reviews = reviewsObjMock.results;
  const page = 1;
  const allReviewsLoaded = false;
  const loadMoreReviews = jest.fn();
  const changeSortOrder = jest.fn();

  beforeEach(async () => {
    render(
      <ReviewsList
        reviews={reviews}
        page={page}
        allReviewsLoaded={allReviewsLoaded}
        loadMoreReviews={loadMoreReviews}
        changeSortOrder={changeSortOrder}
      />
    )
  });

  it('renders two reviews in list module', async () => {
    await act(async () => {
      const reviewTiles = await screen.findAllByTestId('reviewTile');
      expect(reviewTiles).toHaveLength(2);
    });
  });

  it('requests two more reviews on "show more reviews" button click', async () => {
    await act(async () => {
      const showMoreButton = await screen.findByRole('button', {name: 'Show more reviews'});
      expect(showMoreButton).toBeInTheDocument()
      fireEvent.click(showMoreButton);
      const reviewTiles = await screen.findAllByTestId('reviewTile');
      expect(loadMoreReviews).toHaveBeenCalled();
    });
  });

});