import { useNavigate, useLocation, Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import About from './About'
import TeamPage from './TeamPage'
import Contact from './Contact'
import Admissions from './Admissions'
import Careers from './Careers'
import Team from './Team'
import NotFound from './NotFound'

function MainApp({ currentUser, handleLogout, sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate()
  const location = useLocation()
  const showBackButton = location.pathname !== '/'

  return (
    <div className="app">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />
      
      <div className="main-layout">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="main-content">
          {showBackButton && (
            <button onClick={() => navigate('/')} style={{ marginBottom: '20px', padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ← Back to Home
            </button>
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Team />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
      
      <div className={`overlay ${sidebarOpen ? 'active' : ''}`} onClick={() => setSidebarOpen(false)} />
    </div>
  )
}

export default MainApp
