import { Link } from 'react-router-dom'

const Sidebar = ({ isOpen, onClose, onLogout }) => {
  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await onLogout()
    }
  }

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'hidden'}`}>
      <nav className="nav">
        <Link to="/" onClick={onClose}>
          <span className="nav-icon">🏠</span>
          Home
        </Link>
        <Link to="/about" onClick={onClose}>
          <span className="nav-icon">ℹ️</span>
          About
        </Link>
        <Link to="/programs" onClick={onClose}>
          <span className="nav-icon">🎓</span>
          Programs
        </Link>
        <Link to="/team" onClick={onClose}>
          <span className="nav-icon">👥</span>
          Team
        </Link>
        <Link to="/admissions" onClick={onClose}>
          <span className="nav-icon">📝</span>
          Admissions
        </Link>
        <Link to="/careers" onClick={onClose}>
          <span className="nav-icon">💼</span>
          Careers
        </Link>
        <Link to="/contact" onClick={onClose}>
          <span className="nav-icon">📞</span>
          Contact
        </Link>
        <button className="logout-btn" onClick={handleLogout}>
          <span className="nav-icon">🚪</span>
          Logout
        </button>
      </nav>
    </div>
  )
}

export default Sidebar