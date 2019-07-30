// [ Import Section ]-----------------------------------------------------
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/server-config');
const logger = require('./config/winston');

// [ Create Express App ]-------------------------------------------------
const app = express()
// Allows cross-origin domains to access this API
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin' , config.server.clienturi);
    res.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.append('Access-Control-Allow-Credentials', true);
    next();
});
// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }));
// Parse requests of content-type: application/jsonnodjs
app.use(bodyparser.json());

// Import the routes for parent, project, task & user 
require('./routes/parent-route')(app);
require('./routes/project-route')(app);
require('./routes/task-route')(app); 
require('./routes/user-route')(app); 

mongoose.Promise = global.Promise;
// Connecting to the mongodb
mongoose.connect(config.db.url, {
    useNewUrlParser: true
}).then(()=>{
    logger.info('Successfully connected to the database: ' + config.db.name);
}).catch(err =>{
    logger.error('Failed to connect to the database due to: ', err);
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// [ Create App Server ]--------------------------------------------------
app.listen(config.server.port, config.server.host, () => {
    logger.info(`Started server at http://${config.server.host}:${config.server.port}/`);
});
// --EOF--