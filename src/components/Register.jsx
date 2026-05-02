import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const nextErrors = {}

    if (!form.name.trim()) {
      nextErrors.name = 'Name is required'
    }

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
      await axios.post(`${API_BASE_URL}/register`, form)
      navigate('/login')
    } catch (error) {
      setServerError(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-card">
      <h1>Register</h1>
      <p className="muted">Create your account to get started.</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          <span>Full Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </label>

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
            placeholder="Minimum 6 characters"
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </label>

        {serverError && <div className="server-error">{serverError}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p className="switch-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </section>
  )
}

export default Register