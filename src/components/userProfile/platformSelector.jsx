import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './platformSelector.css'
const PlatformSelector = ({ platforms, selected, onSelect }) => {
  return (
    <div className="d-flex gap-3 flex-wrap mb-3 justify-content-center mt-5">
      {platforms.map((platform) => (
        <button
          key={platform}
          className={`btn ${selected === platform ? 'btn-selected' : 'btn-not-selected'}`}
          onClick={() => onSelect(platform)}
        >
          {platform}
        </button>
      ))}
    </div>
  );
};

export default PlatformSelector;
