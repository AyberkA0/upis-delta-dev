import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './i18n'
import './index.css'

import ScrollToTop from './components/ScrollToTop'

import Login from './pages/user/Login'
import Register from './pages/user/Register'
import ForgotPassword from './pages/user/ForgotPassword'
import ResetPassword from './pages/user/ResetPassword'
import Dashboard from './pages/user/Dashboard' // TO DO
import DashboardWelcome from './pages/user/DashboardWelcome' // TO DO
import DashboardStrategy from './pages/user/DashboardStrategy' // TO DO
import Settings from './pages/user/Settings' // TO DO
import Help from './pages/user/Help' // MISSING CONTENT
import NewBlogPost from './pages/user/NewBlogPost'

import Terms from './pages/legal/Terms'
import Privacy from './pages/legal/Privacy'
import Cookies from './pages/legal/Cookies' 
import Security from './pages/legal/Security'

import Landing from './pages/general/Landing'
import FAQs from './pages/general/FAQs'
import Roadmap from './pages/general/Roadmap' // MISSING CONTENT
import Blog from './pages/general/Blog'
import BlogPost from './pages/general/BlogPost'
import Overview from './pages/general/Overview' // MISSING CONTENT

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token')
  return token ? <>{children}</> : <Navigate to="/login" replace />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Landing />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/blog/new" element={<NewBlogPost />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route index element={<DashboardWelcome />} />
          <Route path="strategy/:strategyId" element={<DashboardStrategy />} />
        </Route>

        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/security" element={<Security />} />

        <Route path="/overview" element={<Overview />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/faqs" element={<FAQs />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
