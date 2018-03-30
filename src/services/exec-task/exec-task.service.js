// Initializes the `exec-task` service on path `/exec-task`
const createService = require('./exec-task.class.js');
const hooks = require('./exec-task.hooks');

module.exports = function (app) {


  const options = {
    name: 'exec-task'
  };

  // Initialize our service with any options it requires
  app.use('/exec-task', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('exec-task');

  service.hooks(hooks);
};
