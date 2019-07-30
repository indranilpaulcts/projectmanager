module.exports = (app) => {
    const api = require('../api/user-api-controller');

    // Create a new user
    app.post('/add-user', api.create);

    // Retrieve all users
    app.get('/get-user', api.findalluser);

    // Retrieve specific user with id
    app.get('/get-user/:id', api.finduser);

    // Retrieve specific user with id
    app.get('/get-userbyproj/:id', api.finduserbyproj);

    // Update a user with id
    app.put('/upd-user/:id', api.upduser);

    //Delete a user with id
    app.delete('/del-user/:id', api.deluser);
}