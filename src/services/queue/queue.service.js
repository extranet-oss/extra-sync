// Initializes the `queue` service on path `/queue`
const createService = require('feathers-mongoose');
const createModel = require('../../models/queue.model');
const hooks = require('./queue.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'queue',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/queue', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('queue');

  service.hooks(hooks);
};
