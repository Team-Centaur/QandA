import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AllStyles from './AllStyles.jsx';
import IndividualStyleComponent from './IndividualStyleComponent.jsx';
describe ('AllStyles Component' , () =>{
const mockStyles = [
  { style_id: 1, name: 'Style 1', sale_price: null, photos: [{thumbnail_url:''}] },
  { style_id: 2, name: 'Style 2', sale_price: 10.99, photos: [{thumbnail_url:''}] },
  { style_id: 3, name: 'Style 3', sale_price: 15.99, photos: [{thumbnail_url:''}] },
]

// write a test to check if all styles are rendered
  test('all styles are rendered', () => {
    const setCurrentStyle = jest.fn();
    const setOnSale = jest.fn();

    const { getAllByTestId } = render(
      <AllStyles
        styles={mockStyles}
        setCurrentStyle={setCurrentStyle}
        setOnSale={setOnSale}
      />
    )
    const styleComponents = getAllByTestId('individual-style-component');
    // Since there would be 3 of these after rendering AllStyles the length would be 3
    expect (styleComponents.length).toBe(mockStyles.length)

    expect (setOnSale).toHaveBeenCalledTimes(0);
    expect (setCurrentStyle).toHaveBeenCalledTimes(0);

  })
// write a test to check if item on sale sets activates the setOnsale
  test('clicking on a sale item will set onSale to true ', () => {
    const setCurrentStyle = jest.fn();
    const setOnSale = jest.fn();

    const { getAllByTestId } = render(
      <AllStyles
        styles={mockStyles}
        setCurrentStyle={setCurrentStyle}
        setOnSale={setOnSale}
      />
    )
    const styleComponents = getAllByTestId('individual-style-component');
    const onSaleItem = styleComponents[1];
    // fire event onSaleItem and have onSale to be true
    fireEvent.click(onSaleItem);


    expect (setOnSale).toHaveBeenCalledTimes(1);
    expect (setOnSale).toHaveBeenCalledWith(true);
    expect (setCurrentStyle).toHaveBeenCalledTimes(1);

  })
// write a test to check if item not on sale sets the curr style and seIsSelected
  test('item not on sale should not setOnSale to true', () => {
    const setCurrentStyle = jest.fn();
    const setOnSale = jest.fn();
    const { getAllByTestId } = render(
      <AllStyles
        styles={mockStyles}
        setCurrentStyle={setCurrentStyle}
        setOnSale={setOnSale}
      />
    );
    const styleComponents = getAllByTestId("individual-style-component");
    const onSaleItem = styleComponents[1];
    const noSaleItem = styleComponents[0];
    fireEvent.click(onSaleItem);

    expect (onSaleItem.getAttribute("class")).toContain('style-selected');
    expect (setOnSale).toHaveBeenCalledTimes(1);
    expect (setOnSale).toHaveBeenCalledWith(true);
    expect (setCurrentStyle).toHaveBeenCalledTimes(1);
    fireEvent.click(noSaleItem);
    expect (setOnSale).toHaveBeenCalledTimes(2);
    expect (setOnSale).toHaveBeenCalledWith(false);
    expect (setCurrentStyle).toHaveBeenCalledTimes(2);
  })
})


// write a test when no styles there in nothing rendered