import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './i18n'
import './index.css'

import Login from './pages/user/Login'
import Register from './pages/user/Register'
import ForgotPassword from './pages/user/ForgotPassword'
import ResetPassword from './pages/user/ResetPassword'
import Dashboard from './pages/user/Dashboard' // TO DO
import Settings from './pages/user/Settings' // TO DO
import Help from './pages/user/Help' // TO DO

import Terms from './pages/legal/Terms'
import Privacy from './pages/legal/Privacy'
import Cookies from './pages/legal/Cookies' 
import Security from './pages/legal/Security'

import Landing from './pages/general/Landing'
import FAQs from './pages/general/FAQs'
import Roadmap from './pages/general/Roadmap' // TO DO
import Blog from './pages/general/Blog' // TO DO
import Overview from './pages/general/Overview' // TO DO

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token')
  return token ? <>{children}</> : <Navigate to="/login" replace />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />

        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/security" element={<Security />} />

        <Route path="/overview" element={<Overview />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/faqs" element={<FAQs />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
