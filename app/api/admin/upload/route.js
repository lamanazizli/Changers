import { writeFile, mkdir } from 'fs/promises';
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
    const type = formData.get('type') || 'course';
    const id = formData.get('id');
    const link = formData.get('link');
    const title = formData.get('title');

    if (!file) {
      return Response.json({ error: 'Fayl tapilmadi' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = file.name.split('.').pop() || 'jpg';
    const fileName = type + '-' + Date.now() + '.' + ext;

    const uploadDir = join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    const filePath = join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    const imagePath = '/uploads/' + fileName;

    if (type === 'course' && id) {
      await pool.query('UPDATE site_courses SET image=$1 WHERE id=$2', [imagePath, id]);
    } else if (type === 'mentor' && id) {
      await pool.query('UPDATE site_mentors SET image=$1 WHERE id=$2', [imagePath, id]);
    } else if (type === 'banner') {
      const result = await pool.query(
        'INSERT INTO site_banners (image, link, title) VALUES ($1,$2,$3) RETURNING *',
        [imagePath, link || '/kurslar', title || '']
      );
      return Response.json({ success: true, path: imagePath, banner: result.rows[0] });
    }

    return Response.json({ success: true, path: imagePath });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
