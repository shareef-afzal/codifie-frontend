import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-title"> <a href="/">CODIFIE</a></div>
        <div className="footer-socials">
          <a href="#" >GitHub</a>
          <a href="#" >LinkedIn</a>
          <a href="#" >Twitter</a>
          <a href="#" >Discord</a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; Codifie. Built with <i class="fa-solid fa-heart" style={{color:'#36E0FF'}}></i> By Afzal.
      </div>
    </footer>
  );
};

export default Footer;
