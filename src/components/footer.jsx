import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-title"> <a href="/">CODIFIE</a></div>
        <div className="footer-socials">
          <a className='footer-links' target='_blank' href="https://www.linkedin.com/in/afzal-shareef-aa516a2a9/" >LinkedIn</a>
          <a className='footer-links' target='_blank' href="mailto:afzalshareef1005@gmail.com" >GMail</a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; Codifie. Built with <i class="fa-solid fa-heart" style={{color:'#36E0FF'}}></i> By Afzal.
      </div>
    </footer>
  );
};

export default Footer;
