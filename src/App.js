// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Assuming you use Redux for state management
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import UserManagementPage from './components/UserManagement/UserManagementPage';
import Layout from './components/Layout';
import FormPage from './components/DynamicForm/FormPage';
import { isAuthenticated } from './utils/auth';

const App = () => {
  // const isAuthenticatedUser = useSelector(state => state.auth.isAuthenticated); // Get authentication status from Redux or wherever you store it

  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Redirect root to dashboard if authenticated */}

          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={isAuthenticated() ? <Layout><Dashboard /></Layout> : <Navigate to="/login" />}
          />
          <Route
            path="/user-management"
            element={isAuthenticated() ? <Layout><UserManagementPage /></Layout> : <Navigate to="/login" />}
          />
          <Route
            path="/dynamic-form"
            element={isAuthenticated() ? <Layout><FormPage /></Layout> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
