import { JobPostModel } from '../database.js';
import JobPost from '../models/JobPost.js';

//Return a job post bassed on id
export const getPostById = async (id) => {
  try {
    const result = await JobPostModel.findByPk(id);
    if (result) {
      return new JobPost(result.id, result.title, result.companyName, result.payRange, result.workLocation, result.description);
    }
    return null;
  } catch (error) {
    throw new Error('Error retrieving post: ' + error.message);
  }
};

//Return all job posts mapped to code object for a desired page
export const getPosts = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const results = await JobPostModel.findAll({
      limit: limit,
      offset: offset,
    });

    const totalPosts = await JobPostModel.count();

    if (results) {
      const jobPosts = results.map(result => new JobPost({
        id: result.id,
        title: result.title,
        companyName: result.companyName,
        payRange: result.payRange,
        workLocation: result.workLocation,
        description: result.description,
      }));

      return {
        totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
        currentPage: page,
        posts: jobPosts,
      };
    }
    return null;
  } catch (error) {
    throw new Error('Error retrieving post: ' + error.message);
  }
};

//Create a new job post.
export const createPost = async (createJobPostDTO) => {
  try {
      const result = await JobPostModel.create({
          title: createJobPostDTO.title,
          companyName: createJobPostDTO.companyName,
          payRange: createJobPostDTO.payRange,
          workLocation: createJobPostDTO.workLocation,
          description: createJobPostDTO.description,
      });
      return new JobPost({
          id: result.id,
          title: result.title,
          companyName: result.companyName,
          payRange: result.payRange,
          workLocation: result.workLocation,
          description: result.description,
      });
  } catch (error) {
      throw new Error('Error creating post: ' + error.message);
  }
};