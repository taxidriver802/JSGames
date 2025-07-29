import './Header.css';

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1 className="header__title">RETRO ARCADE</h1>
      </Link>
    </header>
  );
};

export default Header;
