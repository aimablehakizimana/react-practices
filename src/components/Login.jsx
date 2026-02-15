import { useState, useEffect } from 'react'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [error, setError] = useState('')
  const [socialMedia, setSocialMedia] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/social-media')
      .then(res => res.json())
      .then(data => setSocialMedia(data))
      .catch(() => {})
  }, [])

  const handleToggleSignup = () => {
    setIsSignup(!isSignup)
    setIsForgotPassword(false)
    setError('')
    setUsername('')
    setPassword('')
    setEmail('')
    setFullName('')
    setPhone('')
    setConfirmPassword('')
  }

  const handleToggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword)
    setIsSignup(false)
    setError('')
    setUsername('')
    setPassword('')
    setEmail('')
    setConfirmPassword('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (isForgotPassword) {
      if (password !== confirmPassword) {
        setError('Passwords do not match!')
        return
      }
      try {
        const res = await fetch('http://localhost:3000/api/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, newPassword: password })
        })
        const data = await res.json()
        if (data.success) {
          setIsForgotPassword(false)
          setUsername('')
          setPassword('')
          setEmail('')
          setConfirmPassword('')
          setError('Password reset successful! Please login.')
        } else {
          setError(data.message)
        }
      } catch (err) {
        setError('Failed to reset password')
      }
      return
    }
    
    if (isSignup) {
      if (password !== confirmPassword) {
        setError('Passwords do not match!')
        return
      }
      try {
        const res = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, email, fullName, phone })
        })
        const data = await res.json()
        if (data.success) {
          setIsSignup(false)
          setUsername('')
          setPassword('')
          setEmail('')
          setFullName('')
          setPhone('')
          setConfirmPassword('')
          setError('Account created! Please login.')
        } else {
          setError(data.message)
        }
      } catch (err) {
        setError('Cannot connect to server. Please make sure the backend is running.')
      }
    } else {
      try {
        // Check if this is admin login
        const isAdminLogin = username === 'aimable'
        const endpoint = isAdminLogin ? '/api/admin-login' : '/api/login'
        
        const res = await fetch(`http://localhost:3000${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })
        const data = await res.json()
        if (data.success) {
          onLogin(isAdminLogin ? username : null)
        } else {
          setError(data.message)
        }
      } catch (err) {
        setError('Cannot connect to server. Please make sure the backend is running.')
      }
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>{isForgotPassword ? 'Reset Password' : isSignup ? 'Create Account' : 'Garden TSS Login'}</h1>
        {error && <div style={{ padding: '10px', marginBottom: '15px', background: error.includes('created') || error.includes('successful') ? '#d4edda' : '#f8d7da', color: error.includes('created') || error.includes('successful') ? '#155724' : '#721c24', borderRadius: '4px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </>
          )}
          {isForgotPassword && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={isForgotPassword ? 'New Password' : 'Password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {isSignup && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          {isForgotPassword && (
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button type="submit">{isForgotPassword ? 'Reset Password' : isSignup ? 'Sign Up' : 'Login'}</button>
        </form>
        {!isForgotPassword && (
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#6c757d' }}>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button 
              type="button"
              onClick={handleToggleSignup}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#3498db', 
                cursor: 'pointer', 
                marginLeft: '5px',
                textDecoration: 'underline'
              }}
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </button>
          </p>
        )}
        {!isSignup && (
          <p style={{ textAlign: 'center', marginTop: '10px' }}>
            <button 
              type="button"
              onClick={handleToggleForgotPassword}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#3498db', 
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '14px'
              }}
            >
              {isForgotPassword ? 'Back to Login' : 'Forgot Password?'}
            </button>
          </p>
        )}
        {socialMedia.length > 0 && (
          <div className="social-media-links">
            {socialMedia.map(sm => (
              <a key={sm.id} href={sm.url} target="_blank" rel="noopener noreferrer">
                {sm.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Login