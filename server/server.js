import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
app.use(cors());
app.use(express.json());
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gardenregistration',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

try {
  await pool.query('SELECT 1');
  console.log('Connected to MySQL');
} catch (err) {
  console.error('MySQL connection error:', err);
}

// Create tables
await pool.execute(`
  CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    fullName VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT FALSE
  )
`);

await pool.execute(`
  CREATE TABLE IF NOT EXISTS social_media (
    id INT PRIMARY KEY AUTO_INCREMENT,
    platform VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    icon VARCHAR(50) NOT NULL
  )
`);

await pool.execute(`
  CREATE TABLE IF NOT EXISTS team_members (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    description TEXT
  )
`);

await pool.execute(`
  CREATE TABLE IF NOT EXISTS content (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section VARCHAR(50) NOT NULL,
    content TEXT NOT NULL
  )
`);

app.post('/api/register', async (req, res) => {
  try {
    const { username, password, email, fullName, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.execute(
      'INSERT INTO users (username, password, email, fullName, phone) VALUES (?, ?, ?, ?, ?)',
      [username, hashedPassword, email, fullName, phone]
    );
    res.json({ success: true, message: 'Account created successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.code === 'ER_DUP_ENTRY' ? 'Username already exists' : 'Registration failed' });
  }
});

app.post('/api/admin-login', async (req, res) => {
  const { username, password } = req.body;
  if (username === 'aimable' && password === '123456789') {
    res.json({ success: true, message: 'Admin login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, password });
    const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid username' });
    }
    console.log('User found, stored hash:', rows[0].password);
    const isValid = await bcrypt.compare(password, rows[0].password);
    console.log('Password valid:', isValid);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }
    await pool.execute('UPDATE users SET last_login = NOW(), is_active = TRUE WHERE id = ?', [rows[0].id]);
    res.json({ success: true, message: 'Login successful', user: { username: rows[0].username, fullName: rows[0].fullName } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

app.post('/api/logout', async (req, res) => {
  const { username } = req.body;
  await pool.execute('UPDATE users SET is_active = FALSE WHERE username = ?', [username]);
  res.json({ success: true });
});

app.get('/api/user/:username', async (req, res) => {
  const [rows] = await pool.execute('SELECT fullName, email, phone FROM users WHERE username = ?', [req.params.username]);
  res.json(rows[0] || {});
});

app.get('/api/profile/:username', async (req, res) => {
  const [rows] = await pool.execute('SELECT fullName, email, phone, created_at, last_login FROM users WHERE username = ?', [req.params.username]);
  res.json(rows[0] || {});
});

app.put('/api/user/:username', async (req, res) => {
  const { fullName, email, phone } = req.body;
  await pool.execute('UPDATE users SET fullName = ?, email = ?, phone = ? WHERE username = ?', [fullName, email, phone, req.params.username]);
  res.json({ success: true });
});

app.post('/api/change-password', async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;
  const [rows] = await pool.execute('SELECT password FROM users WHERE username = ?', [username]);
  if (rows.length === 0) return res.status(404).json({ success: false, message: 'User not found' });
  const isValid = await bcrypt.compare(currentPassword, rows[0].password);
  if (!isValid) return res.status(401).json({ success: false, message: 'Current password is incorrect' });
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await pool.execute('UPDATE users SET password = ? WHERE username = ?', [hashedPassword, username]);
  res.json({ success: true });
});

app.post('/api/reset-password', async (req, res) => {
  try {
    const { username, email, newPassword } = req.body;
    console.log('Reset password request:', { username, email, newPassword });
    const [rows] = await pool.execute('SELECT * FROM users WHERE username = ? AND email = ?', [username, email]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found with this username and email' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log('New hashed password:', hashedPassword);
    await pool.execute('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, rows[0].id]);
    console.log('Password updated for user ID:', rows[0].id);
    res.json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ success: false, message: 'Password reset failed' });
  }
});

app.get('/api/dashboard', async (req, res) => {
  const [users] = await pool.execute('SELECT id, username, fullName, email, phone, created_at, last_login, is_active FROM users ORDER BY created_at DESC');
  const [total] = await pool.execute('SELECT COUNT(*) as count FROM users');
  const [today] = await pool.execute('SELECT COUNT(*) as count FROM users WHERE DATE(created_at) = CURDATE()');
  const [active] = await pool.execute('SELECT COUNT(*) as count FROM users WHERE is_active = TRUE');
  res.json({ totalUsers: total[0].count, todayUsers: today[0].count, activeUsers: active[0].count, users });
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { fullName, email, phone } = req.body;
    await pool.execute('UPDATE users SET fullName = ?, email = ?, phone = ? WHERE id = ?', [fullName, email, phone, req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// Social Media APIs
app.get('/api/social-media', async (req, res) => {
  const [rows] = await pool.execute('SELECT * FROM social_media');
  res.json(rows);
});

app.post('/api/social-media', async (req, res) => {
  const { platform, url, icon } = req.body;
  await pool.execute('INSERT INTO social_media (platform, url, icon) VALUES (?, ?, ?)', [platform, url, icon]);
  res.json({ success: true });
});

app.delete('/api/social-media/:id', async (req, res) => {
  await pool.execute('DELETE FROM social_media WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

// Team APIs
app.get('/api/team', async (req, res) => {
  const [rows] = await pool.execute('SELECT * FROM team_members');
  res.json(rows);
});

app.post('/api/team', async (req, res) => {
  const { name, position, description } = req.body;
  await pool.execute('INSERT INTO team_members (name, position, description) VALUES (?, ?, ?)', [name, position, description]);
  res.json({ success: true });
});

app.put('/api/team/:id', async (req, res) => {
  const { name, position, description } = req.body;
  await pool.execute('UPDATE team_members SET name = ?, position = ?, description = ? WHERE id = ?', [name, position, description, req.params.id]);
  res.json({ success: true });
});

app.delete('/api/team/:id', async (req, res) => {
  await pool.execute('DELETE FROM team_members WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

// Content APIs
app.get('/api/content/:section', async (req, res) => {
  const [rows] = await pool.execute('SELECT * FROM content WHERE section = ?', [req.params.section]);
  res.json(rows[0] || {});
});

app.post('/api/content', async (req, res) => {
  const { section, content } = req.body;
  await pool.execute('INSERT INTO content (section, content) VALUES (?, ?) ON DUPLICATE KEY UPDATE content = ?', [section, content, content]);
  res.json({ success: true });
});

app.get('/', (req, res) => {
  res.send('Server is running');
  });

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
