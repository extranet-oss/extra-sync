// Application hooks that run for every service
const logger = require('./hooks/logger');
const auth = require('./hooks/token-auth');

module.exports = {
  before: {
    all: [
      logger(),
      auth() //every request must be authenticated
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
