module.exports = (app) => {
    const api = require('../api/project-api-controller');

    // Create a new project
    app.post('/add-project', api.create);

    // Retrieve all projects
    app.get('/get-project', api.findallproject);

    // Retrieve specific project with id
    app.get('/get-project/:id', api.findproject);

    // Retrieve specific project with id
    app.get('/update-count', api.updatecount);

    // Update a project with id
    app.put('/upd-project/:id', api.updproject);

    // Suspend a project with id
    app.put('/sus-project/:id', api.suspendproject);
}