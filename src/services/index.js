const checkAutologin = require('./check-autologin/check-autologin.service.js');
const queue = require('./queue/queue.service.js');
const execTask = require('./exec-task/exec-task.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(checkAutologin);
  app.configure(queue);
  app.configure(execTask);
};
