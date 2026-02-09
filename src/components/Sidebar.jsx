import { Link } from 'react-router-dom'

const Sidebar = ({ isOpen, onClose, onLogout }) => {
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout()
      onClose()
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
        <Link to="/team" onClick={onClose}>
          <span className="nav-icon">👥</span>
          Team
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