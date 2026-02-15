import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="page" style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: '120px', fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '20px' }}>
        404
      </div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#1a1a2e' }}>Page Not Found</h1>
      <p style={{ fontSize: '1.2rem', color: '#6c757d', marginBottom: '40px' }}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" style={{ display: 'inline-block', padding: '15px 40px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '1.1rem' }}>
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFound
