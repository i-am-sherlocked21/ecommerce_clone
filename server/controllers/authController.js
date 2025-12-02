import jwt from 'jsonwebtoken';

// Hardcoded demo user
const DEMO_USER = {
  id: 'demo-user-1',
  name: 'Demo Parent',
  email: 'demo@babybliss.com',
  password: 'baby123'
};

export const login = (req, res) => {
  const { email, password } = req.body;
  if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
    return res.status(401).json({ message: 'Invalid credentials (demo only)' });
  }

  const token = jwt.sign(
    { sub: DEMO_USER.id, email: DEMO_USER.email, name: DEMO_USER.name },
    process.env.JWT_SECRET || 'dev_secret_demo',
    { expiresIn: '2h' }
  );

  res.json({ token, user: { id: DEMO_USER.id, name: DEMO_USER.name, email: DEMO_USER.email } });
};


