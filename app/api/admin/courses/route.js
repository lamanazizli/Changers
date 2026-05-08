import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: 'localhost', port: 5432, database: 'changers_db',
  user: 'changers_user', password: 'Changers2024!Secure#',
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM site_courses ORDER BY id');
    return Response.json({ courses: result.rows });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { category, icon, color, title, description, duration, price, topics } = await request.json();
    const result = await pool.query(
      'INSERT INTO site_courses (category, icon, color, title, description, duration, price, topics) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      [category, icon, color, title, description, duration, price, topics]
    );
    return Response.json({ course: result.rows[0] });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id, category, icon, color, title, description, duration, price, topics, is_active } = await request.json();
    await pool.query(
      'UPDATE site_courses SET category=$1,icon=$2,color=$3,title=$4,description=$5,duration=$6,price=$7,topics=$8,is_active=$9 WHERE id=$10',
      [category, icon, color, title, description, duration, price, topics, is_active, id]
    );
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await pool.query('DELETE FROM site_courses WHERE id=$1', [id]);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
