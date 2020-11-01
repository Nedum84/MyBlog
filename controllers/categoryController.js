const Category = require('../models/categoryModel');


const fetch_all = (req, res) => {
    Category.find()
    .then(result => {
      res.render('category/categories', { category: result, title: 'All Categories' });
    })
    .catch(err => {
      console.log(err);
    });
}


const goto_add_cat = (req, res) => {
  res.render('category/add-category', { title: 'Add a new Category' });
}

const add_new_category = (req, res) => {
  const cat = new Category(req.body);

  Category.find({category_name: req.body.category_name})
    .then(result => {//Checking if already added...
        if(result.length!=0){
            res.render('category/add-category', {error: 'Category '+req.body.category_name+' already added', title: ' Add a new Category' });
        }else{ 
            cat.save()
              .then(result => {
                res.redirect('/category');
              }).catch(err => {
                console.log(err);
              });
        }
    }).catch(err => {
        console.log(err);
    });
}

const delete_category = (req, res) => {
  const id = req.params.id;
  Category.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/category' });
    }).catch(err => {
      console.log(err);
    });
}

module.exports = {
    fetch_all, 
    goto_add_cat, 
    add_new_category, 
    delete_category
}