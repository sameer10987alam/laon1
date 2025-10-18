// components/Header/Header.js
import React from 'react';

import './Header.css';

const Header = ({
  sidebarOpen,
  setSidebarOpen,
  userMenuOpen,
  setUserMenuOpen,
  notificationOpen,
  setNotificationOpen,
  unreadNotificationsCount,
  notifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  handleLogout
}) => {
  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
       <h1>
  <img src="path_to_logo.png" alt="Standard Chartered" />
</h1>
      </div>
      <div className="user-info">
        <div className="user-menu">
          <button 
            className="user-btn"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <span>Maker</span>
            <span className="user-arrow">▼</span>
          </button>
          {userMenuOpen && (
            <div className="user-dropdown">
              <div className="user-profile">
                <div className="user-avatar">👤</div>
                <div className="user-details">
                  <strong>Maker User</strong>
                  <span>maker@bank.com</span>
                </div>
              </div>
              <div className="user-actions">
                <button className="logout-btn" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="notification-menu">
          <button 
            className="notification-btn"
            onClick={() => setNotificationOpen(!notificationOpen)}
          >
            🔔
            {unreadNotificationsCount > 0 && (
              <span className="notification-count">{unreadNotificationsCount}</span>
            )}
          </button>
          {notificationOpen && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h4>Notifications</h4>
                {unreadNotificationsCount > 0 && (
                  <button 
                    className="mark-all-read"
                    onClick={markAllNotificationsAsRead}
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="notification-list">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${notification.read ? 'read' : 'unread'} ${notification.type}`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="notification-message">
                      {notification.message}
                    </div>
                    <div className="notification-time">
                      {new Date(notification.timestamp).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                ))}
              </div>
              {notifications.length === 0 && (
                <div className="no-notifications">
                  No notifications
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;