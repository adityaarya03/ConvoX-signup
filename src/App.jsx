import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/SignupPage.jsx';
import './App.css'; // Assuming you have some global styles

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage/>} />
        {/* You can add other routes here */}
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </Router>
  );
}
