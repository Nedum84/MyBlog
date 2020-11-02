const User = require('../models/userModel');

const fetch_all_users = (req, res) => {
  User.find().sort({ createdAt: -1 })//desc
    .then(result => {
      res.render('user/users', { users: result, title: 'All Users' });
    })
    .catch(err => {
      console.log(err);
    });
}

const single_user_details = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then(result => {
      res.render('user/user-details', { user: result, title: result[0].name+' Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'User not found' });
    });
}

const goto_add_user_page = (req, res) => {
  res.render('user/add-user', { title: 'Add a new User' });
}

const add_new_user = (req, res) => {
    // const user = new User({
    //     name: 'Nedum CC',
    //     age: '23',
    //     desc: 'lorem  '
    //   }
    // )
  const user = new User(req.body);
  user.save()
    .then(result => {
      res.redirect('/user/users');
    //   res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
}

const user_delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then(result => {
      res.send({ success: true });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
    fetch_all_users, 
    single_user_details, 
    goto_add_user_page, 
    add_new_user, 
    user_delete
}