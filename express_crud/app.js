const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Connect to SQLite database
const db = new sqlite3.Database('database.db');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Create books table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL
  )
`);

// === API ROUTES ===

// Get all books
app.get('/books', (req, res) => {
  db.all('SELECT * FROM books', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a new book
app.post('/book', (req, res) => {
  const { title, author } = req.body;
  db.run('INSERT INTO books (title, author) VALUES (?, ?)', [title, author], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, msg: 'Book added!' });
  });
});

// Delete a book
app.delete('/book/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM books WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ msg: 'Book deleted!' });
  });
});

// Update a book’s author
app.put('/book/:id', (req, res) => {
  const { id } = req.params;
  const { author } = req.body;
  db.run('UPDATE books SET author = ? WHERE id = ?', [author, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ msg: 'Book updated!' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

