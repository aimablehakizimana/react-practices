import { useState } from 'react'

const Header = ({ onToggleSidebar }) => {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.body.classList.toggle('dark-mode')
  }

  return (
    <header className="header">
      <div className="header-content">
        <button className="header-hamburger" onClick={onToggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <img src="/logo2.png" alt="Garden TSS Logo" className="header-logo" />
        <h1>Garden TSS</h1>
        <p style={{ color: 'white' }}>Technical & Vocational Education Excellence</p>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}

export default Header