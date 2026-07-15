import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: 'localhost', port: 5432, database: 'changers_db',
  user: 'changers_user', password: 'Changers2024!Secure#',
});

export async function POST(request) {
  try {
    const { id, sort_order } = await request.json();
    await pool.query('UPDATE site_courses SET sort_order=$1 WHERE id=$2', [sort_order, id]);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
