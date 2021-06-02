const express = require('express');
const boydParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const { deleteById } = require('./models/products');

//const database = require('./util/databaseMySQL');
const sequelize = require('./util/database');

const appExpress = express();

//template engine type of EJS
appExpress.set('view engine', 'ejs'); 
appExpress.set('views','views'); //the firts parameter is the folder default, the second parameters is where the html files are in the proyect 

//database connection
/* database.execute('SELECT * FROM products')
        .then(result => {

            console.log(result[0]);
        })
        .catch(err => {

            console.log("Database error", err);
        }); */

//middleware general
appExpress.use(boydParser.urlencoded({extended: false}));
appExpress.use(express.static(path.join(__dirname, 'public'))); //access to the public folder 

//middleware project
appExpress.use('/admin', adminRoutes);
appExpress.use(shopRoutes);
appExpress.use(errorController.get404Error);

//Sequelize
//sync with the database
sequelize.sync()
        .then(result => {

            appExpress.listen(3000);
        })
        .catch(err => {

            console.log("Database connection failed", err);
        });