import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './userTopSection.css';
import { color } from 'chart.js/helpers';
const UserTopSection = ({ user }) => {
  const {
    profilePic,
    username,
    institute,
    profileLinks={},
    totalSolved,
    friendOf,
  } = user;

  return (
    <div className="container mt-4">
      <div className="row g-3">
        {/* Profile Info (Left) */}
        <div className="col-md-6 col-lg-4">
          <div className="card lowercard h-100 shadow-sm p-3">
            <div className="d-flex align-items-center">
              <img
                src={profilePic}
                alt="Profile"
                className="rounded-circle me-3"
                style={{ width: '90px', height: '90px', objectFit: 'cover'}}
              />
              <div>
                <h5 className="mb-0" style={{fontSize:"2rem", fontWeight:"bold"}}>{username}</h5>
                <small style={{fontSize:"0.875rem", color:"grey"}}>{institute}</small>
                <div className="mt-1" style={{fontSize:"0.875rem", color:"grey"}}>
                  Friend of <strong>{friendOf}</strong> users
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Problems Solved (Middle) */}
        <div className="col-md-6 col-lg-4">
          <div className="card lowercard h-100 shadow-sm p-3 d-flex align-items-center justify-content-center text-center">
            <div>
              <h6 style={{fontSize:"0.875rem", color:"grey"}}>Total Problems Solved</h6>
              <h2 style={{fontSize:"2rem", fontWeight:"bold"}}>{totalSolved}</h2>
            </div>
          </div>
        </div>

        {/* Profile Links (Bottom Full Row) */}
        <div className="col-12 col-lg-4">
  <div className="card lowercard h-100 shadow-sm p-3 d-flex align-items-center justify-content-center text-center">
    <h6 className="mb-2" style={{fontSize:"1rem", color:"grey"}}>Profiles</h6>
    <div className="d-flex flex-wrap gap-2">
      {Object.entries(profileLinks).filter(([_, link]) => link).length > 0 ? (
        Object.entries(profileLinks).map(([platform, link]) =>
          link ? (
            <a
              key={platform}
              href={link}
              target="_blank"
              rel="noreferrer"
              // className="btn btn-outline-primary btn-sm"
            className='profile-links'>
              {platform}
            </a>
          ) : null
        )
      ) : (
        <span style={{color:"grey"}}>No profiles are added</span>
      )}
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default UserTopSection;
