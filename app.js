require('dotenv').config();
const connect = require('./database/connect.js');

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const home=require('./backend/routes/home.js');
const search=require('./backend/routes/search.js');
app.get('/', home);
app.use('/search', search);



const start = async () => {
    try{
        await connect();
        app.listen(3000,  
         console.log('Listening on port 3000...'));


       
    }catch(error){
        console.log(error);
    }
}
start();
