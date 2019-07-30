module.exports = (app) => {
    const api = require('../api/task-api-controller');

    // Create a new task
    app.post('/add-task', api.create);

    // Retrieve all tasks
    app.get('/get-task', api.findall)

    // Retrieve specific task with id
    app.get('/get-task/:id', api.find);

    // Update a task with id
    app.put('/upd-task/:id', api.updtask);
}