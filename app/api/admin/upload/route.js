import { writeFile } from 'fs/promises';
import { join } from 'path';
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: 'localhost', port: 5432, database: 'changers_db',
  user: 'changers_user', password: 'Changers2024!Secure#',
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const type = formData.get('type') || 'student';

    if (!file) {
      return Response.json({ error: 'Fayl tapilmadi' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = file.name.split('.').pop() || 'png';
    const fileName = type + '-hero.' + ext;
    const filePath = join(process.cwd(), 'public', fileName);

    await writeFile(filePath, buffer);

    await pool.query(
      'INSERT INTO site_content (page, section, key, value) VALUES ($1,$2,$3,$4) ON CONFLICT (page, section, key) DO UPDATE SET value=$4, updated_at=NOW()',
      ['home', 'hero_image', 'student_photo', '/' + fileName]
    );

    return Response.json({ success: true, path: '/' + fileName });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
