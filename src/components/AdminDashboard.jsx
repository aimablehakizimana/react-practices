import { useState, useEffect } from 'react'
import AdminContent from './AdminContent'

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState({ totalUsers: 0, todayUsers: 0, activeUsers: 0 })
  const [editUser, setEditUser] = useState(null)
  const [editData, setEditData] = useState({ fullName: '', email: '', phone: '' })
  const [stars, setStars] = useState([])

  useEffect(() => {
    loadData()
    const generateStars = () => {
      const starArray = []
      for (let i = 0; i < 100; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2
        })
      }
      setStars(starArray)
    }
    generateStars()
  }, [])

  const loadData = async () => {
    const res = await fetch('http://localhost:3000/api/dashboard')
    const data = await res.json()
    setStats({ totalUsers: data.totalUsers, todayUsers: data.todayUsers, activeUsers: data.activeUsers })
    setUsers(data.users)
  }

  const handleEdit = (user) => {
    setEditUser(user.id)
    setEditData({ fullName: user.fullName, email: user.email, phone: user.phone })
  }

  const saveEdit = async () => {
    await fetch(`http://localhost:3000/api/users/${editUser}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData)
    })
    setEditUser(null)
    loadData()
  }

  const deleteUser = async (id) => {
    if (confirm('Delete this user?')) {
      await fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE' })
      loadData()
    }
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', overflow: 'hidden' }}>
      {stars.map(star => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: 'white',
            borderRadius: '50%',
            opacity: star.opacity,
            animation: 'twinkle 3s infinite'
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
      <div style={{ position: 'relative', zIndex: 1, padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: 'white', fontSize: '36px', marginBottom: '10px' }}>Garden Registration Dashboard</h1>
          <p style={{ color: '#fff', fontSize: '20px', marginTop: '10px' }}>Hi aimable, Welcome! 👋</p>
        </div>
        <button onClick={onLogout} style={{ padding: '10px 20px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('dashboard')} style={{ padding: '10px 20px', background: activeTab === 'dashboard' ? '#3498db' : '#fff', color: activeTab === 'dashboard' ? '#fff' : '#333', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Dashboard</button>
        <button onClick={() => setActiveTab('content')} style={{ padding: '10px 20px', background: activeTab === 'content' ? '#3498db' : '#fff', color: activeTab === 'content' ? '#fff' : '#333', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Content Management</button>
      </div>
      {activeTab === 'dashboard' ? (
        <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#3498db', fontSize: '36px', marginBottom: '10px' }}>{stats.totalUsers}</h2>
            <p style={{ color: '#666' }}>Total Users</p>
          </div>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#3498db', fontSize: '36px', marginBottom: '10px' }}>{stats.todayUsers}</h2>
            <p style={{ color: '#666' }}>Registered Today</p>
          </div>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#3498db', fontSize: '36px', marginBottom: '10px' }}>{stats.activeUsers}</h2>
            <p style={{ color: '#666' }}>Active Users</p>
          </div>
        </div>
      <table style={{ width: '100%', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#3498db', color: 'white' }}>
            <th style={{ padding: '15px', textAlign: 'left', color: 'white' }}>ID</th>
            <th style={{ padding: '15px', textAlign: 'left', color: 'white' }}>Username</th>
            <th style={{ padding: '15px', textAlign: 'left', color: 'white' }}>Full Name</th>
            <th style={{ padding: '15px', textAlign: 'left', color: 'white' }}>Email</th>
            <th style={{ padding: '15px', textAlign: 'left', color: 'white' }}>Phone</th>
            <th style={{ padding: '15px', textAlign: 'left', color: 'white' }}>Last Login</th>
            <th style={{ padding: '15px', textAlign: 'left', color: 'white' }}>Status</th>
            <th style={{ padding: '15px', textAlign: 'left', color: 'white' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} style={{ borderBottom: '1px solid #eee', background: 'white' }}>
              <td style={{ padding: '15px', color: '#333' }}>{u.id}</td>
              <td style={{ padding: '15px', color: '#333' }}>{u.username}</td>
              <td style={{ padding: '15px', color: '#333' }}>{u.fullName}</td>
              <td style={{ padding: '15px', color: '#333' }}>{u.email}</td>
              <td style={{ padding: '15px', color: '#333' }}>{u.phone}</td>
              <td style={{ padding: '15px', color: '#333' }}>{u.last_login ? new Date(u.last_login).toLocaleString() : 'Never'}</td>
              <td style={{ padding: '15px' }}><span style={{ color: u.is_active ? '#2ecc71' : '#e74c3c', fontWeight: 'bold' }}>{u.is_active ? 'Active' : 'Inactive'}</span></td>
              <td style={{ padding: '15px' }}>
                <button onClick={() => handleEdit(u)} style={{ padding: '5px 10px', margin: '0 2px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => deleteUser(u.id)} style={{ padding: '5px 10px', margin: '0 2px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editUser && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', width: '400px' }}>
            <h2>Edit User</h2>
            <input value={editData.fullName} onChange={(e) => setEditData({...editData, fullName: e.target.value})} placeholder="Full Name" style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input value={editData.email} onChange={(e) => setEditData({...editData, email: e.target.value})} placeholder="Email" style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }} />
            <input value={editData.phone} onChange={(e) => setEditData({...editData, phone: e.target.value})} placeholder="Phone" style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }} />
            <button onClick={saveEdit} style={{ padding: '10px 20px', margin: '10px 5px 0 0', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
            <button onClick={() => setEditUser(null)} style={{ padding: '10px 20px', margin: '10px 0 0 5px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}
      </>
      ) : (
        <AdminContent />
      )}
      </div>
    </div>
  )
}

export default AdminDashboard
