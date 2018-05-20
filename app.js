//CONFIG
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');


const app = express()

require('./database/databaseHandler.js');

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

import apiRoutes from './routes/index.js';

app.get('*', apiRoutes.redirectToLongURL);

app.listen(3001, () => console.log('Example app listening on port 3000!'))
