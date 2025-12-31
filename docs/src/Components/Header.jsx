import React from "react";
import "./Header.css";


function Header() {

  

  return (
    <header>
      <div className="navbar">

        {/* LOGO SECTION */}
        <div className="logo">
          <img
            src="/CompanyLogoForWebPage.jpg"
            alt="Kanan Biotech Logo"
            className="logo-img"
          />
          <span>Kanan</span> Biotech Pvt. Ltd.
        </div>

        {/* NAVIGATION */}
        <nav>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Solutions</a></li>
            <li><a href="#">Knowledge Center</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>

        {/* CTA BUTTON */}
        <a href="#" className="btn">Get Free Samples</a>
      </div>
    </header>
  );
}

export default Header;
