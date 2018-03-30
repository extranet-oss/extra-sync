/* eslint-disable no-unused-vars */

const intraRequest = require('../../intra/intraRequest');
const cfg = require('./hooks/cfg');
const errors = require('@feathersjs/errors');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async create (data, params) {
    if (data.type == 'pull') {
      let req = await intraRequest.get({
        url: cfg[data.type][data.action].url,
        params: data.params,
        token: data.token
      });
      switch (req.res.statusCode) {
        case 404:
          throw new errors.NotFound('Intranet page not found');
      }
      return req.body;
    }
    return {};
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
