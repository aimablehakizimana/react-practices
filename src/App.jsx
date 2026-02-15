import { useState } from 'react'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import MainApp from './components/MainApp'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentUser, setCurrentUser] = useState('')

  const handleLogin = (username) => {
    setIsLoggedIn(true)
    setCurrentUser(username || 'user')
    setIsAdmin(!!username)
  }

  const handleLogout = async () => {
    console.log('Logout called for user:', currentUser)
    if (currentUser) {
      await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: currentUser })
      }).catch(() => {})
    }
    setIsLoggedIn(false)
    setIsAdmin(false)
    setCurrentUser('')
    setSidebarOpen(false)
    console.log('Logout complete, should show login')
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  if (isAdmin) {
    return <AdminDashboard onLogout={handleLogout} />
  }

  return (
    <MainApp 
      currentUser={currentUser} 
      handleLogout={handleLogout} 
      sidebarOpen={sidebarOpen} 
      setSidebarOpen={setSidebarOpen} 
    />
  )
}

export default App