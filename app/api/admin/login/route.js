import pg from 'pg';
import { createHash } from 'crypto';

const { Pool } = pg;

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'changers_db',
  user: 'changers_user',
  password: 'Changers2024!Secure#',
});

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    const result = await pool.query(
      'SELECT * FROM admins WHERE email = $1', [email]
    );
    
    if (result.rows.length === 0) {
      return Response.json({ error: 'Email ve ya sifre yanlisdir' }, { status: 401 });
    }
    
    const admin = result.rows[0];
    const hash = createHash('sha256').update(password).digest('hex');
    
    if (hash !== admin.password_hash) {
      return Response.json({ error: 'Email ve ya sifre yanlisdir' }, { status: 401 });
    }
    
    const token = Buffer.from(JSON.stringify({ 
      id: admin.id, 
      email: admin.email, 
      role: admin.role,
      exp: Date.now() + 86400000
    })).toString('base64');
    
    return Response.json({ token, admin: { email: admin.email, role: admin.role } });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Server xetasi: ' + error.message }, { status: 500 });
  }
}
