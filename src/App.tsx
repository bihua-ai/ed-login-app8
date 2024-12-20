import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import SynapseLogin from './pages/SynapseLogin';
import SynapseRegister from './pages/SynapseRegister';
import FramePage from './components/FramePage';
import SwitchBox from './components/SwitchBox';
import FrameLayout from './components/FrameLayout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Redirect root to login if not authenticated */}
            <Route path="/" element={<Navigate to="/matrix/login" replace />} />
            
            {/* Auth routes */}
            <Route path="/matrix/login" element={<SynapseLogin />} />
            <Route path="/matrix/register" element={<SynapseRegister />} />

            {/* Protected routes */}
            <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
              <Route path="/dashboard" element={<FrameLayout />} />
              <Route path="/page1" element={<FramePage src="/pages/page1.html" />} />
              <Route path="/page2" element={<FramePage src="/pages/page2.html" />} />
              <Route path="/page3" element={<FramePage src="/pages/page3.html" />} />
              <Route path="/page4" element={<FramePage src="/pages/page4.html" />} />
              <Route path="/page5" element={<FramePage src="/pages/page5.html" />} />
              <Route path="/switch-box" element={<SwitchBox />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;