import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ImageGallery from './ImageGallery.jsx';
import ThumbNailImage from './ThumbNailImages/ThumbNailImages.jsx';
import { mockStyles, mockStylesTwo } from '../../../../__mocks__/styleMock.js'
import { currentStyleMock, currentStyleMockTwo } from '../../../../__mocks__/currentStyleMock'
describe('ImageGallery', () => {
  const mockImage = 'image.jpg';
  const mockOnThumbnailImageHandler = jest.fn();
  const mockProps = {
    expandedView: false,
    onExpandedViewHandler: jest.fn(),
    currStyles: mockStyles,
    currentStyle: currentStyleMock,
  };
  const mockPropsTwo = {
    expandedView: false,
    onExpandedViewHandler: jest.fn(),
    currStyles: mockStylesTwo,
    currentStyle: currentStyleMockTwo
  }

  test('renders without errors', () => {
    render(<ImageGallery {...mockProps} />);
  });
  test('renders all thumbnail images', () => {
    const { getAllByTestId } = render(<ImageGallery {...mockProps} />);
    const thumbnailImages = getAllByTestId('thumbnail-image');
    expect(thumbnailImages.length).toBe(6);
  });
  test('clicking on thumbnail changes main image', () => {
    const { getAllByTestId, getByTestId } = render(<ImageGallery {...mockProps} />);
    const mainImage = getByTestId('main-image').src;
    const thumbnailImages = getAllByTestId('thumbnail-image');
    const imageSelecting = thumbnailImages[1];
    fireEvent.click(imageSelecting);
    const mainImageAfter = getByTestId('main-image').src;
    expect(mainImageAfter).not.toBe(mainImage);
  })
  test('clicking right arrow will change the mainImage', () => {
    const { getAllByTestId, getByTestId } = render(<ImageGallery {...mockProps} />);
    const mainImage = getByTestId('main-image');
    const preChange = mainImage.src;
    const rightArrow = getByTestId('right-arrow');
    const leftArrow = getByTestId('left-arrow');
    const thumbnailImages = getAllByTestId('thumbnail-image');
    const imageSelecting = thumbnailImages[1];

    fireEvent.click(rightArrow);
    const postChange = mainImage.src;
    expect(postChange).not.toBe(preChange);

  })
  test('clicking left arrow will change the mainImage', () => {
    const { getAllByTestId, getByTestId } = render(<ImageGallery {...mockProps} />);
    const mainImage = getByTestId('main-image');
    const preChange = mainImage.src;
    console.log('PRECHANGE', preChange)
    const rightArrow = getByTestId('right-arrow');
    const leftArrow = getByTestId('left-arrow');
    const thumbnailImages = getAllByTestId('thumbnail-image');
    const imageSelecting = thumbnailImages[1];

    fireEvent.click(rightArrow);
    const postChange = mainImage.src;
    console.log('POST CHANGE', postChange);
    expect(postChange).not.toBe(preChange);
    fireEvent.click(leftArrow);
    const backChange = mainImage.src;
    console.log('BACK CHANGE', backChange)
    expect(preChange).toBe(backChange);

  })
  test('clicking the fullscreen icon toggles the expanded view', () => {
    const { getAllByTestId, getByTestId } = render(<ImageGallery {...mockProps} />);
    const fullscreenIcon = getByTestId('fullscreen-icon');
    const imageGalleryContainer = getByTestId('image-gallery-container');

    // Initially, the expanded view should be false
    expect(imageGalleryContainer).not.toHaveClass('expanded-view');

    // Click the fullscreen icon to toggle the expanded view
      fireEvent.click(fullscreenIcon);


    // After clicking, the expanded view should be true

      expect(imageGalleryContainer).toHaveClass('expanded-view');


    // Click the fullscreen icon again to toggle back to normal view
    fireEvent.click(fullscreenIcon);

    // After clicking again, the expanded view should be false
    expect(imageGalleryContainer).not.toHaveClass('expanded-view');
  });

  test('clicking thumbnail will select it', () => {
    const {getByTestId} = render(
      <ThumbNailImage image ={mockImage} onThumbnailImageHandler ={ mockOnThumbnailImageHandler } />
    )
    const thumbnailImage = getByTestId('thumbnail-list');
    fireEvent.click(thumbnailImage);
    expect(mockOnThumbnailImageHandler).toHaveBeenCalledTimes(1);
    expect(mockOnThumbnailImageHandler).toHaveBeenCalledWith(mockImage);
  })
})