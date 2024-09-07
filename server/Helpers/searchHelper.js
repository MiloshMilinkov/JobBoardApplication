import { Op } from 'sequelize';

export const searchMethod = (filterByTittle, filterByLocation) => {
    const searchFilter = filterByTittle 
    ? {
        [Op.or]:[{
          title: {[Op.eq]: `${filterByTittle}`},
        },{
          workLocation: {[Op.eq]: `${filterByLocation}`}
        }] 
      } 
    : {};
  
    return searchFilter;
  }