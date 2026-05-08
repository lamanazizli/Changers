import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://changers_user:Changers2024!Secure#@localhost:5432/changers_db',
});

export async function POST(request) {
  try {
    const { name, phone, email, course, message, howFound } = await request.json();

    await pool.query(
      'INSERT INTO applications (full_name, phone, email, message, notes, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW())',
      [name, phone, email, message || '', course + (howFound ? ' | ' + howFound : ''), 'new']
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error('DB error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
