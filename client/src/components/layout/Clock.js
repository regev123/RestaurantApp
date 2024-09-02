import { useState, useEffect } from 'react';
import { format } from 'date-fns';

import './Clock.css';

const calculateElapsedTime = (createdAt) => {
  // Get current UTC time and created UTC time
  const now = new Date();
  const pastDate = new Date(createdAt);

  // Compute the time difference in milliseconds
  const timeDiff = now - pastDate;

  // Convert milliseconds to total seconds
  const totalSeconds = Math.floor(timeDiff / 1000);

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Format time as HH:mm:ss
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0'
  )}:${String(seconds).padStart(2, '0')}`;
};

const Clock = ({ createdAt, starterString }) => {
  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    const updateElapsedTime = () => {
      // Update the elapsed time in the HH:mm:ss format
      setElapsedTime(calculateElapsedTime(createdAt));
    };

    // Initial calculation
    updateElapsedTime();

    // Set up an interval to update the elapsed time every second
    const intervalId = setInterval(updateElapsedTime, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [createdAt]);

  return (
    <h6 className='clock-component-layout-text'>
      {starterString} {elapsedTime}
    </h6>
  );
};

export default Clock;
