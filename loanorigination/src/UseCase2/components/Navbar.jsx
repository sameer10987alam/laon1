import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Customer.css';

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('loanApplications');
      localStorage.removeItem('userProfile');
      alert('Logged out successfully!');
      navigate('/dashboard');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setShowDropdown(false);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container-fluid">
        <button
          className="navbar-brand p-0 border-0 bg-transparent"
          onClick={() => navigate('/dashboard')}
          aria-label="Home"
        >
          <img
            src="/logo192.png"
            alt="App logo"
            width="170"
            height="44"
            style={{ objectFit: 'contain', display: 'block' }}
          />
        </button>
        
        <div className="navbar-nav ms-auto">
          <div className="d-flex align-items-center gap-3">
            <span className="text-secondary small d-none d-sm-inline">Welcome</span>
            <div className="dropdown" ref={dropdownRef}>
              <button 
                className="btn d-flex align-items-center gap-2 py-1 px-2 bg-transparent border-0 text-primary"
                onClick={() => setShowDropdown(!showDropdown)}
                type="button"
                aria-label="User menu"
              >
                <i className="bi bi-person-circle fs-4"></i>
                <i className="bi bi-chevron-down fs-6"></i>
              </button>
              
              {showDropdown && (
                <div className="dropdown-menu dropdown-menu-end show position-absolute">
                  <div className="dropdown-item-text">
                    <strong>{user.name}</strong>
                    <br />
                    <small className="text-muted">{user.email}</small>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  <button 
                    className="dropdown-item" 
                    onClick={() => { navigate('/profile'); setShowDropdown(false); }}
                  >
                    <i className="bi bi-person me-2"></i>
                    Profile Settings
                  </button>
                  
                  <div className="dropdown-divider"></div>
                  
                  <button 
                    className="dropdown-item text-danger" 
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

