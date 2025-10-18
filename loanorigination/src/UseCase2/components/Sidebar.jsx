import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Customer.css';
 
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: 'bi bi-house', label: 'Dashboard' },
    { path: '/no-feature', icon: 'bi bi-file-earmark-text', label: 'Apply for Loan' },
    { path: '/applications', icon: 'bi bi-list-ul', label: 'My Applications' },
    { path: '/profile', icon: 'bi bi-person', label: 'Profile' }
  ];

  const isActive = (path) => {
    if (location.pathname === '/no-feature') return false;
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <ul className="nav flex-column">
          {menuItems.map(item => (
            <li key={item.path} className="nav-item">
              <button
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <i className={`${item.icon} me-2`}></i>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
