import { Op } from 'sequelize';
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

//Return all JobPosts
export const getPosts = async (page = 1, limit = 10, filterByTittle = '', filterByLocation = '') => {
  try {
    const offset = (page - 1) * limit;

    const searchFilterForTitle = filterByTittle 
      ? {
          title: {[Op.like]: `%${filterByTittle}%`},
          workLocation: {[Op.like]: `%${filterByLocation}%`}
        } 
      : {};

    const results = await JobPostModel.findAll({
      where: searchFilterForTitle,
      limit: limit,
      offset: offset,
    });

    const numOfTotalPosts = await JobPostModel.count({
      where: searchFilterForTitle,
    });

    if (results.length > 0) {
      const jobPosts = results.map(result =>({
        id: result.id,
        title: result.title,
        companyName: result.companyName,
        payRange: result.payRange,
        workLocation: result.workLocation,
        description: result.description,
      }));

      return {
        numOfTotalPosts,
        totalPages: Math.ceil(numOfTotalPosts / limit),
        currentPage: page,
        posts: jobPosts,
      };
    }

    return {
      totalPosts: 0,
      totalPages: 0,
      currentPage: page,
      posts: [],
    };

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