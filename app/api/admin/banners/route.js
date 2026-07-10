import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: 'localhost', port: 5432, database: 'changers_db',
  user: 'changers_user', password: 'Changers2024!Secure#',
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM site_banners ORDER BY sort_order, id');
    return Response.json({ banners: result.rows });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { image, link, title, sort_order } = await request.json();
    const result = await pool.query(
      'INSERT INTO site_banners (image, link, title, sort_order) VALUES ($1,$2,$3,$4) RETURNING *',
      [image, link || '/kurslar', title || '', sort_order || 0]
    );
    return Response.json({ banner: result.rows[0] });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id, image, link, title, sort_order, is_active } = await request.json();
    await pool.query(
      'UPDATE site_banners SET image=COALESCE($1,image), link=COALESCE($2,link), title=COALESCE($3,title), sort_order=COALESCE($4,sort_order), is_active=COALESCE($5,is_active) WHERE id=$6',
      [image, link, title, sort_order, is_active, id]
    );
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await pool.query('DELETE FROM site_banners WHERE id=$1', [id]);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
