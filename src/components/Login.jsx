import { useState } from 'react'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [accounts, setAccounts] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignup) {
      if (password !== confirmPassword) {
        alert('Passwords do not match!')
        return
      }
      setAccounts([...accounts, { username, password, email, fullName, phone }])
      alert('Account created! Please login.')
      setIsSignup(false)
      setUsername('')
      setPassword('')
      setEmail('')
      setFullName('')
      setPhone('')
      setConfirmPassword('')
    } else {
      const account = accounts.find(acc => acc.username === username && acc.password === password)
      if (account || (username && password)) {
        onLogin()
      } else {
        alert('Invalid credentials')
      }
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>{isSignup ? 'Create Account' : 'Garden TSS Login'}</h1>
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
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
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
          <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#6c757d' }}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button 
            onClick={() => setIsSignup(!isSignup)}
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
      </div>
    </div>
  )
}

export default Login