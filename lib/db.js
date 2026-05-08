import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'changers_db',
  user: 'changers_user',
  password: 'Changers2024!Secure#',
});

export async function getContent(page) {
  try {
    const result = await pool.query(
      'SELECT section, key, value FROM site_content WHERE page = $1',
      [page]
    );
    const content = {};
    result.rows.forEach(row => {
      if (!content[row.section]) content[row.section] = {};
      content[row.section][row.key] = row.value;
    });
    return content;
  } catch (err) {
    console.error('getContent error:', err);
    return {};
  }
}

export async function getCourses() {
  try {
    const result = await pool.query(
      'SELECT * FROM site_courses WHERE is_active = true ORDER BY id'
    );
    return result.rows;
  } catch (err) {
    console.error('getCourses error:', err);
    return [];
  }
}

export async function getMentors() {
  try {
    const result = await pool.query(
      'SELECT * FROM site_mentors WHERE is_active = true ORDER BY id'
    );
    return result.rows;
  } catch (err) {
    console.error('getMentors error:', err);
    return [];
  }
}

export const pool_instance = pool;
