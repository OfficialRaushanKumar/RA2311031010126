import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const nextErrors = {}

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address'
    }

    if (!form.password) {
      nextErrors.password = 'Password is required'
    } else if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '' })
    setServerError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    try {
      setLoading(true)
      setServerError('')
      const response = await axios.post(`${API_BASE_URL}/login`, form)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      navigate('/dashboard')
    } catch (error) {
      setServerError(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-card">
      <h1>Login</h1>
      <p className="muted">Use your account to access the dashboard.</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </label>

        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </label>

        {serverError && <div className="server-error">{serverError}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="switch-link">
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
    </section>
  )
}

export default Login