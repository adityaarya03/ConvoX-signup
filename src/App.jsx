import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatWidgetPreview from './pages/ChatWidgetPreview.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ChatWidget from './pages/ChatWidget.jsx';
import './App.css'; // Assuming you have some global styles

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage/>} />
        {/* You can add other routes here */}
        <Route path="/preview-chat-widget" element={<ChatWidgetPreview />} />
        <Route path="/chat-widget" element={<ChatWidget />} />
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </Router>
  );
}
