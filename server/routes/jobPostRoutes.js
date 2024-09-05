import express from 'express';
import { getPostById, createPost, getPosts } from '../repository/jobPostRepository.js'; 
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

router.get('/posts', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const filterByTittle = req.query.filterByTittle;
        const filterByLocation= req.query.filterByLocation;

        const postsData = await getPosts(page, limit, filterByTittle, filterByLocation);
        if (postsData ) {
            res.json(postsData );
        } else {
            res.status(404).json({ message: 'Posts not found' });
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
