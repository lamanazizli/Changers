import pg from 'pg';
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
    const { name, phone, email, course, message, howFound } = await request.json();
    const notes = [course, howFound].filter(Boolean).join(' | ');
    
    await pool.query(
      'INSERT INTO applications (full_name, phone, email, message, notes, status, created_at) VALUES ($1,$2,$3,$4,$5,$6,NOW())',
      [name || '', phone || '', email || '', message || '', notes || '', 'new']
    );
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Apply error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
