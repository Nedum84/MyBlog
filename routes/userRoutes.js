const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.fetch_all_users);
router.get('/add-user', userController.goto_add_user_page);//redirecting to add user page
router.post('/add-user', userController.add_new_user);//posting add user form
router.get('/:id', userController.single_user_details);//single user details page
router.delete('/:id', userController.user_delete);

module.exports = router;