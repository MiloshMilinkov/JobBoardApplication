import db from '../database.js';
import JobPost from '../models/JobPost.js';

export const getPostById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM JobPosts WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        if (row){
            const jobPost = new JobPost(row.id, row.title, row.content);
            resolve(jobPost);
        }
        else{
            resolve(null);
        }
      }
    });
  });
};

export const createPost = (title, content) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO JobPosts (title, content) VALUES (?, ?)', [title, content], function (err) {
            if (err) {
                reject(err);
            } else {
                const jobPost = new JobPost(this.lastID, title, content);
                resolve(jobPost);
            }
        });
    });
};