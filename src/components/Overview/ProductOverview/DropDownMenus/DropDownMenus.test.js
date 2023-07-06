import QuantityMenu from './QuantitySelectorComponent/QuantityMenu.jsx'
import SizeMenu from './SizeSelectorComponent/SizeMenu.jsx';
import {screen, render, fireEvent, waitFor, act } from '@testing-library/react';
import { toBeVisible } from '@testing-library/jest-dom/extend-expect';
import React from 'react';

describe('Drop Down Menus', () => {
  const mockCurrentStyle = {
    skus: {
      sku1: { size: 'S', quantity: 10 },
      sku2: { size: 'M', quantity: 5 },
      sku3: { size: 'L', quantity: 0 },
    },
  };
  const mockCurrentStyleTwo = {
    skus: {
      sku1: { size: 'Xs', quantity: 10 },
      sku2: { size: 'M', quantity: 5 },
      sku3: { size: 'L', quantity: 0 },
    },
  };
  // I want to check if all the sizes are rendered on within in the dropdown menu
  test('Render all Sizes', () => {
    const setSizeSelected = jest.fn()
    // attach testId on all options and see if the length is equal to mockData
    const { getAllByTestId } = render (
      <SizeMenu
        currentStyle = {mockCurrentStyleTwo}
        setSizeSelected = {setSizeSelected}
      />
      )
      const styleOptions = getAllByTestId('select-option');
      // only 3(2 + 1 default option) will rendered since only 2 have sizes
      expect (styleOptions.length).toBe(3);
  })
  //
  test ('when size is selected it will update state of selected size', () => {
    const setSizeSelected = jest.fn()

    const { getAllByTestId, getByTestId, getByText, rerender } = render (
      <SizeMenu
        currentStyle = {mockCurrentStyle}
        setSizeSelected = {setSizeSelected}
      />
      )
      const styleSelector = getByTestId('sizes-selector');
      fireEvent.change(styleSelector, {target: {value: 'sku1'}}) // find an option with this value
      const selectedOption = getByText('S');
      expect (selectedOption).toBeVisible();
      expect(setSizeSelected).toHaveBeenCalledTimes(1);
  })

  // after rendered I want first option to be 'select size'
    // use style 1 first then switch to syle 2 and see if the first is
  test('First Option should be Select Size, after switching styles', () => {
    const setSizeSelected = jest.fn()

    const { getAllByTestId, getByTestId, getByText, rerender } = render (
      <SizeMenu
        currentStyle = {mockCurrentStyle}
        setSizeSelected = {setSizeSelected}
      />
      )
      const styleSelector = getByTestId('sizes-selector');
      fireEvent.change(styleSelector, {target: {value: 'sku1'}}) // find an option with this value
      const selectedOption = getByText('S');
      expect (selectedOption).toBeVisible();

      rerender(
        <SizeMenu
          currentStyle = {mockCurrentStyleTwo}
          setSizeSelect = {setSizeSelected}
        />
      )

      const defaultOption = getByText('Select Size');
      expect(defaultOption).toBeVisible();
  } )
  // Switch from style 1 to style and the sizes are of style 2
  test('changing styles changes the sizes', () => {
    const setSizeSelected = jest.fn()

    const { getAllByTestId, getByTestId, getByText, rerender } = render (
      <SizeMenu
        currentStyle = {mockCurrentStyle}
        setSizeSelected = {setSizeSelected}
      />
      )
      const styleSelector = getByTestId('sizes-selector');
      const sizeOptions = getAllByTestId('select-option');
      rerender(
        <SizeMenu
          currentStyle = {mockCurrentStyleTwo}
          setSizeSelect = {setSizeSelected}
        />
      )
      const sizesStyle2 = getAllByTestId('sizes-selector');
      expect(sizeOptions).not.toBe(sizesStyle2);
  })
})

describe('Quantity Menu' , () => {
  const mockSizeSelected = ['sku1', {'quantity': 7}];
  const mockSizeSelectedTwo = ['sku1', {'quantity': 25}];

  const mockCurrentStyle = {
    skus: {
      sku1: { size: 'S', quantity: 10 },
      sku2: { size: 'M', quantity: 5 },
      sku3: { size: 'L', quantity: 0 },
    },
  }
  test('if more than 15 quantity, should only show till 15', () => {
    const setQuantitySelected = jest.fn()

    const { getByTestId, getAllByTestId } = render(
      <QuantityMenu
        currentStyle ={mockCurrentStyle}
        sizeSelected={mockSizeSelectedTwo}
        setQuantitySelected={setQuantitySelected}
      />
      )
      const allQuantityOptions = getAllByTestId('quantity-option');
      expect (allQuantityOptions.length).toBe(15);
  })

  test('if quantity selected, should setTheQuantity', () => {
    const setQuantitySelected = jest.fn()

    const { getByTestId, getAllByTestId } = render(
      <QuantityMenu
        currentStyle ={mockCurrentStyle}
        sizeSelected={mockSizeSelectedTwo}
        setQuantitySelected={setQuantitySelected}
      />
      )
      const selector =  getByTestId('quantity-selector');
      fireEvent.change(selector, {target: {value: 2}});
      expect(setQuantitySelected).toHaveBeenCalledTimes(1);
      expect(setQuantitySelected).toHaveBeenCalledWith('2');
  })

  test('after size has been changed the option on screen should be 1', () => {
    const setQuantitySelected = jest.fn()

    const { getByTestId, getAllByTestId, rerender, getByText } = render(
      <QuantityMenu
        currentStyle ={mockCurrentStyle}
        sizeSelected={mockSizeSelectedTwo}
        setQuantitySelected={setQuantitySelected}
      />
      )
      const selector =  getByTestId('quantity-selector');
      fireEvent.change(selector, {target: {value: 2}});
      rerender(
        <QuantityMenu
        currentStyle ={mockCurrentStyle}
        sizeSelected={mockSizeSelectedTwo}
        setQuantitySelected={setQuantitySelected}
      />
      )
      const defaultOption = getByText('1');
      expect(defaultOption).toBeVisible();
  })
})