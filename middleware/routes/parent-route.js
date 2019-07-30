module.exports = (app) => {
    const api = require('../api/parent-api-controller');

    // Create a new user
    app.post('/add-parent', api.create);

    // Retrieve all users
    app.get('/get-parent', api.findallparent);

    // Update a user with id
    app.put('/upd-parent/:id', api.updparent);
}
