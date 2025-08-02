import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RatingsChart from '../charts/ratingsChart';
import HeatmapSection from './heatmap';
import './platformStatsCard.css'
const PlatformStatsCard = ({ platform, stats }) => {
  if (!stats) return <p>No stats available for {platform}</p>;

  const {
    currentRating,
    currentRank,
    maxRating,
    problemsSolved,
    contests,
    // Later we can pass heatmap data and chart data too
  } = stats;

  return (
    <div className=" p-4 m-3 mt-0">
      <h4 className="mb-3" style={{fontWeight:"bold", fontSize:"2rem"}}>{platform} Stats</h4>

      {/* Row 1: Ratings Graph | Ratings Box | Problems Solved */}
      <div className="row g-3 mb-3">
        {/* Ratings Graph */}
        {/* Ratings Graph */}
        <div className="col-lg-6">
            <div className="uppercard rounded p-3 h-100 ">
                <RatingsChart data={stats.ratingHistory} />
            </div>
        </div>


        {/* Ratings Info */}
        <div className="col-lg-3">
          <div className="uppercard rounded p-3 h-100 card-info">
              <h6 className="card-title">Current Rank</h6>
              <p className="fw-bold card-data">{currentRank}</p>
              <h6 className="card-title">Current Rating</h6>
              <p className="fw-bold card-data">{currentRating}</p>
          </div>
        </div>

        {/* Total Problems Solved */}
        <div className="col-lg-3">
          <div className="uppercard rounded p-3 h-100 card-info">
            <h6 className='card-title'>Total Problems</h6>
            <h2 className='fw-bold card-data'>{problemsSolved}</h2>
            <h6 className="card-title">Max Rating&nbsp;&nbsp;&nbsp;&nbsp;</h6>
            <p className="fw-bold card-data">{maxRating}</p>
          </div>
        </div>
      </div>

     {/* Row 2: Contests + Heatmap */}
        <div className="row g-3">
            {/* Total Contests */}
            <div className="col-lg-3">
                <div className="uppercard rounded p-3 h-100 d-flex flex-column justify-content-center align-items-center ">
                <h6 className='card-title'>Total Contests</h6>
                <h2 className='card-data'>{contests}</h2>
                </div>
            </div>

            {/* Heatmap */}
             <div className="col-lg-9">
              <div className="uppercard rounded  p-3">
                <HeatmapSection
                  data={stats.heatmap}
                />
              </div>
            </div>
        </div>
    </div>
  );
};

export default PlatformStatsCard;
