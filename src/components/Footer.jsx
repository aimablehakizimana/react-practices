import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <p>&copy; 2024 Garden TSS. developed by Aimable HAKIZIMANA.</p>
      <div className="footer-links">
        <Link to="/admissions">Admissions</Link>
        <Link to="/programs">Programs</Link>
        <Link to="/careers">Careers</Link>
      </div>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '24px', transition: 'transform 0.3s' }} onMouseOver={(e) => e.target.style.transform = 'scale(1.2)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}><FaFacebookF /></a>
        <a href="https://www.instagram.com/accounts/onetap/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '24px', transition: 'transform 0.3s' }} onMouseOver={(e) => e.target.style.transform = 'scale(1.2)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}><FaInstagram /></a>
        <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '24px', transition: 'transform 0.3s' }} onMouseOver={(e) => e.target.style.transform = 'scale(1.2)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}><FaLinkedin /></a>
      </div>
    </div>
  </footer>
)

export default Footer
