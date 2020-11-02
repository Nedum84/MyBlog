const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blogController');


router.get('/', blogController.fetch_all);
router.get('/add', blogController.goto_add_blog);
router.post('/add', blogController.submit_blog);
router.delete('/:id', blogController.delete_blog);
router.get('/:id', blogController.single_blog_details);
// router.put('/:id', blogController.single_blog_details);

module.exports = router