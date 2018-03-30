/**
 * title: Intranet GET Wrapper
 * contributors: freeboi
 * desc:
 *    Handle request on intranet,
 *    you can change api target by passing an url opt,
 *    url template are autocompleted with query opt
 *      ex: /profile/{user}
 *      user wiil be filled by the user passed as parameter in the query
 * v0.1
 * todo:
 *    -correctly parse url
**/

/* eslint-disable no-unused-vars */
const request = require('request');
const {ObjectModel} = require('objectmodel');

const cfgModel = new ObjectModel({
  url: [String],
  token: String,
  params: [Object],
  format: [String]
}).defaults({
  url: '/',
  format: 'json'
});

function parseUrl(url, options) {
  let str = url.slice(0);
  for (let opt in options) {
    str = str.replace('{' + opt + '}', options[opt]);
  }
  return str;
}

module.exports.get = function (cfg) {
  return new Promise((resolve, reject) => {
    let validatedCfg = new cfgModel(cfg);

    let url = 'https://intra.epitech.eu/auth-' + validatedCfg.token + '' + parseUrl(validatedCfg.url, validatedCfg.params);
    url +=  url.includes('?') ? '&' : '?' + 'format=' + validatedCfg.format;
    console.log(url)
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
      try {
        body = JSON.parse(body);
      } catch(e) {}
      resolve({
        res,
        body
      });
    });
  });
};

