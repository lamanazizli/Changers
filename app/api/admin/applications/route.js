import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: 'localhost', port: 5432, database: 'changers_db',
  user: 'changers_user', password: 'Changers2024!Secure#',
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM applications ORDER BY created_at DESC');
    return Response.json({ applications: result.rows });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id, status, notes } = await request.json();
    await pool.query('UPDATE applications SET status=$1, notes=$2 WHERE id=$3', [status, notes, id]);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await pool.query('DELETE FROM applications WHERE id=$1', [id]);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
