const  Category  = require('../models/category');

const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
];
console.log(Category);
const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;