/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import CurrContext from '../../../store/curr-item-context.jsx';
import {
  Star24Filled,
  Star24Regular,
  StarHalf24Filled,
  StarOneQuarter24Filled,
  StarThreeQuarter24Filled,
} from '@fluentui/react-icons';

import './Star.css';

const Star = ({ starAmount, theme }) => {
  const currCtx = useContext(CurrContext);

  if (starAmount) {
    const starClass = `star-themed ${starAmount < 1 ? 'partial' : ''} ${theme}`;
    if (starAmount >= 0.9) {
      return (
        <span className={starClass}>
          <Star24Filled />
        </span>
      );
    }
    if (starAmount >= 0.75 && starAmount < 0.9) {
      return (
        <span className={starClass}>
          <svg
            className={`star-svg star-themed ${theme}`}
            width="25"
            height="25"
            viewBox="0 0 28 28"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              {' '}
              <path className={`path-star ${currCtx.currTheme}`} d="M13.5524 3.10349C13.3552 3.20082 13.1955 3.36044 13.0982 3.55766L10.1743 9.48206L3.63637 10.4321C3.08983 10.5115 2.71113 11.0189 2.79055 11.5655C2.82218 11.7831 2.92466 11.9843 3.08215 12.1378L7.81306 16.7493L6.69625 23.2608C6.60289 23.8052 6.96847 24.3221 7.51281 24.4155C7.5399 24.4201 7.5671 24.4236 7.59432 24.426C7.78487 24.4428 7.97687 24.4046 8.1472 24.315L13.9949 21.2407L19.8427 24.315C19.9038 24.3471 19.9667 24.3723 20.0305 24.3908C20.4772 24.5203 20.9683 24.323 21.1931 23.8952C21.2059 23.8709 21.2177 23.8461 21.2284 23.821C21.3032 23.6449 21.3261 23.4505 21.2936 23.2609C21.2936 23.2608 21.2936 23.2609 21.2936 23.2609L20.1768 16.7493L24.9077 12.1378C24.9572 12.0896 25.0005 12.0375 25.0379 11.9826C25.2991 11.5977 25.2631 11.0697 24.9258 10.7237C24.7723 10.5662 24.5711 10.4637 24.3535 10.4321L17.8155 9.48206L14.8917 3.55766C14.7174 3.20459 14.3627 2.99989 13.9939 3C13.8454 3.00004 13.6946 3.03331 13.5524 3.10349ZM16.9897 21.1205V10.8778L23.1352 11.7708L18.5651 16.2256L19.644 22.5159L16.9897 21.1205Z" />{' '}
            </g>
          </svg>
        </span>
      );
    }
    if (starAmount >= 0.5 && starAmount < 0.75) {
      return (
        <span className={starClass}>
          <svg
            className={`star-svg star-themed ${theme}`}
            width="25"
            height="25"
            viewBox="0 0 28 28"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              {' '}
              <path className={`path-star ${currCtx.currTheme}`} d="M14.8915 3.55766C14.7942 3.36044 14.6346 3.20082 14.4374 3.10349C13.9421 2.85906 13.3425 3.0624 13.0981 3.55766L10.1742 9.48206L3.63623 10.4321C3.41859 10.4637 3.21745 10.5662 3.06394 10.7237C2.67844 11.1192 2.68653 11.7523 3.08202 12.1378L7.81294 16.7493L6.69612 23.2608C6.65894 23.4776 6.69426 23.7006 6.7966 23.8952C7.0536 25.3841 7.65822 25.572 8.14707 25.315L13.9948 21.2407L19.8425 25.315C20.0372 25.4173 20.2602 25.4527 20.4769 25.4155C21.0213 25.3221 21.3868 23.8052 21.2935 23.2608L20.1767 16.7493L24.9076 12.1378C25.0651 11.9843 25.1676 11.7831 25.1992 11.5655C25.2786 11.0189 25.8999 10.5115 25.3534 10.4321L17.8154 9.48206L14.8915 3.55766ZM14 19.5487V5.14053L16.8193 10.8531L23.1351 11.7708L18.5649 16.2256L19.6438 22.5159L14 19.5487Z" />{' '}
            </g>
          </svg>
        </span>
      );
    }
    return (
      <span className={starClass}>
        <svg
          className={`star-svg star-themed ${theme}`}
          width="25"
          height="25"
          viewBox="0 0 28 28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {' '}
            <path className={`path-star ${currCtx.currTheme}`} d="M14.8915 3.55766C14.7942 3.36044 14.6346 3.20082 14.4374 3.10349C13.9421 2.85906 13.3425 3.0624 13.0981 3.55766L10.1742 9.48206L3.63623 10.4321C3.41859 10.4637 3.21745 10.5662 3.06394 10.7237C2.67844 11.1192 2.68653 11.7523 3.08202 12.1378L7.81294 16.7493L6.69612 23.2608C6.65894 23.4776 6.69426 23.7006 6.7966 23.8952C7.0536 24.3841 7.65822 24.572 8.14707 24.315L13.9948 21.2407L19.8425 24.315C20.0372 24.4173 20.2602 24.4527 20.4769 24.4155C21.0213 24.3221 21.3868 23.8052 21.2935 23.2608L20.1767 16.7493L24.9076 12.1378C25.0651 11.9843 25.1676 11.7831 25.1992 11.5655C25.2786 11.0189 24.8999 10.5115 24.3534 10.4321L17.8154 9.48206L14.8915 3.55766ZM11 10.8778L11.1703 10.8531L13.9948 5.13L16.8193 10.8531L23.1351 11.7708L18.5649 16.2256L19.6438 22.5159L13.9948 19.546L11 21.1205V10.8778Z" />{' '}
          </g>
        </svg>
      </span>
    );
  }
  return null;
};
export default Star;
