import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: 'localhost', port: 5432, database: 'changers_db',
  user: 'changers_user', password: 'Changers2024!Secure#',
});

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    
    const query = page 
      ? 'SELECT section, key, value FROM site_content WHERE page = $1'
      : 'SELECT page, section, key, value FROM site_content';
    
    const result = page 
      ? await pool.query(query, [page])
      : await pool.query(query);
    
    const content = {};
    result.rows.forEach(row => {
      const p = page ? '' : row.page;
      const target = page ? content : (content[p] = content[p] || {});
      if (!target[row.section]) target[row.section] = {};
      target[row.section][row.key] = row.value;
    });
    
    return Response.json({ content }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
