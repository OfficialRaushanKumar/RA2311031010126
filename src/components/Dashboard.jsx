import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = 'http://localhost:5000'

function Dashboard() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${API_BASE_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setProfile(response.data.user)
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Could not load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (loading) {
    return <div className="status-card">Loading dashboard...</div>
  }

  if (error) {
    return <div className="status-card error-state">{error}</div>
  }

  return (
    <section className="dashboard-card">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">You are logged in successfully.</p>
        </div>
        <button type="button" className="secondary-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="profile-grid">
        <div className="profile-item">
          <span>Name</span>
          <strong>{profile?.name}</strong>
        </div>
        <div className="profile-item">
          <span>Email</span>
          <strong>{profile?.email}</strong>
        </div>
        <div className="profile-item">
          <span>User ID</span>
          <strong>{profile?.id}</strong>
        </div>
      </div>
    </section>
  )
}

export default Dashboard