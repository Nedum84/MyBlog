const Blog = require('../models/blogModel');
const Category = require('../models/categoryModel');//for category selection

const fetch_all = (req, res) => {
  Category.find()//fetch Categories
    .then(cat_result => {
      //Fetch blogs
      Blog.find().sort({ createdAt: -1 })
        .then(result => {
          res.render('blog/blogs', { blogs: result, title: 'All blogs', category: cat_result});
        }).catch(err => {
          console.log(err);
        });
    }).catch(err => {
      console.log(err);
    });
  
}

const single_blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('blog/details', { blog: result, title: 'Blog Details' });
    }).catch(err => {
      console.log(err);
      res.render('404', { title: 'Blog not found' });
    });
}

const goto_add_blog = (req, res) => {
  Category.find()
    .then(result => {
      res.render('blog/add-blog', { title: 'Create a new blog', category:result });
    }).catch(err => {
      console.log(err);
    });
}

const submit_blog = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      // res.redirect('/blog');
      res.send({success:true});
    })
    .catch(err => {
      console.log(err);
    });
}

const delete_blog = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.send({success: true});
    }).catch(err => {
      console.log(err);
    });
}

module.exports = {
  fetch_all, 
  single_blog_details, 
  goto_add_blog, 
  submit_blog, 
  delete_blog
}