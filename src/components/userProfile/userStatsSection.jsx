import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlatformSelector from './PlatformSelector';
import PlatformStatsCard from './PlatformStatsCard';

const UserStatsSection = ({ statsByPlatform }) => {
  // Get only platforms with non-null data
  const platforms = Object.entries(statsByPlatform || {})
    .filter(([_, link]) => link)
    .map(([platform]) => platform);

  const [selectedPlatform, setSelectedPlatform] = useState("");

  // Update selectedPlatform whenever statsByPlatform changes
  useEffect(() => {
    if (platforms.length > 0) {
      setSelectedPlatform(platforms[0]);
    } else {
      setSelectedPlatform("");
    }
  }, [statsByPlatform]);

  const available = platforms.length > 0;

  return (
    <div className="container mt-4">
      <div className="card lowercard shadow-sm">
        {available ? (
          <>
            <PlatformSelector
              platforms={platforms}
              selected={selectedPlatform}
              onSelect={setSelectedPlatform}
            />
            <PlatformStatsCard
              platform={selectedPlatform}
              stats={statsByPlatform[selectedPlatform]}
            />
          </>
        ) : (
          <span align="center" style={{ padding: "20px", color: "grey" }}>
            No Profiles are Linked to Show the Stats. 
          </span>
        )}
      </div>
    </div>
  );
};

export default UserStatsSection;
