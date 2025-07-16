import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  return (
    <header className="ems-header">
      <div className="ems-header__left">
        <span className="ems-header__brand">EmployeeManagement System</span>
      </div>
      <nav className="ems-header__nav">
        <Link className={`ems-header__link${location.pathname === '/login' ? ' active' : ''}`} to="/login">Login</Link>
        <Link className={`ems-header__link${location.pathname === '/logout' ? ' active' : ''}`} to="/logout">Logout</Link>
      </nav>
    </header>
  );
};

export default Header;
