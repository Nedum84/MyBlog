const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

const app = express();

// connect to mongodb & listen for requests
const dbURI = 'mongodb+srv://nelly:DLKp8GH6pSBWRPXN@myblog.re2id.mongodb.net/my_blog?retryWrites=true&w=majority'

//Set Port
app.set('port', (process.env.PORT || 8008));
//connect to remote mongo db
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(app.get('port'), function(){
    // app.listen(process.env.PORT || 8008, function(){
        console.log('Server started on port '+ app.get('port'))
    });
  }).catch(err => console.log(err));


// register view engine
app.set('views', path.join(__dirname, 'views'));// or app.set('views', __dirname + '/views');// optional for express
app.engine('ejs', require('ejs').renderFile);// optional for express/ejs
app.set('view engine', 'ejs');

//BodyParser Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

//express static middle ware{ static files could be images, css etc} or (Set Static Folder)
app.use(express.static('public'))//app.use(express.static(path.join(__dirname, 'public')));

//for accepting form data
//express middleware for form data serialization (extended: true ==OPTIONAL)
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));//dev logger
// app.use((req, res, next) => {
//   res.locals.path = req.path;
//   next();
// });

app.use(morgan('dev'))//dev middleware





const VIEW = './view/'
var lorem = 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quisquam officiis ducimus laboriosam dicta amet, vel dolor quo in dolorem iure obcaecati, eum molestias rem porro, totam eligendi nulla neque! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quisquam officiis ducimus laboriosam dicta amet, vel dolor quo in dolorem iure obcaecati, eum molestias rem porro, totam eligendi nulla neque! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quisquam officiis ducimus laboriosam dicta amet, vel dolor quo in dolorem iure obcaecati, eum molestias rem porro, totam eligendi nulla neque! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quisquam officiis ducimus laboriosam dicta amet, vel dolor quo in dolorem iure obcaecati, eum molestias rem porro, totam eligendi nulla neque! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quisquam officiis ducimus laboriosam dicta amet, vel dolor quo in dolorem iure obcaecati, eum molestias rem porro, totam eligendi nulla neque! consectetur adipisicing elit. Tenetur quisquam officiis ducimus laboriosam dicta amet, vel dolor quo in dolorem iure obcaecati, eum molestias rem porro, totam eligendi nulla neque!'

var users = [
    {name: "Nelly C", age:'23', height: '27m', desc: lorem},
    {name: "David Beckham", age:'32', height: '23m', desc: lorem},
    {name: "Emmanuel Peace", age:'45', height: '88m', desc: lorem},
    {name: "Nelly Nedum", age:'121', height: '627m', desc: lorem},
]
app.get('/', (req, res)=>{
    // res.send('<p>Hellow!, How are you...</p>');

    // res.write('Heloow Me...');
    // res.end()

    // to send the html file
    // res.sendFile(VIEW+'index.html', {root: __dirname});

    // to send the ejs file
    res.render('index', {title:'Index Page', users});
});

//about
app.get('/about', (req, res)=>{
    // res.sendFile(VIEW+'about.html', {root:__dirname})
    res.render('about', {title: 'About Us'});
})

//redirect to about
app.get('/about-us', (req, res)=>{
    res.redirect('/about');
})





// user routes
app.use('/user', userRoutes);




//404
app.use((req,res)=>{
    // res.sendFile(VIEW+'404.html', {root:__dirname})
    res.status(404).render('404', {title:'404 Error Page'});
})


