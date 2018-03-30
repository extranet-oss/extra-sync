const intraRequest = require('../../intra/intraRequest');
/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    let req = await intraRequest.get({
      token: params.query.token
    });
    this.query = req.res;
    return req.body;
  }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
