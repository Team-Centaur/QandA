import React from 'react';
import { FaStar } from 'react-icons/fa';

const Star = ({ filled }) => <FaStar color={filled ? 'black' : 'white'} />;
export default Star;
