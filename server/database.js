import sqlite3 from 'sqlite3';
import path from 'path';

const __dirname = path.resolve();

const db = new sqlite3.Database(path.resolve(__dirname, 'posts.db'), (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.run(`CREATE TABLE IF NOT EXISTS JobPosts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          content TEXT NOT NULL
        )`);

export default db;
