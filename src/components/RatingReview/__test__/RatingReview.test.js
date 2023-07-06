import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import RatingReview from '../RatingReview.jsx';

describe('Rating Review', () => {
  const currItemMock = {
    "id": 40439,
    "campus": "hr-rfp",
    "name": "Susanna Heels",
    "slogan": "Nobis rerum et quibusdam provident veniam.",
    "description": "Laudantium dolores rem non fugiat in eum rerum quae. Eveniet aut labore aut ut. Quaerat ut debitis velit maxime ut itaque libero rerum. Quaerat suscipit tempore at optio quia ut cum error. Sed et dolorem placeat nihil. Reiciendis est deserunt veritatis provident.",
    "category": "Heels",
    "default_price": "823.00",
    "created_at": "2021-08-13T14:38:44.588Z",
    "updated_at": "2021-08-13T14:38:44.588Z"
  };

  beforeEach(async () => {
    render(<RatingReview currItem={currItemMock}/>)
  });

  it('renders the four modules (Product Breakdown, Rating Breakdown, Reviews List, and Write Review)', async () => {
    const productBreakdownModule = await screen.findByTestId('productBreakdown');
    expect(productBreakdownModule).toBeInTheDocument();
    const ratingBreakdownModule = await screen.findByTestId('ratingBreakdown');
    expect(ratingBreakdownModule).toBeInTheDocument();
    const reviewsListModule = await screen.findByTestId('reviewsList');
    expect(reviewsListModule).toBeInTheDocument();
    const writeReviewsModule = await screen.findByTestId('writeReview');
    expect(writeReviewsModule).toBeInTheDocument();
  });

});