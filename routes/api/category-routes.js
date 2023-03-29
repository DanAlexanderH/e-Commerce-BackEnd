const router = require('express').Router();
const Category = require('../../models/Category');
const Product = require('../../models/Product');


// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData =  Category.findAll({
      // attribute: ["id", "category_name"],
      include: [Product]
    })
    console.log(categoryData)
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryId = await Category.findByPk(req.params.id, {
      attributes: ["id", "category_name"],
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        }
      ]
    })
    if(!categoryId) {
      res.status(400).json({ message: "There is no product with this id!"})
    } else {
      res.status(200).json(categoryId)
    }
  } catch(err) {
    res.status(500).json(err)
    console.log(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
try{
  const newCategory = await Category.create({
    category_name: req.body.category_name
  })
  res.status(200).json(newCategory)
} catch(err) {
  res.status(500).json(err)
  console.log(err)
}
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
try{
  const updateCategory = await Category.update(req.body, {
    where: {
      id: req.body.id
    }
  })
  if(!updateCategory[0]) {
    res.status(400).json({ message: "No category with this id!"})
  } else {
    res.status(200).json(updateCategory)
  }
} catch(err) {
  res.status(500).json(err)
  console.log(err)
}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const deleteCategory = await Category.destroy(req.body, {
      where: {
        id: req.params.id
      },
      truncate: true
    })
    if(!deleteCategory) {
      res.status(400).json({ message: "No category with this id!"})
    } else {
      res.status(200).json(deleteCategory)
    }
  } catch(err){
    console.log(err);
    res.status(500).json(err)
  }
  // router.delete('/:id', (req, res) => {
  //   Category.destroy({
  //     where: {
  //       id: req.params.id,
  //     },
  //   })
  //     .then((category) => res.status(200).json(category))
  //     .catch((err) => res.status(400).json(err));
  // });
});

module.exports = router;