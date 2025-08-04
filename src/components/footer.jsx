import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-title"> <a href="/">CODIFIE</a></div>
        <div className="footer-socials">
          <a href="#" className='footer-links'>GitHub</a>
          <a href="#" className='footer-links'>LinkedIn</a>
          <a href="#" className='footer-links'>Twitter</a>
          <a href="#" className='footer-links'>Discord</a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; Codifie. Built with <i class="fa-solid fa-heart" style={{color:'#36E0FF'}}></i> By Afzal.
      </div>
    </footer>
  );
};

export default Footer;
