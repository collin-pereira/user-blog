const express = require('express');
const app = express();
const cors = require('cors')
const loggerMiddleware =require ('./middelwares/logger')

require('dotenv').config();

//database
const db = require('./models')
require('./db').authenticateAndSyncDb(db.sequelize)

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(loggerMiddleware.logger)

app.use('/api',require('./routes'))

app.all('/*',(req,res)=>res.status(404).send("Resource Not Found"))

//listen to server
app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`);
})