import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: 'localhost', port: 5432, database: 'changers_db',
  user: 'changers_user', password: 'Changers2024!Secure#',
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM site_students ORDER BY id');
    return Response.json({ students: result.rows });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const d = await request.json();
    const result = await pool.query(
      'INSERT INTO site_students (initials,name,color,course,rating,before_text,after_text,quote,company,salary) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *',
      [d.initials, d.name, d.color, d.course, d.rating || 5, d.before_text, d.after_text, d.quote, d.company, d.salary]
    );
    return Response.json({ student: result.rows[0] });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const d = await request.json();
    await pool.query(
      `UPDATE site_students SET
        initials=COALESCE($1,initials), name=COALESCE($2,name), color=COALESCE($3,color),
        course=COALESCE($4,course), rating=COALESCE($5,rating), before_text=COALESCE($6,before_text),
        after_text=COALESCE($7,after_text), quote=COALESCE($8,quote), company=COALESCE($9,company),
        salary=COALESCE($10,salary), is_active=COALESCE($11,is_active)
      WHERE id=$12`,
      [d.initials, d.name, d.color, d.course, d.rating, d.before_text, d.after_text, d.quote, d.company, d.salary, d.is_active, d.id]
    );
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await pool.query('DELETE FROM site_students WHERE id=$1', [id]);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
