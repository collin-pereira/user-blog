const express = require('express');
const app = express();
const cors = require('cors')
const passport =require('passport')
const loggerMiddleware = require('./middelwares/logger')

require('dotenv').config();
global.__BASEDIR = __dirname

//database
const db = require('./models')
require('./db').authenticateAndSyncDb(db.sequelize)
require('./config/passport')

//middlewares
app.use(passport.initialize())
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(loggerMiddleware.logger)

//serve images from static dir
app.use('/user/uploads', express.static('uploads'))

//all routes begin with /api
app.use('/api', require('./routes'))

app.get('/image', (req, res) => {
    res.sendFile(__dirname + '/passportsize_photo.jpg')
})

//unmatched route
app.all('/*', (req, res) => res.status(404).send("Resource Not Found"))


//listen to server
app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`);
})