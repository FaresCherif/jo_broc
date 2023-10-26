// Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="social-links">
        <a href="https://www.facebook.com/votre-page-facebook" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-facebook"></i>
        </a>
        <a href="https://www.twitter.com/votre-page-twitter" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com/votre-page-instagram" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/in/votre-profil-linkedin" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-linkedin"></i>
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Votre Nom. Tous droits réservés.</p>
    </footer>
  );
}

export default Footer;