var jsonwt = require('jsonwebtoken');

module.exports = {
  before: {
    all: [],
    find: [],
  },

  after: {
    all: [],
    find: [
      async function (hook, next) {
        let responseCookies = hook.service.query.headers['set-cookie'];
        let jwt = null;
        for (let cookie of responseCookies) {
          if (cookie.startsWith('user=')) {
            jwt = cookie.split(';')[0].split('=')[1];
            break;
          }
        }
        if (jwt) {
          let decodedJson = jsonwt.decode(jwt);
          hook.result = {
            login: decodedJson.login,
            readOnly: !!decodedJson.parent
          };
        }
        next();
      }
    ],
  },

  error: {
    all: [],
    find: [],
  }
};
