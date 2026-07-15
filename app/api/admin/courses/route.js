import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: 'localhost', port: 5432, database: 'changers_db',
  user: 'changers_user', password: 'Changers2024!Secure#',
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM site_courses ORDER BY sort_order, id');
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
    const body = await request.json();
    const {
      id, category, icon, color, title, description, duration, price, topics, is_active,
      subtitle, about, skills, students, rating,
      mentor_name, mentor_title, mentor_exp, mentor_initials, curriculum, sort_order,
    } = body;

    await pool.query(
      `UPDATE site_courses SET
        category=COALESCE($1,category), icon=COALESCE($2,icon), color=COALESCE($3,color),
        title=COALESCE($4,title), description=COALESCE($5,description), duration=COALESCE($6,duration),
        price=COALESCE($7,price), topics=COALESCE($8,topics), is_active=COALESCE($9,is_active),
        subtitle=COALESCE($10,subtitle), about=COALESCE($11,about), skills=COALESCE($12,skills),
        students=COALESCE($13,students), rating=COALESCE($14,rating),
        mentor_name=COALESCE($15,mentor_name), mentor_title=COALESCE($16,mentor_title),
        mentor_exp=COALESCE($17,mentor_exp), mentor_initials=COALESCE($18,mentor_initials),
        curriculum=COALESCE($19,curriculum), sort_order=COALESCE($20,sort_order)
      WHERE id=$21`,
      [category, icon, color, title, description, duration, price, topics, is_active,
       subtitle, about, skills, students, rating,
       mentor_name, mentor_title, mentor_exp, mentor_initials,
       curriculum ? JSON.stringify(curriculum) : null,
       sort_order,
       id]
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
