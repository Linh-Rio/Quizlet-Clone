import React from 'react';
import { Link } from 'react-router-dom';

const SetNotFound = () => {
  return (
    <div>
      <h2>Set Not Found</h2>
      <Link to="/" style={{ color: 'blue' }}>
        Go to Home Page
      </Link>
    </div>
  );
};

export default SetNotFound;
