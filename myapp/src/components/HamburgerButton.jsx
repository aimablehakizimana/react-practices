const HamburgerButton = ({ isOpen, onClick }) => (
  <button className={`hamburger-btn ${isOpen ? 'open' : ''}`} onClick={onClick}>
    <span></span>
    <span></span>
    <span></span>
  </button>
)

export default HamburgerButton