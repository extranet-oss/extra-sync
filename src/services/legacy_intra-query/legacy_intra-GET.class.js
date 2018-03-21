/**
 *   ________   _________ _____            _   _ ______ _______
 *  |  ____\ \ / /__   __|  __ \     /\   | \ | |  ____|__   __|
 *  | |__   \ V /   | |  | |__) |   /  \  |  \| | |__     | |
 *  |  __|   > <    | |  |  _  /   / /\ \ | . ` |  __|    | |
 *  | |____ / . \   | |  | | \ \  / ____ \| |\  | |____   | |
 *  |______/_/ \_\  |_|  |_|  \_\/_/    \_\_| \_|______|  |_|
 *
 * title: Legacy Intranet GET Wrapper
 * contributors: freeboi
 * desc:
 *    Feather service to handle GET request on intranet,
 *    you can change api target by passing an url opt at construction,
 *    url template are autocompleted with query opt
 *      ex: /profile/{user}
 *      user wiil be filled by the user passed as parameter in the query
 * v0.1
 * todo:
 *    -correctly parse url
**/

/* eslint-disable no-unused-vars */
let request = require('request');
let utils = require('./utils');

class Service {
  constructor (options) {
    let opt = {
      url: '',
      format: '?format=json'
    };
    this.options = Object.assign({}, opt, options);
  }

  async find (params) {
    try {
      let result = await new Promise((resolve, reject) => {
        let url = 'https://intra.epitech.eu/auth-' + params.query.token + '/' + utils.parseUrl(this.options.url, params) + this.options.format;
        request.get({
          url,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; extra-sync/1.0; +https://tryextra.net/bot)',
            'Cookie': 'language=en; tz=UTC'
          }
        },
        (err, res, body) => {
          if (err)
            return reject();
          this.query = res;
          try {
            resolve(JSON.parse(body));
          } catch(e) {
            resolve(body);
          }
        });
      });
      return result;
    } catch(e) {
      throw e;
    }
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
