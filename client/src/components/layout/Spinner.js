import React from 'react';
import './Spinner.css';

/**
 * @function Spinner
 * @desc    Renders a loading spinner component with a ring animation and loading text.
 * @access  Public
 *
 * @returns {JSX.Element} - The rendered Spinner component containing an animated ring and a "loading..." text.
 */
const Spinner = () => (
  <div class='wrapper-spinner'>
    <div class='center-spiner'>
      <div class='ring-spinner'></div>
      <span class='text-spinner'>loading...</span>
    </div>
  </div>
);

export default Spinner;
