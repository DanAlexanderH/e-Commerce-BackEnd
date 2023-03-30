const router = require('express').Router();
// const { Tag, Product, ProductTag } = require('../../models');
const Product = require('../../models/product');
const Tag = require("../../models/tag");
const ProductTag = require("../../models/productTag");

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagID = await Tag.findAll({
      attributes: ["id", "tag_name"],
      include: [
        // {
        //   model: Product,
        //   attributes: ["id", "product_name", "price", "stock", "category_id"],
        // }
      ]
    })
    res.status(200).json(tagID)
  } catch(err) {
    res.status(500).json(err)
    console.log(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
  const tagId = await Tag.findByPk(req.params.id, {
    attributes: ["id", "tag_name"],

  })
  if(!tagId) {
    res.status(404).json({ message: "There is no Tag with this ID!"})
  } else {
    res.status(200).json(tagId)
  }
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).json(newTag)
  } catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if(!updatedTag[0]) {
      res.status(404).json({ message: "There is no Tag with this ID!"})
    } else {
      res.status(200).json(updatedTag)
    }
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      },
    })
    if(!deletedTag[0]){
      res.status(404).json({ message: "No Tag with this ID!"})
    } else {
      res.status(200).json(deletedTag)
    }
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
});

module.exports = router;
