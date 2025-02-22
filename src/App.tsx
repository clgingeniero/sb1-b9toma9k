import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { AuthPage } from './components/AuthPage';
import { LandingPage } from './components/LandingPage';
import { ManagementView } from './components/ManagementView';
import { ViewMode } from './components/ViewMode';
import { Chatbot } from './components/Chatbot';
import { useAuth } from './context/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { authState } = useAuth();

  if (authState.loading) {
    return <div>Loading...</div>;
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/management"
            element={
              <PrivateRoute>
                <ManagementView />
              </PrivateRoute>
            }
          />
          <Route path="/view" element={<ViewMode />} />
        </Routes>
        <Chatbot />
      </AuthProvider>
    </Router>
  );
}

export default App;