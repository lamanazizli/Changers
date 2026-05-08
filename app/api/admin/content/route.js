import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: 'localhost', port: 5432, database: 'changers_db',
  user: 'changers_user', password: 'Changers2024!Secure#',
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM site_content ORDER BY page, section');
    return Response.json({ content: result.rows });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { page, section, key, value } = await request.json();
    const result = await pool.query(
      'INSERT INTO site_content (page, section, key, value) VALUES ($1,$2,$3,$4) ON CONFLICT (page, section, key) DO UPDATE SET value=$4, updated_at=NOW() RETURNING *',
      [page, section, key, value]
    );
    return Response.json({ content: result.rows[0] });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await pool.query('DELETE FROM site_content WHERE id=$1', [id]);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
