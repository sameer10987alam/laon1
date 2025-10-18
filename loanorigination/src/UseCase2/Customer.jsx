import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // ✅ Removed BrowserRouter
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MyApplications from './components/MyApplications';
import Profile from './components/Profile';
import ApplicationDetails from './components/ApplicationDetails';
import NoFeature from './components/nofeature';
import './styles/Customer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import JSON data
import applicationsData from './data/applications.json';

function Customer() {
  const dummyUser = {
    id: 1,
    name: "Ram",
    email: "ram@example.com",
    phone: "+91 98765 43211",
    dob: "1992-08-22",
  };

  const dummyApplications = [
    {
      id: 1001,
      userId: 1,
      loanType: "Personal Loan",
      amount: 500000,
      tenure: 36,
      monthlyIncome: 75000,
      employmentType: "Salaried",
      purpose: "Home renovation and furniture purchase",
      status: "Pending",
      appliedDate: "10/10/2025",
      estimatedEMI: 16607,
      interestRate: 12.0,
      remarks: "Application is under initial review by our loan processing team",
    },
    {
      id: 1002,
      userId: 1,
      loanType: "Vehicle Loan",
      amount: 800000,
      tenure: 60,
      monthlyIncome: 75000,
      employmentType: "Salaried",
      purpose: "Purchase new car - Honda City",
      status: "Rejected",
      appliedDate: "05/10/2025",
      estimatedEMI: 17867,
      interestRate: 10.5,
      remarks:
        "Application rejected due to insufficient income documentation. Please provide latest 3 months salary slips and bank statements to proceed with reapplication.",
    },
  ];

  // ===== State Management =====
  const [user, setUser] = useState(dummyUser);
  const [applications, setApplications] = useState(dummyApplications);

  useEffect(() => {
    // Load user profile from localStorage or use dummy data
    const storedUser = localStorage.getItem('userProfile');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Load applications from localStorage or initialize with JSON data
    const storedApplications = localStorage.getItem('loanApplications');
    if (storedApplications) {
      setApplications(JSON.parse(storedApplications));
    } else {
      const userApplications = applicationsData.applications.filter(
        (app) => app.userId === 1
      );
      setApplications(userApplications);
      localStorage.setItem('loanApplications', JSON.stringify(userApplications));
    }
  }, []);

  // ===== Loading Spinner =====
  if (!user) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // ===== Main Layout =====
  return (
    <div className="app-container">
      {/* Navbar and Sidebar are persistent across all pages */}
      <Navbar user={user} />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <Routes>
            {/* Default route redirects to dashboard */}
            <Route path="/" element={<Navigate to="dashboard" replace />} />

            <Route
              path="dashboard"
              element={<Dashboard applications={applications} user={user} />}
            />

            <Route
              path="applications"
              element={<MyApplications applications={applications} />}
            />

            <Route
              path="profile"
              element={<Profile user={user} setUser={setUser} />}
            />

            <Route path="application-details" element={<ApplicationDetails />} />

            <Route path="no-feature" element={<NoFeature />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Customer;
