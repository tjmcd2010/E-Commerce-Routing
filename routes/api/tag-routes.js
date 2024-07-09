const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint
  // find all tags
  // be sure to include its associated Product data
  router.get('/', (req, res) => {
    Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['product_name']
        }
      ]
    })
      .then((tags) => {
        res.json(tags);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
    });

  // find a single tag by its `id`
  // be sure to include its associated Product data
  router.get('/:id', (req, res) => {
    Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          attributes: ['product_name']
        }
      ]
    })
      .then((tag) => {
        res.json(tag);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
    });

 // create a new tag
 router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((newTag) => {
      res.status(201).json(newTag);
    })
    .catch((err) => {
      res.status(400).json(err);
    });

  // update a tag's name by its `id` value
  router.put('/:id', (req, res) => {
    Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((updatedTag) => {
        res.json(updatedTag);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });  
});

  // delete on tag by its `id` value
  router.delete('/:id', (req, res) => {
    Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedTag) => {
        res.json(deletedTag);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
    });
      

module.exports = router;
