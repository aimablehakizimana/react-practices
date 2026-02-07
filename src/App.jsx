import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import HamburgerButton from './components/HamburgerButton'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import TeamPage from './components/TeamPage'
import Admissions from './components/Admissions'
import Careers from './components/Careers'
import Home from './components/Home'
import About from './components/About'
import Team from './components/Team'
import Contact from './components/Contact'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <Router>
      <div className="app">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          onLogout={handleLogout}
        />
        
        <div className="main-layout">
          <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Team />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/careers" element={<Careers />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
        
        {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}
      </div>
    </Router>
  )
}

export default App