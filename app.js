const express = require('express'); 
const app = express(); 
const morgan = require('morgan');
const mongoose = require('mongoose')
var dotenv = require('dotenv');
dotenv.config();
var url = process.env.MONGOLAB_URI;

const userRoutes = require('./api/routes/users');
const rootRoutes = require('./api/routes/root');


mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    }).then(() => console.log("DB connected"))
    .catch((err) => console.error("DB connection error: ", err));;
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Routes Requests
app.use('/',rootRoutes);
app.use('/users',userRoutes);

app.use((req, res, next)=>
{
    res.header('Access-Control-Allow-Origin','*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,  Content-Type, Accept, Authotization");
    if(req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status.json({})
    }
})
app.use((req, res, next) =>
{
    const error = new Error('Not Found'); 
    console.status = 404;
    next(error);
})

app.use((error,req, res, next) =>
{
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message
        }
    })
})
module.exports = app;