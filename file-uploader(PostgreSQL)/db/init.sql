CREATE TABLE file_uploads (
    id SERIAL PRIMARY KEY,
    filename TEXT NOT NULL,
    mimetype TEXT NOT NULL,
    file_content BYTEA NOT NULL,  -- Binary data for the file
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
