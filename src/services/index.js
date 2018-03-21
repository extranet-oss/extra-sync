const checkAutologin = require('./check-autologin/check-autologin.service.js');
const test = require('./test/test.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(checkAutologin);
  app.configure(test);
};
