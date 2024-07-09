const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
  // find all categories
  // be sure to include its associated Products
  router.get('/', (req, res) => {
    Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['product_name']
        }
      ]
    })
      .then(categoryData => res.json(categoryData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });  


  // find one category by its `id` value
  // be sure to include its associated Products
  router.get('/:id', (req, res) => {
    Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['product_name']
        }
      ]
    })
      .then(categoryData => res.json(categoryData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });  

  // create a new category that includes a product name
  router.post('/', (req, res) => {
    Category.create(req.body)
      .then((category) => {
        res.status(200).json(category);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

 // update a category by its `id` value
  router.put('/:id', (req, res) => {
    Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((category) => {
        res.status(200).json(category);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
    }); 

  // delete a category by its `id` value
  router.delete('/:id', (req, res) => {
    Category.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((category) => {
        res.status(200).json(category);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
    });


module.exports = router;
