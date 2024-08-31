
import express from 'express';
import { getPostById, createPost } from './repository/jobPostRepository.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/posts/:id', async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const post = await getPostById(postId);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving post', error });
    }
});

app.post('/posts', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = await createPost(title, content);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
