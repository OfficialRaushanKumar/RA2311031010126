import React from 'react'
import { Navigate, Route, Routes, Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Dashboard from './components/Dashboard.jsx'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

const PublicOnlyRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? <Navigate to="/dashboard" replace /> : children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
}

PublicOnlyRoute.propTypes = {
  children: PropTypes.node.isRequired
}

function App() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  return (
    <div className="app-shell">
      {!isAuthPage && (
        <header className="topbar">
          <Link to="/" className="brand">
            Campus Auth
          </Link>
          <nav className="nav-links">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
        </header>
      )}

      <main className="page-wrap">
        <Routes>
          <Route
            path="/"
            element={<Navigate to={localStorage.getItem('token') ? '/dashboard' : '/login'} replace />}
          />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicOnlyRoute>
                <Register />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App