import React from 'react';

const ProgressBar = ({ step }) => {
  return (
    <div className="container mt-3">
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${(step - 1) * 33.33}%` }}
          aria-valuenow={step}
          aria-valuemin="1"
          aria-valuemax="4"
        >
          Step {step} of 4
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
