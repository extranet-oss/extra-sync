// Initializes the `check-autologin` service on path `/check-autologin`
const createService = require('./check-autologin.class.js');
const hooks = require('./check-autologin.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'check-autologin',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/check-autologin', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('check-autologin');

  service.hooks(hooks);
};
