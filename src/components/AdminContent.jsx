import { useState, useEffect } from 'react'

const AdminContent = () => {
  const [team, setTeam] = useState([])
  const [aboutContent, setAboutContent] = useState('')
  const [editTeam, setEditTeam] = useState(null)
  const [editAbout, setEditAbout] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    fetch('http://localhost:3000/api/team').then(r => r.json()).then(setTeam)
    fetch('http://localhost:3000/api/content/about').then(r => r.json()).then(data => setAboutContent(data.content || ''))
  }

  const updateAbout = async () => {
    await fetch('http://localhost:3000/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'about', content: aboutContent })
    })
    setEditAbout(false)
    alert('About content updated!')
  }

  const updateTeam = async (e) => {
    e.preventDefault()
    await fetch(`http://localhost:3000/api/team/${editTeam.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editTeam)
    })
    setEditTeam(null)
    loadData()
  }

  return (
    <div className="page">
      <h1>Content Management</h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>About Content</h2>
        {!editAbout ? (
          <div>
            <div style={{ padding: '15px', background: '#f5f7fa', borderRadius: '8px', marginBottom: '15px', whiteSpace: 'pre-wrap' }}>
              {aboutContent || 'No content available'}
            </div>
            <button onClick={() => setEditAbout(true)} style={{ padding: '12px 30px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Edit About</button>
          </div>
        ) : (
          <div>
            <textarea value={aboutContent} onChange={e => setAboutContent(e.target.value)} style={{ width: '100%', padding: '15px', minHeight: '150px', borderRadius: '8px', border: '2px solid #e9ecef', fontSize: '16px' }} placeholder="About content..." />
            <button onClick={updateAbout} style={{ marginTop: '10px', padding: '12px 30px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginRight: '10px' }}>Save</button>
            <button onClick={() => { setEditAbout(false); loadData(); }} style={{ marginTop: '10px', padding: '12px 30px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
          </div>
        )}
      </div>

      <div>
        <h2>Team Members</h2>
        {editTeam && (
          <form onSubmit={updateTeam} style={{ marginBottom: '20px', padding: '20px', background: '#f5f7fa', borderRadius: '8px' }}>
            <h3>Edit Team Member</h3>
            <input placeholder="Name" value={editTeam.name} onChange={e => setEditTeam({...editTeam, name: e.target.value})} required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} />
            <input placeholder="Position" value={editTeam.position} onChange={e => setEditTeam({...editTeam, position: e.target.value})} required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} />
            <textarea placeholder="Description" value={editTeam.description} onChange={e => setEditTeam({...editTeam, description: e.target.value})} required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd', minHeight: '80px' }} />
            <button type="submit" style={{ padding: '10px 20px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Save</button>
            <button type="button" onClick={() => setEditTeam(null)} style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
          </form>
        )}
        <div>
          {team.map(t => (
            <div key={t.id} style={{ padding: '15px', background: '#f5f7fa', margin: '10px 0', borderRadius: '8px' }}>
              <h3>{t.name}</h3>
              <p style={{ color: '#667eea', fontWeight: 'bold' }}>{t.position}</p>
              <p>{t.description}</p>
              {!editTeam && <button onClick={() => setEditTeam(t)} style={{ padding: '8px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminContent
