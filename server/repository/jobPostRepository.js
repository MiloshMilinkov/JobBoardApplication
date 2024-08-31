import { JobPostModel } from '../database.js';
import JobPost from '../models/JobPost.js';

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