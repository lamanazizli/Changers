import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: 'localhost', port: 5432, database: 'changers_db',
  user: 'changers_user', password: 'Changers2024!Secure#',
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM site_mentors ORDER BY id');
    return Response.json({ mentors: result.rows });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const d = await request.json();
    const result = await pool.query(
      'INSERT INTO site_mentors (name,title,company,experience,bio,skills,courses,initials,color,students,rating) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *',
      [d.name,d.title,d.company,d.experience,d.bio,d.skills,d.courses,d.initials,d.color,d.students,d.rating]
    );
    return Response.json({ mentor: result.rows[0] });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const d = await request.json();
    await pool.query(
      'UPDATE site_mentors SET name=$1,title=$2,company=$3,experience=$4,bio=$5,skills=$6,courses=$7,initials=$8,color=$9,students=$10,rating=$11,is_active=$12 WHERE id=$13',
      [d.name,d.title,d.company,d.experience,d.bio,d.skills,d.courses,d.initials,d.color,d.students,d.rating,d.is_active,d.id]
    );
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await pool.query('DELETE FROM site_mentors WHERE id=$1', [id]);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
