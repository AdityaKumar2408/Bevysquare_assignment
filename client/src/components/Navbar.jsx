import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Ddsgnr Library.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="TODO Logo" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
