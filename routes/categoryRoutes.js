const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');


router.get('/', categoryController.fetch_all);
router.get('/add', categoryController.goto_add_cat);
router.post('/add', categoryController.add_new_category);
router.delete('/:id', categoryController.delete_category);

module.exports = router