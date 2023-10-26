// Header.js
import React from 'react';
import './Header.css';

function Header() {
    return (
        <header>
            <div className="header-container">
                <div className="logo">
                    <h1>Uncle Joe Antiques</h1>
                </div>
                <a href="/contact" className="contact-button">Contactez-nous</a>
            </div>
        </header>
    );
}

export default Header;
