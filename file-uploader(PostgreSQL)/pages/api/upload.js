import { Client } from 'pg';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb', // Adjust size limit if needed
        },
    },
};

export default async function handler(req, res) {
    const client = new Client({
        user: process.env.DATABASE_USER,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,
    });

    await client.connect();

    if (req.method === 'POST') {
        // Handle file upload
        const { filename, mimetype, fileContent } = req.body;

        const query = `
            INSERT INTO file_uploads (filename, mimetype, file_content)
            VALUES ($1, $2, $3) RETURNING id;
        `;
        const values = [filename, mimetype, Buffer.from(fileContent, 'base64')];

        try {
            const result = await client.query(query, values);
            await client.end();
            return res.status(201).json({ id: result.rows[0].id });
        } catch (error) {
            await client.end();
            return res.status(500).json({ error: 'Failed to upload file' });
        }
    } else if (req.method === 'GET') {
        // Handle file retrieval
        const { id } = req.query;

        if (id) {
            // Fetch specific file content
            const query = 'SELECT filename, mimetype, file_content FROM file_uploads WHERE id = $1';
            const result = await client.query(query, [id]);

            if (result.rows.length > 0) {
                const file = result.rows[0];
                res.setHeader('Content-Type', file.mimetype);
                res.setHeader('Content-Disposition', `inline; filename="${file.filename}"`);
                return res.send(file.file_content);
            }

            await client.end();
            return res.status(404).send('File not found');
        } else {
            // Fetch all file metadata
            const query = 'SELECT id, filename, uploaded_at FROM file_uploads';
            const result = await client.query(query);

            await client.end();
            return res.status(200).json(result.rows);
        }
    }

    await client.end();
    res.status(405).send('Method Not Allowed');
}



