const Header = ({ onToggleSidebar }) => (
  <header className="header">
    <div className="header-content">
      <button className="header-hamburger" onClick={onToggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <img src="/logo2.png" alt="Garden TSS Logo" className="header-logo" />
      <h1>Garden TSS</h1>
      <p>Technical & Vocational Education Excellence</p>
    </div>
  </header>
)

export default Header