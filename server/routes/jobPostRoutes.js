import express from 'express';
import { getPostById, createPost } from '../repository/jobPostRepository.js'; 
import CreateJobPostDTO from '../DTOs/CreateJobPostDTO.js'

const router = express.Router();

router.get('/posts/:id', async (req, res) => {
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

router.post('/posts', async (req, res) => {
    try {
        const createJobPostDTO = new CreateJobPostDTO(req.body);
        console.log(createJobPostDTO);
        const newPost = await createPost(createJobPostDTO);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
});

export default router;
