require('dotenv').config();
const connect = require('./database/connect.js');
connect();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const home=require('./backend/routes/home.js');
app.get('/', home);
app.listen(3000, () => console.log('Listening on port 3000...'));

